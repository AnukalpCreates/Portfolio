import React, { useState } from 'react'
import { personalInfo, socialLinks } from '../data/portfolioData'
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodolioIcon, EmailIcon, SendIcon } from './Icons'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { API_ENDPOINTS } from '../config/api'

export default function Contact() {
  const headerRef = useScrollReveal()
  const infoRef = useScrollReveal()
  const formRef = useScrollReveal()

  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const response = await fetch(API_ENDPOINTS.contact, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            website: formData.website, // honeypot
          }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setSubmitted(true)
          setFormData({ name: '', email: '', message: '', website: '' })
        } else {
          setServerError(data.message || 'Unable to send your message. Please try again.')
          if (data.errors) {
            setErrors(data.errors)
          }
        }
      } catch (err) {
        setServerError('Unable to connect to the server. Please try again later.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (serverError) {
      setServerError(null)
    }
  }

  const socialLinksData = [
    { name: 'GitHub', url: socialLinks.github, Icon: GitHubIcon },
    { name: 'LinkedIn', url: socialLinks.linkedin, Icon: LinkedInIcon },
    { name: 'LeetCode', url: socialLinks.leetcode, Icon: LeetCodeIcon },
    { name: 'Codolio', url: socialLinks.codolio, Icon: CodolioIcon },
  ]

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Build Something Together</h2>
          <p className="section-subtitle">
            I'm always interested in learning, building, and connecting with people passionate about technology.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="reveal" ref={infoRef}>
            <h3>Get in touch</h3>
            <p>
              Whether you have a project idea, a question, or just want to connect —
              feel free to reach out. I'm always happy to chat about web development,
              technology, or new opportunities.
            </p>

            <a href={`mailto:${personalInfo.email}`} className="contact-email">
              <span className="contact-email-icon">
                <EmailIcon style={{ width: 20, height: 20 }} />
              </span>
              <span>{personalInfo.email}</span>
            </a>

            <div className="contact-socials">
              {socialLinksData.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  aria-label={`${name} Profile`}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="reveal">
            {submitted ? (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-lg)',
                padding: 40,
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>
                  Thank you for reaching out! 🎉
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Your message has been sent successfully. I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '', website: '' }) }}
                  className="btn-secondary"
                  style={{ marginTop: 16 }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Anti-spam Honeypot field (hidden from real visitors) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {serverError && (
                  <div
                    role="alert"
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid var(--error)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--error)',
                      fontSize: 'var(--text-sm)',
                      marginBottom: '1rem',
                    }}
                  >
                    {serverError}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your idea or just say hello..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className="form-error" role="alert">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  <SendIcon style={{ width: 16, height: 16 }} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
