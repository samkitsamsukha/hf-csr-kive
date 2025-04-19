from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import inch
from datetime import datetime
from reportlab.lib.pagesizes import A4

import os


def register_fonts():
    """
    Registers Times New Roman font (requires font file).
    Place 'times.ttf' in the assets folder.
    """
    font_path = os.path.join("assets", "times.ttf")
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont("Times-Roman", font_path))
    else:
        print("⚠️ Times New Roman font file not found. Using default fonts.")


def add_footer(canvas, doc):
    """
    Adds a footer with copyright on the left and timestamp on the right.
    Should be used as the onPage callback.
    """
    canvas.saveState()
    width, height = A4

    # Copyright left bottom
    canvas.setFont("Times-Roman", 8)
    canvas.drawString(0.75 * inch, 0.5 * inch, "© 2025 Company Name. All rights reserved.")

    # Timestamp right bottom
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    canvas.drawRightString(width - 0.75 * inch, 0.5 * inch, f"Generated on: {timestamp}")

    canvas.restoreState()