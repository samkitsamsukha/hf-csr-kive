from reportlab.platypus import Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors

def build_event_pages(events):
    event_story = []
    para_style = ParagraphStyle('normal', fontName='Times-Roman', fontSize=12, spaceAfter=12)

    for i, event in enumerate(events, 1):
        event_story.append(Paragraph(f"<b>Event {i}: {event['name']}</b>", ParagraphStyle(name="event-title", fontSize=16, fontName="Times-Bold", spaceAfter=14)))
        
        table_data = [
            ["Description:", event["description"]],
            ["Coins Awarded:", str(event["coins"])],
            ["Category:", event["category"]],
            ["Date:", event["date"]],
            ["Location:", event["location"]],
            ["Event Summary:", event["eventsummary"]],
            ["Submissions:", event["submissions"]],
        ]
        
        table = Table(table_data, colWidths=[1.8*inch, 4.5*inch])
        table.setStyle(TableStyle([
            ("FONT", (0,0), (-1,-1), "Times-Roman", 12),
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ]))
        event_story.append(table)
        event_story.append(Spacer(1, 24))

    return event_story