import {createTransport} from 'nodemailer';

const sendMail = async(email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth:{
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee; /* Purple text */
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name} your (One-Time Password) for your account verification is.</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to : email,
    subject,
    html,
  });
};
export default sendMail;


export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f3f3f3;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3;padding:20px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding:20px;">
                <h1 style="color:#5a2d82;margin-top:0;">Reset Your Password</h1>
                <p style="color:#666666;font-size:16px;line-height:1.4;margin:0 0 15px;">
                  Hello,
                </p>
                <p style="color:#666666;font-size:16px;line-height:1.4;margin:0 0 20px;">
                  You have requested to reset your password. Please click the button below to reset it.
                </p>

                <!-- Button with full inline styles -->
                <table cellspacing="0" cellpadding="0" style="margin:20px 0;">
                  <tr>
                    <td bgcolor="#5a2d82" style="border-radius:4px;">
                      <a href="${process.env.frontendurl}/reset-password/${data.token}"
                         style="display:inline-block;padding:15px 25px;font-size:16px;color:#ffffff;
                                text-decoration:none;font-family:Arial,sans-serif;border-radius:4px;
                                font-weight:bold;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Fallback plain link -->
                <p style="color:#999999;font-size:14px;line-height:1.4;margin:20px 0 0;">
                  If the button above doesn’t work, copy and paste this link into your browser:<br>
                  <a href="${process.env.frontendurl}/reset-password/${data.token}"
                     style="color:#5a2d82;word-break:break-all;">
                    ${process.env.frontendurl}/reset-password/${data.token}
                  </a>
                </p>

                <p style="color:#666666;font-size:16px;line-height:1.4;margin:20px 0 0;">
                  If you did not request this, please ignore this email.
                </p>

                <div style="text-align:center;margin-top:30px;color:#999999;font-size:12px;">
                  <p>Thank you,<br>Your Website Team</p>
                  <p>
                    <a href="https://yourwebsite.com"
                       style="color:#5a2d82;text-decoration:none;">
                      yourwebsite.com
                    </a>
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: data.email,
    subject,
    html,
  });
};