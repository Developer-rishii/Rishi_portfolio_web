'use strict';

const express = require('express');
const router = express.Router();
const { createTransporter, buildContactEmailHtml } = require('../mailer');

// ─── POST /contact ─────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: buildContactEmailHtml({ name, email, subject, message }),
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Your message was sent successfully!' });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
