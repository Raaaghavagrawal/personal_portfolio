const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'agrawalraghav747@gmail.com',
    pass: process.env.EMAIL_PASS || 'lewa gded mdhq wfpc'
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, message'
    });
  }

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER || 'agrawalraghav747@gmail.com',
    to: process.env.EMAIL_USER || 'agrawalraghav747@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Sender Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
          <h3 style="color: #007bff; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
          <p>This message was sent from your portfolio website contact form.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Sender Details:
- Name: ${name}
- Email: ${email}

Message:
${message}

---
This message was sent from your portfolio website contact form.
Time: ${new Date().toLocaleString()}
    `
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'SMTP Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 SMTP Server running on port ${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/send-email`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 