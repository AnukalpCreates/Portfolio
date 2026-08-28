import React from 'react'
import { projects } from '../data/portfolioData'
import ProjectCard from './ProjectCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Projects() {
  const headerRef = useScrollReveal()
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A collection of projects that showcase my skills and development journey.
          </p>
        </div>

        <div className="projects-grid">
          {/* Featured projects — larger cards */}
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Other projects — grid layout */}
          {otherProjects.length > 0 && (
            <div className="projects-secondary">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
