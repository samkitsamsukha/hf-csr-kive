import html2pdf from 'html2pdf.js';

export const generateAdminReport = async (adminData) => {
  // Create the HTML structure
  const reportContent = document.createElement("div");
  reportContent.style.fontFamily = "Arial, sans-serif";
  reportContent.style.fontSize = "12px";
  reportContent.innerHTML = `
    <div style="font-size: 16px; font-weight: bold; color: #003366; margin-bottom: 10px;">CSR Audit Compliance Report</div>
    <div style="font-size: 14px; font-weight: bold;">Vision:</div>
    <div style="font-size: 12px; margin-bottom: 10px;" id="vision">${adminData.vision}</div>
    <div style="font-size: 14px; font-weight: bold;">Mission:</div>
    <div style="font-size: 12px; margin-bottom: 10px;" id="mission">${adminData.mission}</div>
    <div style="font-size: 14px; font-weight: bold;">Admin Info:</div>
    <div style="font-size: 12px;">
      Organization: ${adminData.name}<br>
      Admin: ${adminData.adminName}<br>
      Email: ${adminData.adminEmail}<br>
      CSR Philosophy: ${adminData.csrPhilsophy}
    </div>
    <div style="font-size: 14px; font-weight: bold; margin-top: 10px;">CSR Objectives:</div>
    <div style="font-size: 12px;">${adminData.objectives.map(obj => `<p>- ${obj}</p>`).join("")}</div>
    <div style="font-size: 14px; font-weight: bold; margin-top: 10px;">Events:</div>
    <div id="events" style="font-size: 12px;">
      ${adminData.events.map((event, index) => `
        <div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th colspan="2" style="text-align: left; font-size: 14px; font-weight: bold; padding: 8px; border: 1px solid #ddd;">${index + 1}. ${event.eventName} (${event.eventCategory})</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Location:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${event.eventLocation}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Date:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${new Date(event.eventDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Coins:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${event.eventCoins}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Summary:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${event.eventSummary}</td>
              </tr>
            </tbody>
          </table>

          <div style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">Employee Submissions:</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="font-size: 12px; text-align: left; padding: 8px; border: 1px solid #ddd;">#</th>
                <th style="font-size: 12px; text-align: left; padding: 8px; border: 1px solid #ddd;">Employee Name</th>
                <th style="font-size: 12px; text-align: left; padding: 8px; border: 1px solid #ddd;">Report</th>
              </tr>
            </thead>
            <tbody>
              ${event.submissions.length > 0 ? event.submissions.map((submission, subIndex) => `
                <tr>
                  <td style="padding: 8px; text-align: center; border: 1px solid #ddd;">${subIndex + 1}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submission.employeeName}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submission.report}</td>
                </tr>
              `).join("") : `
                <tr>
                  <td colspan="4" style="padding: 8px; text-align: center; border: 1px solid #ddd;">No submissions received</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      `).join("")}
    </div>
    <div style="font-size: 10px; font-style: italic; margin-top: 20px;">Generated on: ${new Date().toLocaleDateString()}</div>
  `;

  // Append the content to the DOM
  document.body.appendChild(reportContent);

  // Use html2pdf to convert HTML to PDF
  const options = {
    margin: 10,
    filename: 'csr_audit_report.pdf',
    html2canvas: { scale: 2 }, // Optional, can adjust scaling for image clarity
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf()
    .from(reportContent)
    .set(options)
    .save()
    .then(() => {
      // Clean up by removing the temporary HTML content after PDF generation
      document.body.removeChild(reportContent);
    });
};
