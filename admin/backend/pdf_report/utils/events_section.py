from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

def generate_events_section(events):
    style_title = ParagraphStyle(name="title", fontSize=14, fontName="Times-Bold", spaceAfter=10)
    style_label = ParagraphStyle(name="label", fontSize=11, fontName="Times-Bold", leftIndent=5)
    style_text = ParagraphStyle(name="text", fontSize=11, fontName="Times-Roman", leftIndent=15, spaceAfter=6)

    story = [Paragraph("CSR Events Overview", style_title)]
    story.append(Spacer(1, 12))

    for event in events:
        story.append(Paragraph(f"Event Name:", style_label))
        story.append(Paragraph(event.get("name", "N/A"), style_text))

        story.append(Paragraph("Description:", style_label))
        story.append(Paragraph(event.get("description", "N/A"), style_text))

        story.append(Paragraph("Category:", style_label))
        story.append(Paragraph(event.get("category", "N/A"), style_text))

        story.append(Paragraph("Coins:", style_label))
        story.append(Paragraph(str(event.get("coins", "N/A")), style_text))

        story.append(Paragraph("Date:", style_label))
        story.append(Paragraph(event.get("date", "N/A"), style_text))

        story.append(Paragraph("Location:", style_label))
        story.append(Paragraph(event.get("location", "N/A"), style_text))

        story.append(Paragraph("Event Summary:", style_label))
        story.append(Paragraph(event.get("eventsummary", "N/A"), style_text))

        story.append(Paragraph("Submissions:", style_label))
        story.append(Paragraph(event.get("submissions", "N/A"), style_text))

        story.append(Spacer(1, 18))
        story.append(Paragraph("<u>----------------------------------------</u>", style_text))
        story.append(Spacer(1, 18))

    story.append(PageBreak())
    return story