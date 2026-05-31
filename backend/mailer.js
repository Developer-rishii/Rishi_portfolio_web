'use strict';

const nodemailer = require('nodemailer');

/**
 * Creates and returns a reusable Nodemailer transporter.
 * Reads credentials from environment variables so it works
 * both locally (via .env) and on Vercel (via project env vars).
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
    tls: {
      rejectUnauthorized: false, // Fix: self-signed certificate in certificate chain
    },
  });
}

/**
 * Builds the HTML body for a contact form email.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
function buildContactEmailHtml({ name, email, subject, message }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;
                border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #FF7A3D; border-bottom: 2px solid #FF7A3D; padding-bottom: 10px;">
        New Contact Message
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Name:</td>
          <td style="padding: 8px 0; color: #333;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 8px 0; color: #333;">
            <a href="mailto:${email}" style="color: #FF7A3D;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
          <td style="padding: 8px 0; color: #333;">${subject}</td>
        </tr>
      </table>
      <div style="margin-top: 16px;">
        <p style="font-weight: bold; color: #555; margin-bottom: 6px;">Message:</p>
        <div style="background: #f9f9f9; padding: 14px; border-left: 4px solid #FF7A3D;
                    border-radius: 4px; color: #333; white-space: pre-wrap;">${message}</div>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
        Sent from your portfolio contact form.
      </p>
    </div>
  `;
}

module.exports = { createTransporter, buildContactEmailHtml };
