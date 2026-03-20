require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5500";
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use("/send-mail", limiter);

function clean(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post("/send-mail", async (req, res) => {
  try {
    const firstName = clean(req.body.firstName);
    const lastName = clean(req.body.lastName);
    const email = clean(req.body.email);
    const phone = clean(req.body.phone);
    const subject = clean(req.body.subject);
    const message = clean(req.body.message);

   

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address."
      });
    }

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `.trim()
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("Mail send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message."
    });
  }
});

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("MAIL_TO:", process.env.MAIL_TO);
console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});