import { ContactMessage } from '../models/ContactMessage.js';
import { sendContactNotification } from '../services/emailService.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';

/**
 * @desc   Submit Contact Form Message
 * @route  POST /api/contact
 * @access Public
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let savedMessage = null;

    // 1. Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      savedMessage = await ContactMessage.create({
        name,
        email,
        message,
        ipAddress,
      });
      logger.info(`[ContactController] New contact message saved in DB. ID: ${savedMessage._id}`);
    } else {
      logger.warn('[ContactController] DB offline: Contact submission logged to console only.');
      logger.info(`[Contact Message] From: ${name} <${email}> - Message: ${message}`);
    }

    // 2. Dispatch email notification (safe await for serverless environments)
    try {
      await sendContactNotification({
        name,
        email,
        message,
        createdAt: savedMessage ? savedMessage.createdAt : new Date(),
      });
    } catch (emailErr) {
      logger.error('[ContactController] Email dispatch error:', emailErr.message);
    }

    // 3. Return clean 201 response to client
    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    next(error);
  }
};
