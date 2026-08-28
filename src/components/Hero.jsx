import React from 'react'
import { personalInfo, socialLinks } from '../data/portfolioData'
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodolioIcon, ArrowRightIcon } from './Icons'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const revealRef = useScrollReveal()

  return (
    <section id="home" className="hero">
      {/* Background elements */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        {/* Text side */}
        <div className="hero-text" ref={revealRef}>
          <p className="hero-greeting">
            <span className="wave" role="img" aria-label="wave">👋</span>
            Hi, I'm
          </p>
          <h1 className="hero-name">
            <span className="highlight">{personalInfo.name}</span>
          </h1>
          <p className="hero-role">
            <span className="dot" aria-hidden="true" />
            {personalInfo.role} ({personalInfo.specialization})
          </p>
          <p className="hero-description">{personalInfo.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View Projects
              <ArrowRightIcon style={{ width: 16, height: 16 }} />
            </a>
            <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Contact Me
            </a>
          </div>

          <div className="hero-social">
            <span className="hero-social-label">Find me on</span>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub Profile">
              <GitHubIcon />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile">
              <LinkedInIcon />
            </a>
            <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode Profile">
              <LeetCodeIcon />
            </a>
            <a href={socialLinks.codolio} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Codolio Profile">
              <CodolioIcon />
            </a>
          </div>
        </div>

        {/* Photo + Terminal visual */}
        <div className="hero-visual">
          <div className="hero-visual-stack">
            <div className="hero-photo-wrapper">
              <div className="hero-photo-ring" aria-hidden="true" />
              <img
                src="/anukalp-photo.jpg"
                alt="Anukalp Bajpai"
                className="hero-photo"
                loading="eager"
              />
            </div>
          <div className="terminal" role="img" aria-label="Decorative code terminal">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">anukalp@dev ~ portfolio</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">~$</span>
                <span className="terminal-command">whoami</span>
              </div>
              <div className="terminal-output">Anukalp Bajpai</div>
              <br />
              <div className="terminal-line">
                <span className="terminal-prompt">~$</span>
                <span className="terminal-command">cat skills.json</span>
              </div>
              <div className="terminal-output">{'{'}</div>
              <div className="terminal-output">&nbsp;&nbsp;"stack": "MERN",</div>
              <div className="terminal-output">&nbsp;&nbsp;"frontend": "React.js",</div>
              <div className="terminal-output">&nbsp;&nbsp;"backend": "Node.js",</div>
              <div className="terminal-output">&nbsp;&nbsp;"database": "MongoDB",</div>
              <div className="terminal-output">&nbsp;&nbsp;"dsa": "C++",</div>
              <div className="terminal-output">&nbsp;&nbsp;"focus": "Building & Learning"</div>
              <div className="terminal-output">{'}'}</div>
              <br />
              <div className="terminal-line">
                <span className="terminal-prompt">~$</span>
                <span className="terminal-command">echo $STATUS</span>
              </div>
              <div className="terminal-output">Open to opportunities ✨</div>
              <br />
              <div className="terminal-line">
                <span className="terminal-prompt">~$</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
