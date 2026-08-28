import React from 'react'
import { personalInfo } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const headerRef = useScrollReveal()
  const textRef = useScrollReveal()
  const cardRef = useScrollReveal()

  const infoRows = [
    { label: 'Name', value: personalInfo.name },
    { label: 'Role', value: personalInfo.role },
    { label: 'Stack', value: personalInfo.specialization },
    { label: 'Education', value: personalInfo.education },
    { label: 'University', value: personalInfo.university },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Get to know me</h2>
          <p className="section-subtitle">
            A brief introduction about who I am and what I do.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text reveal" ref={textRef}>
            <p>
              I'm <strong>Anukalp Bajpai</strong>, a <strong>B.Tech CSE</strong> student
              at <strong>Lovely Professional University</strong> with a deep passion for
              building modern web applications.
            </p>
            <p>
              As a <strong>Full Stack Developer</strong> specializing in the <strong>MERN stack</strong>,
              I work with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>,
              and <strong>MongoDB</strong> to create functional and visually appealing applications.
            </p>
            <p>
              Beyond web development, I actively practice <strong>Data Structures & Algorithms</strong> and
              {' '}<strong>Competitive Programming</strong> using <strong>C++</strong>, which helps
              strengthen my problem-solving skills and write efficient code.
            </p>
            <p>
              I believe in continuous learning and enjoy taking on challenges that push me
              to grow as a developer. Whether it's building a new project or solving
              algorithmic problems, I'm always looking for opportunities to improve.
            </p>
          </div>


          <div className="reveal about-photo-container" ref={cardRef}>
            <div className="about-photo-wrapper">
              <img
                src="/anukalp-photo.jpg"
                alt="Anukalp Bajpai"
                className="about-photo"
                loading="lazy"
              />
            </div>
            <div className="info-card">
              <div className="info-card-header">
                <span className="dot" aria-hidden="true" />
                <span>developer_info.json</span>
              </div>
              <div className="info-card-body">
                {infoRows.map((row) => (
                  <div className="info-row" key={row.label}>
                    <span className="info-label">{row.label}</span>
                    <span className="info-value">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
