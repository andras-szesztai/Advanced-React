import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      font-family: sans-serif;
      padding: 20px;
      line-height: 2;
      font-size:20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  await transport.sendMail({
    to,
    from: 'SickFits.com',
    subject: 'Your Password Reset Token',
    html: makeANiceEmail(
      `Your password reset token is here! <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset!</a>`
    ),
  });
}
