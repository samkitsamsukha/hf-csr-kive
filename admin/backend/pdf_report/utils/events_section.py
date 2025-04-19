from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

def generate_events_section(events):
    style_title = ParagraphStyle(name="title", fontSize=14, fontName="Times-Bold", spaceAfter=10)
    style_label = ParagraphStyle(name="label", fontSize=11, fontName="Times-Bold", alignment=TA_LEFT)
    style_text = ParagraphStyle(name="text", fontSize=11, fontName="Times-Roman", alignment=TA_LEFT)

    story = [Paragraph("CSR Events Overview", style_title)]
    story.append(Spacer(1, 12))

    for event in events:
        # Create table data
        table_data = [
            [Paragraph("Event Name:", style_label), Paragraph(event.get("name", "N/A"), style_text)],
            [Paragraph("Description:", style_label), Paragraph(event.get("description", "N/A"), style_text)],
            [Paragraph("Category:", style_label), Paragraph(event.get("category", "N/A"), style_text)],
            [Paragraph("Coins:", style_label), Paragraph(str(event.get("coins", "N/A")), style_text)],
            [Paragraph("Date:", style_label), Paragraph(event.get("date", "N/A"), style_text)],
            [Paragraph("Location:", style_label), Paragraph(event.get("location", "N/A"), style_text)],
            [Paragraph("Event Summary:", style_label), Paragraph(event.get("eventsummary", "N/A"), style_text)],
            [Paragraph("Submissions:", style_label), Paragraph(event.get("submissions", "N/A"), style_text)]
        ]

        # Create table
        table = Table(table_data, colWidths=[150, 350])
        
        # Add table style
        table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
            ('TEXTCOLOR', (0, 0), (0, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTNAME', (0, 0), (0, -1), 'Times-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Times-Roman'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))

        story.append(table)
        story.append(Spacer(1, 18))

    story.append(PageBreak())
    return story