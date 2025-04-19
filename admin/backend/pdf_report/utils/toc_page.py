from reportlab.platypus import Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

def build_toc_page():
    style_heading = ParagraphStyle(name="heading", fontSize=18, fontName="Times-Bold", alignment=TA_LEFT, spaceAfter=20)
    style_bullet = ParagraphStyle(name="bullet", fontSize=12, fontName="Times-Roman", leftIndent=20, spaceAfter=10)

    toc = []
    toc.append(Paragraph("Table of Contents", style_heading))

    dummy_sections = [
        "1. Cover Page",
        "2. Table of Contents",
        "3. Vision, Mission & CSR Philosophy",
        "4. CSR Events Overview"
    ]

    for section in dummy_sections:
        toc.append(Paragraph(f"• {section}", style_bullet))

    return toc