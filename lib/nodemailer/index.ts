import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{intro}}", intro);

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Welcome to Signalist",
        text: `Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.`,
        html: htmlTemplate,
    }
    await transporter.sendMail(mailOptions);
}