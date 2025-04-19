import requests
import os

API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"
headers = {"Authorization": f"Bearer {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}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def enhance_with_huggingface(data):
    prompt = f"""
Rewrite the following event summary and impact for a professional and engaging LinkedIn post:

Event Summary: {data['event_summary']}
Impact: {data['impact']}

Make it sound more exciting and clear.
"""
    output = query({"inputs": prompt})
    return {
        **data,
        "event_summary": output[0]["generated_text"] if isinstance(output, list) else data["event_summary"],
        "impact": ""  # huggingface models often merge summary + impact
    }