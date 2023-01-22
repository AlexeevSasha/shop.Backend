class HtmlMailer {
  constructor() {}

  getHtmlForgotPassword(token: string, userId: string, fullname: string) {
    return `<div style='font-family: "Montserrat", sans-serif;text-align: center;background: #f9f9f9;color: #666;padding: 40px;'>
           <h3 style='margin-bottom: 20px'>Forgot yor password</h3>
           <p style='margin-bottom: 14px'><span style='color: #101010; font-weight: 600; margin-right: 4px'>Hi, ${fullname}</span> someone requested that the password for your account be reset.</p>
           <a style='cursor: pointer;display: inline-block;font-weight: 500;text-decoration: none;padding: 12px;background: #5f5fd7;color: white;'
              href='http://localhost:8000/api/user/reset-password?user=${userId}&token=${token}'>Reset my password</a>
           <div style='margin-top: 8px;color: #c7c7c7;'>
              Copiable link: <span style='color: #89a8eb;' >http://localhost:8000/api/user/reset-password?user=${userId}&token=${token}</span>
           </div>
           <p style='margin-top: 10px;font-weight: 600;padding: 8px 0;'>This link is valid for 1 hour and can only be used once.</p>
           <p style='margin-top: 30px;'>
              If you didn't request this, you can ignore this email or let us know. Your password won't change until you create a new password.
           </p>
           </div>`;
  }
}

const htmlMailer = new HtmlMailer();

export { htmlMailer };
