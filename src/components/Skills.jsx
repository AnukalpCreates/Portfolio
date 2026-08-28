import React from 'react'
import { skills } from '../data/portfolioData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  HTMLIcon, CSSIcon, JavaScriptIcon, ReactIcon,
  NodeIcon, ExpressIcon, MongoDBIcon,
  PythonIcon, CppIcon, DSAIcon, CPIcon,
} from './Icons'

const iconMap = {
  html: HTMLIcon,
  css: CSSIcon,
  javascript: JavaScriptIcon,
  react: ReactIcon,
  nodejs: NodeIcon,
  express: ExpressIcon,
  mongodb: MongoDBIcon,
  python: PythonIcon,
  cpp: CppIcon,
  dsa: DSAIcon,
  cp: CPIcon,
}

export default function Skills() {
  const headerRef = useScrollReveal()

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            The technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((category, catIdx) => (
            <SkillCategory key={category.category} data={category} index={catIdx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCategory({ data, index }) {
  const ref = useScrollReveal()
  const isMern = data.category === 'Frontend' || data.category === 'Backend' || data.category === 'Database'

  return (
    <div ref={ref} className={`skill-category reveal reveal-delay-${index % 4 + 1}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <h3 className="skill-category-title" style={{ margin: 0 }}>{data.category}</h3>
        {isMern && <span className="mern-badge">MERN</span>}
      </div>
      <div className="skill-items">
        {data.items.map((skill) => {
          const IconComponent = iconMap[skill.icon]
          return (
            <div
              key={skill.name}
              className={`skill-item ${skill.highlighted ? 'highlighted' : ''}`}
            >
              <div className="skill-icon">
                {IconComponent && <IconComponent />}
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
