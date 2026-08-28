import React, { useState, useEffect } from 'react'
import { navLinks, personalInfo } from '../data/portfolioData'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <span className="logo-mark">{personalInfo.initials}</span>
          {personalInfo.name}
        </a>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-cta-wrapper">
          <a href="#contact" className="navbar-cta" onClick={(e) => handleNavClick(e, '#contact')}>
            Let's Connect
          </a>
        </div>

        <button
          className={`menu-toggle ${isMobileOpen ? 'open' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.slice(1) ? 'active' : ''}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="navbar-cta" onClick={(e) => handleNavClick(e, '#contact')}>
          Let's Connect
        </a>
      </div>
    </nav>
  )
}
