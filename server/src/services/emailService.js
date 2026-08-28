import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

let transporter = null;

/**
 * Initialize nodemailer transporter if credentials exist
 */
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass || user === 'your_email@gmail.com') {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }

  return transporter;
};

/**
 * Send email notification for incoming contact form submissions
 * @param {Object} contactData - { name, email, message, createdAt }
 */
export const sendContactNotification = async ({ name, email, message, createdAt }) => {
  const mailer = getTransporter();
  const recipient = process.env.ADMIN_EMAIL || 'anukalpbajpai25@gmail.com';

  if (!mailer) {
    if (process.env.NODE_ENV === 'production') {
      logger.error('❌ [CRITICAL] EMAIL_USER or EMAIL_PASSWORD is not set in production! Email forwarding is disabled.');
    } else {
      logger.warn('[EmailService] Email notification skipped: EMAIL_USER/EMAIL_PASSWORD not configured.');
    }
    return {
      sent: false,
      reason: 'Email service credentials not configured in environment',
    };
  }

  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(createdAt ? new Date(createdAt) : new Date());

  const mailOptions = {
    from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: recipient,
    subject: `🔔 New Portfolio Contact Message from ${name}`,
    text: `
You have received a new contact message from your portfolio website!

----------------------------------------
Visitor Name: ${name}
Visitor Email: ${email}
Submission Date: ${dateFormatted}
----------------------------------------

Message:
${message}

----------------------------------------
You can reply directly to this email to contact ${name}.
`,
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">New Portfolio Message</h2>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone reached out from your website</p>
  </div>
  <div style="padding: 24px;">
    <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
    <p><strong>Date:</strong> ${dateFormatted}</p>
    <div style="margin: 20px 0; padding: 16px; background-color: #f8f9fa; border-left: 4px solid #6366f1; border-radius: 4px;">
      <p style="margin: 0; font-weight: bold; color: #555;">Message:</p>
      <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${message}</p>
    </div>
    <p style="font-size: 0.9em; color: #777;">Click Reply in your email client to respond directly to <strong>${email}</strong>.</p>
  </div>
  <div style="background-color: #f1f1f1; padding: 12px; text-align: center; font-size: 0.8em; color: #888;">
    Anukalp Bajpai Portfolio API • Automated Notification
  </div>
</div>
`,
  };

  try {
    const info = await mailer.sendMail(mailOptions);
    logger.info(`[EmailService] Notification email sent successfully to ${recipient}. MessageId: ${info.messageId}`);
    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (error) {
    logger.error('[EmailService] Failed to send email notification:', error.message);
    return {
      sent: false,
      error: error.message,
    };
  }
};
