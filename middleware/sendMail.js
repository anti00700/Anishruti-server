import SibApiV3Sdk from "sib-api-v3-sdk";

const setupBrevo = () => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  return new SibApiV3Sdk.TransactionalEmailsApi();
};

const sendMail = async (email, subject, data) => {
  const apiInstance = setupBrevo();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { name: "Anishruti", email: process.env.BREVO_USER };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        h1 { color: red; }
        p { margin-bottom: 20px; color: #666; }
        .otp { font-size: 36px; color: #7b68ee; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name}, your One-Time Password for account verification is:</p>
        <p class="otp">${data.otp}</p>
    </div>
</body>
</html>`;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
  const apiInstance = setupBrevo();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { name: "Anishruti", email: process.env.BREVO_USER };
  sendSmtpEmail.to = [{ email: data.email }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f3f3f3;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3;padding:20px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding:20px;">
                <h1 style="color:#5a2d82;margin-top:0;">Reset Your Password</h1>
                <p style="color:#666666;font-size:16px;">Hello,</p>
                <p style="color:#666666;font-size:16px;">You requested a password reset. Click below to reset it.</p>
                <table cellspacing="0" cellpadding="0" style="margin:20px 0;">
                  <tr>
                    <td bgcolor="#5a2d82" style="border-radius:4px;">
                      <a href="${process.env.frontendurl}/reset-password/${data.token}"
                         style="display:inline-block;padding:15px 25px;font-size:16px;color:#ffffff;text-decoration:none;font-weight:bold;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="color:#999999;font-size:14px;">
                  If the button doesn't work, copy this link:<br>
                  <a href="${process.env.frontendurl}/reset-password/${data.token}" style="color:#5a2d82;">
                    ${process.env.frontendurl}/reset-password/${data.token}
                  </a>
                </p>
                <p style="color:#666666;font-size:16px;">If you did not request this, ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};