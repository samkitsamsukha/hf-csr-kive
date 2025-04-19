from reportlab.platypus import Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors

def build_vision_mission_page(data):
    style_heading = ParagraphStyle(name="heading", fontSize=14, fontName="Times-Bold", spaceAfter=6)
    style_body = ParagraphStyle(name="body", fontSize=12, fontName="Times-Roman", spaceAfter=14)

    section = []

    section.append(Paragraph("Company Vision", style_heading))
    section.append(HRFlowable(width="100%", color=colors.lightblue, thickness=1, spaceAfter=6))
    section.append(Paragraph(data.get("vision", "Empowering communities through innovation and integrity."), style_body))

    section.append(Paragraph("Mission", style_heading))
    section.append(HRFlowable(width="100%", color=colors.lightblue, thickness=1, spaceAfter=6))
    section.append(Paragraph(data.get("mission", "To drive sustainable impact through proactive CSR initiatives."), style_body))

    section.append(Paragraph("Objectives", style_heading))
    section.append(HRFlowable(width="100%", color=colors.lightblue, thickness=1, spaceAfter=6))
    for obj in data.get("objective", []):
        section.append(Paragraph(f"• {obj}", style_body))

    section.append(Paragraph("CSR Philosophy", style_heading))
    section.append(HRFlowable(width="100%", color=colors.lightblue, thickness=1, spaceAfter=6))
    section.append(Paragraph(data.get("csr_philosophy", "Our CSR initiatives reflect our commitment to social responsibility and sustainable growth."), style_body))

    return section