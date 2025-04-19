import os
from flask import Flask, request, jsonify, render_template
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)  # Optional if you're serving from the same domain
app.config['UPLOAD_FOLDER'] = 'uploads'

ACCESS_TOKEN = os.getenv('LINKEDIN_ACCESS_TOKEN')
PERSON_URN = os.getenv('LINKEDIN_PERSON_URN')

headers = {
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json'
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/post-to-linkedin', methods=['POST'])
def post_to_linkedin():
    file = request.files.get('image')
    caption = request.form.get('caption', 'Posted via LinkedIn API')

    if not file:
        return jsonify({'error': 'No image provided'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    register_payload = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": PERSON_URN,
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }
            ]
        }
    }

    register_res = requests.post(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        json=register_payload,
        headers=headers
    )

    if register_res.status_code != 200:
        return jsonify({'error': 'Failed to register upload', 'details': register_res.json()}), 500

    upload_url = register_res.json()['value']['uploadMechanism']['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']['uploadUrl']
    asset = register_res.json()['value']['asset']

    with open(filepath, 'rb') as image_file:
        upload_headers = {
            'Authorization': f'Bearer {ACCESS_TOKEN}',
            'Content-Type': file.content_type
        }
        upload_res = requests.put(upload_url, data=image_file, headers=upload_headers)

    if upload_res.status_code not in [200, 201]:
        return jsonify({'error': 'Image upload failed', 'details': upload_res.text}), 500

    post_payload = {
        "author": PERSON_URN,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": caption
                },
                "shareMediaCategory": "IMAGE",
                "media": [
                    {
                        "status": "READY",
                        "description": {
                            "text": "Image uploaded via API"
                        },
                        "media": asset,
                        "title": {
                            "text": "LinkedIn Image"
                        }
                    }
                ]
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    post_res = requests.post(
        "https://api.linkedin.com/v2/ugcPosts",
        json=post_payload,
        headers=headers
    )

    os.remove(filepath)

    if post_res.status_code not in [200, 201]:
        return jsonify({'error': 'Failed to post to LinkedIn', 'details': post_res.json()}), 500

    return jsonify({'message': 'Posted to LinkedIn successfully!', 'postURN': post_res.json().get('id')}), 200

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=8000)