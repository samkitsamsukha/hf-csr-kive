from reportlab.platypus import Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.units import inch

def generate_conclusion_page(data):
    story = []

    conclusion_text = data.get("conclusion", """
        In conclusion, our CSR efforts this year have significantly contributed to the well-being of various communities.
        The events and initiatives covered in this report highlight our ongoing commitment to sustainable development,
        inclusivity, and responsible corporate citizenship.

        We sincerely thank all our volunteers, partners, and stakeholders who played a role in making these initiatives successful.
        Moving forward, we aim to expand our efforts, deepen community engagement, and continue to build a better future.
    """)

    title_style = ParagraphStyle(name="Title", fontName="Times-Bold", fontSize=16, alignment=TA_CENTER, spaceAfter=20)
    body_style = ParagraphStyle(name="Body", fontName="Times-Roman", fontSize=12, alignment=TA_LEFT, leading=18)

    # Title
    story.append(PageBreak())
    story.append(Paragraph("Conclusion", title_style))
    story.append(Spacer(1, 12))
    story.append(Paragraph(conclusion_text.strip(), body_style))
    story.append(Spacer(1, 60))

    # Signatures
    signature_names = data.get("auditors", [
        "Mr. Arjun Rao",
        "Ms. Shalini Nair",
        "Dr. Raghav Sharma",
        "Ms. Pooja Menon"
    ])

    signature_table_data = [
        [Paragraph(name, ParagraphStyle(name="SigStyle", fontName="Times-Roman", fontSize=10, alignment=TA_CENTER)) for name in signature_names]
    ]
    signature_lines = [
        [Paragraph("________________", ParagraphStyle(name="Line", fontName="Times-Roman", fontSize=10, alignment=TA_CENTER)) for _ in signature_names]
    ]

    # Stack lines and names
    full_signature_block = signature_lines + signature_table_data

    signature_table = Table(full_signature_block, colWidths=[1.8*inch]*4, hAlign='CENTER')
    signature_table.setStyle(TableStyle([
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
    ]))

    story.append(Spacer(1, 80))  # Space to push signatures near the bottom
    story.append(signature_table)

    return story