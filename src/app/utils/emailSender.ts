import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (
  email: string,
  html: string,
  subject: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.sender_email,
      pass: config.sender_app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: '"Spoon Sync" <info.jhshakil@gmail.com>',
    to: email,
    subject,
    html,
  });
};
