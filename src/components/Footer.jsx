import React from 'react'
import { personalInfo, socialLinks } from '../data/portfolioData'
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodolioIcon, ArrowUpIcon } from './Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinksData = [
    { name: 'GitHub', url: socialLinks.github, Icon: GitHubIcon },
    { name: 'LinkedIn', url: socialLinks.linkedin, Icon: LinkedInIcon },
    { name: 'LeetCode', url: socialLinks.leetcode, Icon: LeetCodeIcon },
    { name: 'Codolio', url: socialLinks.codolio, Icon: CodolioIcon },
    { name: 'GeeksforGeeks', url: socialLinks.geeksforgeeks, Icon: () => (
      <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>GFG</span>
    )},
  ]

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <p className="footer-name">{personalInfo.name}</p>
          <p className="footer-role">
            {personalInfo.role} | {personalInfo.specialization}
          </p>

          <div className="footer-socials">
            {socialLinksData.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={`${name} Profile`}
              >
                <Icon />
              </a>
            ))}
          </div>

          <a href={`mailto:${personalInfo.email}`} className="footer-email">
            {personalInfo.email}
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
            <ArrowUpIcon />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
