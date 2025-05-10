import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html?: string;
}

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

if (!UKR_NET_EMAIL || !UKR_NET_PASSWORD) {
  throw new Error(
    'Missing UKR_NET_EMAIL or UKR_NET_PASSWORD in environment variables.'
  );
}

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (
  data: EmailData
): Promise<nodemailer.SentMessageInfo> => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};
