const reportReadyEmail = (name, loginUrl) => {
  return `
    <div style="font-family: Arial; padding:20px;">
      <h2>Lab Report Ready</h2>

      <p>Hello ${name},</p>

      <p>Your medical report has been uploaded successfully.</p>

      <a href="${loginUrl}"
         style="
           background:#2563eb;
           color:white;
           padding:12px 18px;
           border-radius:8px;
           text-decoration:none;
         ">
         View Report
      </a>

      <p style="margin-top:20px;">
        Smart Lab Team
      </p>
    </div>
  `;
};

export default reportReadyEmail;