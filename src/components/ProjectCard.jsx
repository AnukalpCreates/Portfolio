import React from 'react'
import { GitHubIcon, ExternalLinkIcon } from './Icons'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProjectCard({ project }) {
  const ref = useScrollReveal()

  const codeSnippets = {
    'amazon-clone': {
      lines: [
        { type: 'comment', text: '// Amazon Clone — HTML & CSS' },
        { type: 'code', parts: [
          { class: 'keyword', text: '<div ' },
          { class: 'variable', text: 'class' },
          { class: 'keyword', text: '="' },
          { class: 'string', text: 'navbar' },
          { class: 'keyword', text: '">' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '  <div ' },
          { class: 'variable', text: 'class' },
          { class: 'keyword', text: '="' },
          { class: 'string', text: 'nav-logo' },
          { class: 'keyword', text: '">' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '    <img ' },
          { class: 'variable', text: 'src' },
          { class: 'keyword', text: '="' },
          { class: 'string', text: 'logo.png' },
          { class: 'keyword', text: '"/>' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '  </div>' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '  <div ' },
          { class: 'variable', text: 'class' },
          { class: 'keyword', text: '="' },
          { class: 'string', text: 'search-box' },
          { class: 'keyword', text: '">...</div>' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '</div>' },
        ]},
      ],
    },
    'rock-paper-scissors': {
      lines: [
        { type: 'comment', text: '// Rock Paper Scissors Game' },
        { type: 'code', parts: [
          { class: 'keyword', text: 'function ' },
          { class: 'function', text: 'playRound' },
          { class: 'keyword', text: '(' },
          { class: 'variable', text: 'choice' },
          { class: 'keyword', text: ') {' },
        ]},
        { type: 'code', parts: [
          { text: '  ' },
          { class: 'keyword', text: 'const ' },
          { class: 'variable', text: 'cpu' },
          { text: ' = ' },
          { class: 'function', text: 'getRandomMove' },
          { class: 'keyword', text: '()' },
        ]},
        { type: 'code', parts: [
          { text: '  ' },
          { class: 'keyword', text: 'if ' },
          { text: '(' },
          { class: 'variable', text: 'choice' },
          { text: ' === ' },
          { class: 'variable', text: 'cpu' },
          { class: 'keyword', text: ')' },
        ]},
        { type: 'code', parts: [
          { text: '    ' },
          { class: 'keyword', text: 'return ' },
          { class: 'string', text: '"Draw!"' },
        ]},
        { type: 'code', parts: [
          { class: 'keyword', text: '}' },
        ]},
      ],
    },
    'python-calculator': {
      lines: [
        { type: 'comment', text: '# Python Calculator' },
        { type: 'code', parts: [
          { class: 'keyword', text: 'def ' },
          { class: 'function', text: 'calculate' },
          { class: 'keyword', text: '(' },
          { class: 'variable', text: 'a, b, op' },
          { class: 'keyword', text: '):' },
        ]},
        { type: 'code', parts: [
          { text: '  ' },
          { class: 'keyword', text: 'if ' },
          { class: 'variable', text: 'op' },
          { text: ' == ' },
          { class: 'string', text: '"+"' },
          { class: 'keyword', text: ':' },
        ]},
        { type: 'code', parts: [
          { text: '    ' },
          { class: 'keyword', text: 'return ' },
          { class: 'variable', text: 'a + b' },
        ]},
        { type: 'code', parts: [
          { text: '  ' },
          { class: 'keyword', text: 'elif ' },
          { class: 'variable', text: 'op' },
          { text: ' == ' },
          { class: 'string', text: '"-"' },
          { class: 'keyword', text: ':' },
        ]},
        { type: 'code', parts: [
          { text: '    ' },
          { class: 'keyword', text: 'return ' },
          { class: 'variable', text: 'a - b' },
        ]},
      ],
    },
  }

  const snippet = codeSnippets[project.id]

  return (
    <div ref={ref} className={`project-card reveal ${project.featured ? 'featured' : ''}`}>
      {/* Project Preview */}
      <div className="project-preview">
        <div className="project-preview-placeholder">
          {snippet && (
            <div className="project-preview-code">
              {snippet.lines.map((line, i) => (
                <div key={i}>
                  {line.type === 'comment' ? (
                    <span className="comment">{line.text}</span>
                  ) : (
                    line.parts.map((part, j) => (
                      <span key={j} className={part.class || ''}>{part.text}</span>
                    ))
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        {project.featured && (
          <div className="project-featured-badge">★ Featured Project</div>
        )}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {project.features && project.features.length > 0 && (
          <div className="project-features">
            <h4>Key Features</h4>
            <ul>
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link github"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GitHubIcon />
            View Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link live"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLinkIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
