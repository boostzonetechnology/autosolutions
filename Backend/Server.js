// backend/server.js (No changes needed - keep as is)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true
}));
app.use(express.json());

console.log('SMTP Configuration:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  receiver: process.env.RECEIVER_EMAIL
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // For development only
  }
});

// Test connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ SMTP Connection Error:', error.message);
    console.log('Troubleshooting tips:');
    console.log('1. Check if SMTP_PASS is correct (16-character app password)');
    console.log('2. Enable 2-Step Verification in Google Account');
    console.log('3. Check if "Less Secure Apps" is enabled');
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

app.post('/api/send-email', async (req, res) => {
  console.log('Received form data:', req.body);
  
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const mailOptions = {
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">📧 New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>📞 Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>💬 Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from your website contact form
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}

Sent from your website contact form.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    let errorMessage = 'Failed to send email.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Check your email and password.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Cannot connect to SMTP server.';
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email address.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'Configured' : 'Missing',
      receiver: process.env.RECEIVER_EMAIL
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📧 SMTP: ${process.env.SMTP_USER} → ${process.env.RECEIVER_EMAIL}`);
});