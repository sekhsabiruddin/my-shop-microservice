import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>
) => {
  const templatePath = path.resolve(
    process.cwd(),
    "apps/auth-service/src/utils/mail-template",
    templateName
  );

  const html = await ejs.renderFile(templatePath, data);

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Eshop" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
