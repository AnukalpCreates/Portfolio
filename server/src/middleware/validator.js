import { body, validationResult } from 'express-validator';

/**
 * Anti-spam Honeypot Middleware
 * If the hidden 'website' or '_gotcha' field is populated, reject the submission as bot spam.
 */
export const checkHoneypot = (req, res, next) => {
  if (req.body.website || req.body._gotcha || req.body.botField) {
    // Return standard success to mislead bots without processing
    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  }
  next();
};

/**
 * Validation rules for Contact Form
 */
export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Email cannot exceed 254 characters')
    .normalizeEmail({ gmail_remove_dots: false }),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 5 })
    .withMessage('Message must be at least 5 characters long')
    .isLength({ max: 5000 })
    .withMessage('Message cannot exceed 5000 characters')
    .escape(),
];

/**
 * Validate request and format error response
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = {};
  errors.array().forEach((err) => {
    if (!extractedErrors[err.path]) {
      extractedErrors[err.path] = err.msg;
    }
  });

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};
