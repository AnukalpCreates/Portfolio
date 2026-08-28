import React from 'react'
import { education } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Education() {
  const headerRef = useScrollReveal()
  const cardRef = useScrollReveal()

  const edu = education[0]

  return (
    <section id="education" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            My educational journey in Computer Science and Engineering.
          </p>
        </div>

        <div ref={cardRef} className="reveal">
          <div className="edu-card">
            {/* Top row: degree info + CGPA badge */}
            <div className="edu-card-main">
              <div className="edu-card-info">
                <div className="edu-timeline-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {edu.startYear} — {edu.endYear}
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-degree-full">{edu.degreeFullForm}</p>
                <div className="edu-institution">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                  {edu.institution}
                </div>
              </div>

              <div className="edu-cgpa-card">
                <div className="edu-cgpa-value">{edu.cgpa}</div>
                <div className="edu-cgpa-label">CGPA</div>
                <div className="edu-cgpa-sub">Current Academic Performance</div>
              </div>
            </div>

            {/* Focus areas */}
            <div className="edu-focus">
              <h4 className="edu-focus-title">Focus Areas</h4>
              <div className="edu-focus-tags">
                {edu.focusAreas.map((area) => (
                  <span key={area} className="edu-focus-tag">{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
