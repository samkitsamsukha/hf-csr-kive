from reportlab.platypus import Paragraph, Spacer, Image
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
import os

def generate_cover_page(data):
    story = []

    company_name = data.get("company_name", "Your Company")
    year = data.get("year", "2024")
    auditors = data.get("auditors", [])
    logo_path = os.path.join("assets", "logo.png")

    width, height = A4

    # Styles
    title_style = ParagraphStyle(name="Title", fontSize=24, fontName="Times-Bold", alignment=TA_CENTER, spaceAfter=30)
    subtitle_style = ParagraphStyle(name="Subtitle", fontSize=16, fontName="Times-Roman", alignment=TA_CENTER, spaceAfter=12)
    small_center = ParagraphStyle(name="SmallCenter", fontSize=12, fontName="Times-Roman", alignment=TA_CENTER, spaceAfter=6)

    # Logo (top-right corner aligned)
    if os.path.exists(logo_path):
        logo = Image(logo_path, width=1.5*inch, height=1.5*inch)
        logo.hAlign = 'RIGHT'
        story.append(logo)
        story.append(Spacer(1, 20))
    else:
        story.append(Spacer(1, 40))  # add space if no logo

    # Company name, report title, year
    story.append(Paragraph(company_name, subtitle_style))
    story.append(Paragraph("CSR Auditing Report", title_style))
    story.append(Paragraph(f"Year: {year}", subtitle_style))
    story.append(Spacer(1, 30))

    # Auditors
    story.append(Paragraph("Audited By:", small_center))
    for auditor in auditors:
        story.append(Paragraph(auditor, small_center))

    return story