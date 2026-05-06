 
const htmlResetPassword =(resetURL)=> `
     <div style="font-family: Arial; padding:20px;">
      <h2>Smart Lab Password Reset</h2>
      <p>You requested a password reset.</p>

      <a href="${resetURL}" 
         style="
           background:#2563eb;
           color:white;
           padding:12px 20px;
           text-decoration:none;
           border-radius:6px;
           display:inline-block;
         ">
         Reset Password
      </a>

      <p style="margin-top:20px;">
        This link is valid for <b>10 minutes</b>.
      </p>

      <p>If you didn't request this, ignore this email.</p>
    </div>
  `
  export default htmlResetPassword