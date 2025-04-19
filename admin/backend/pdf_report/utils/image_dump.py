from reportlab.platypus import Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.platypus.flowables import Image
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
import os

def generate_image_dump(data):
    images = data.get("image_dump", [
        "assets/logo.png",
        "assets/logo.png",
        "assets/logo.png","assets/logo.png","assets/logo.png","assets/logo.png","assets/logo.png","assets/logo.png","assets/logo.png",
    ])

    img_width = 2.5 * inch
    img_height = 2.0 * inch

    caption_style = ParagraphStyle(name="Caption", fontSize=9, fontName="Times-Roman", alignment=1)
    heading_style = ParagraphStyle(name="Heading", fontSize=18, fontName="Times-Bold", alignment=1, spaceAfter=24)

    story = []

    # Add a centered heading at the top of the image dump section
    story.append(PageBreak())  # start on a new page
    story.append(Paragraph("CSR Event Gallery", heading_style))
    story.append(Spacer(1, 12))

    row = []
    caption_row = []

    def append_row_to_story():
        table = Table(
            [row, caption_row],
            colWidths=[3*inch, 3*inch],
        )
        table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ]))
        story.append(table)
        story.append(Spacer(1, 24))

    for idx, path in enumerate(images):
        if os.path.exists(path):
            img = Image(path, width=img_width, height=img_height)
        else:
            img = Paragraph("Image not found", caption_style)

        row.append(img)
        caption_row.append(Paragraph(f"Figure {idx+1}", caption_style))

        if len(row) == 2:
            append_row_to_story()
            row = []
            caption_row = []

        # After 6 images, break the page
        if (idx + 1) % 6 == 0:
            story.append(PageBreak())

    # Final row if not full
    if row:
        while len(row) < 2:
            row.append('')
            caption_row.append('')
        append_row_to_story()

    return story