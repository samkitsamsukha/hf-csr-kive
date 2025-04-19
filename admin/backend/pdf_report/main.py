from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, PageBreak
import json

# Import utility functions from the utils package
from utils.cover_pages import generate_cover_page
from utils.toc_page import build_toc_page
from utils.vision_mission_page import build_vision_mission_page
from utils.event_pages import build_event_pages
from utils.events_section import generate_events_section # If needed for additional sections
from utils.common import add_footer, register_fonts
from utils.challenges import generate_challenges_and_recommendations
from utils.image_dump import generate_image_dump
from utils.conclusion import generate_conclusion_page
# Load company data from JSON file
with open("assets/company_data.json") as f:
    data = json.load(f)

# Register fonts (if needed)
register_fonts()

# Create a PDF document
doc = SimpleDocTemplate("CSR_Report.pdf", pagesize=A4)
story = []

# Build the cover page
story += generate_cover_page(data)
story.append(PageBreak())

# Build the table of contents
story += build_toc_page()
story.append(PageBreak())

# Build the vision and mission page
story += build_vision_mission_page(data)
story.append(PageBreak())

# Build the event pages
story += build_event_pages(data["events"])
story.append(PageBreak())

# # Optionally, if you want to include an events section
# story += generate_events_section(data["events"])

story += generate_challenges_and_recommendations(data)

story += generate_image_dump(data)
story+=generate_conclusion_page(data)

# Add footer to each page
doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)

print("CSR Report generated successfully as 'CSR_Report.pdf'.")