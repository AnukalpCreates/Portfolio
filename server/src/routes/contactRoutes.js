import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { contactValidationRules, validate, checkHoneypot } from '../middleware/validator.js';

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  checkHoneypot,
  contactValidationRules,
  validate,
  submitContactMessage
);

export default router;
