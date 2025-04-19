from reportlab.platypus import Paragraph, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

def generate_challenges_and_recommendations(data):
    challenges = data.get("challenges", [
        "Limited employee participation in rural outreach programs.",
        "Difficulty in tracking long-term impact of CSR initiatives.",
        "Budget constraints due to increased internal demands.",
    ])

    recommendations = data.get("recommendations", [
        "Introduce reward mechanisms to increase employee engagement.",
        "Use analytics tools to measure CSR effectiveness over time.",
        "Collaborate with NGOs to reduce costs and expand impact.",
    ])

    section_title = ParagraphStyle(name="SectionTitle", fontSize=16, fontName="Times-Bold", spaceAfter=16)
    item_style = ParagraphStyle(name="Item", fontSize=12, fontName="Times-Roman", leftIndent=20, bulletIndent=10, spaceAfter=8)

    story = []

    # Challenges Section
    story.append(Paragraph("Challenges Faced", section_title))
    for item in challenges:
        story.append(Paragraph(f"• {item}", item_style))
    story.append(Spacer(1, 20))

    # Recommendations Section
    story.append(Paragraph("Recommendations", section_title))
    for item in recommendations:
        story.append(Paragraph(f"• {item}", item_style))
    return story