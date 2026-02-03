const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOrigins = (process.env.CORS_ORIGIN || "").split(",").map((item) => item.trim()).filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
  })
);
app.use(express.json({ limit: "1mb" }));

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL"];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return {
      ok: false,
      missing,
    };
  }
  return { ok: true };
}

function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatFields(fields) {
  return Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function buildMailOptions({ subject, fields, replyTo }) {
  const toEmail = process.env.TO_EMAIL || "pccliberia2025@gmail.com";
  return {
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject,
    text: formatFields(fields),
    replyTo,
  };
}

function sanitizeText(value) {
  if (!value) {
    return "";
  }
  return String(value).trim();
}

function getRequestMeta(req) {
  return {
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
    userAgent: req.headers["user-agent"] || "",
  };
}

function validateEmail(value) {
  return /\S+@\S+\.[\S+]+/.test(value);
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/join-us", async (req, res) => {
  const envCheck = validateEnv();
  if (!envCheck.ok) {
    return res.status(500).json({
      error: "Missing email configuration",
      missing: envCheck.missing,
    });
  }

  const name = sanitizeText(req.body.name);
  const email = sanitizeText(req.body.email);
  const phone = sanitizeText(req.body.phone);
  const message = sanitizeText(req.body.message);
  const meta = getRequestMeta(req);

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "email is invalid" });
  }

  try {
    const transporter = buildTransport();
    await transporter.sendMail(
      buildMailOptions({
        subject: "Join Us Submission",
        fields: {
          name,
          email,
          phone,
          message,
          ip: meta.ip,
          userAgent: meta.userAgent,
        },
        replyTo: email,
      })
    );
    return res.json({ status: "sent" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/api/contact-us", async (req, res) => {
  const envCheck = validateEnv();
  if (!envCheck.ok) {
    return res.status(500).json({
      error: "Missing email configuration",
      missing: envCheck.missing,
    });
  }

  const name = sanitizeText(req.body.name);
  const email = sanitizeText(req.body.email);
  const subject = sanitizeText(req.body.subject) || "Contact Us Submission";
  const message = sanitizeText(req.body.message);
  const meta = getRequestMeta(req);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "email is invalid" });
  }

  try {
    const transporter = buildTransport();
    await transporter.sendMail(
      buildMailOptions({
        subject,
        fields: {
          name,
          email,
          message,
          ip: meta.ip,
          userAgent: meta.userAgent,
        },
        replyTo: email,
      })
    );
    return res.json({ status: "sent" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Email server running on port ${port}`);
});
