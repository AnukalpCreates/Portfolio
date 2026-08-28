import React from 'react'
import { codingProfiles, socialLinks, personalInfo } from '../data/portfolioData'
import { ExternalLinkIcon, LeetCodeIcon, CodolioIcon, GFGIcon } from './Icons'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
import { useCodingStats } from '../hooks/useCodingStats'

export default function CodingStats() {
  const headerRef = useScrollReveal()
  const cardRef = useScrollReveal()
  const { stats, loading, source, lastUpdated, error } = useCodingStats()

  // While loading, show skeleton-like values
  const questionsSolved = stats?.questionsSolved ?? 0
  const activeDays = stats?.activeDays ?? 0
  const primaryLanguage = stats?.primaryLanguage ?? 'C++'
  const focus = stats?.focus ?? 'DSA + CP'
  const username = stats?.username ?? '@anukalpcodes'

  return (
    <section id="dsa" className="section dsa-section">
      <div className="container">
        <div ref={headerRef} className="reveal">
          <span className="section-label">Problem Solving</span>
          <h2 className="section-title">Competitive Programming & DSA</h2>
          <p className="section-subtitle">
            Actively strengthening problem-solving skills through consistent practice.
          </p>
        </div>

        <div className="dsa-layout">
          {/* Codolio-inspired profile card */}
          <div ref={cardRef} className="reveal">
            <div className="codolio-card">
              {/* Photo */}
              <div className="codolio-photo-wrapper">
                <img
                  src="/anukalp-photo.jpg"
                  alt="Anukalp Bajpai"
                  className="codolio-photo"
                  loading="lazy"
                />
                <div className="codolio-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* Name */}
              <div className="codolio-name">
                {personalInfo.name}
                <span className="codolio-verified" title="Verified">✓</span>
              </div>

              {/* Username */}
              <span className="codolio-username">{username}</span>

              {/* Stats */}
              <div className="codolio-stats">
                <div className="codolio-stat">
                  <div className="codolio-stat-label">Questions Solved</div>
                  {loading ? (
                    <div className="codolio-stat-value stat-loading">...</div>
                  ) : (
                    <CodolioStatValue target={questionsSolved} />
                  )}
                </div>
                <div className="codolio-stat">
                  <div className="codolio-stat-label">Active Days</div>
                  {loading ? (
                    <div className="codolio-stat-value stat-loading">...</div>
                  ) : (
                    <CodolioStatValue target={activeDays} />
                  )}
                </div>
              </div>

              {/* Platforms */}
              <div className="codolio-platforms">
                <span className="codolio-platforms-label">You can find me on ...</span>
                <div className="codolio-platforms-icons">
                  <a href={socialLinks.geeksforgeeks} target="_blank" rel="noopener noreferrer" className="codolio-platform-icon" aria-label="GeeksforGeeks">
                    <GFGIcon />
                  </a>
                  <a href={socialLinks.codolio} target="_blank" rel="noopener noreferrer" className="codolio-platform-icon" aria-label="Codolio">
                    <CodolioIcon />
                  </a>
                  <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="codolio-platform-icon" aria-label="LeetCode">
                    <LeetCodeIcon />
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="codolio-tags">
                <span className="codolio-tag">#C++</span>
                <span className="codolio-tag">#DSA</span>
                <span className="codolio-tag">#CP</span>
              </div>

              {/* Last updated timestamp */}
              {lastUpdated && (
                <div className="stats-timestamp">
                  Last updated: {lastUpdated}
                </div>
              )}
            </div>
          </div>

          {/* Right side: stats + profile cards */}
          <div className="dsa-right">
            {/* Stats Grid */}
            <div className="stats-grid" style={{ marginTop: 0, marginBottom: 0 }}>
              {loading ? (
                <>
                  <StatLoadingCard label="Questions Solved" />
                  <StatLoadingCard label="Active Days" />
                </>
              ) : (
                <>
                  <AnimatedStatCard value={questionsSolved} label="Questions Solved" />
                  <AnimatedStatCard value={activeDays} label="Active Days" />
                </>
              )}
              <StaticStatCard value={primaryLanguage} label="Primary Language" index={2} />
              <StaticStatCard value={focus} label="Focus" index={3} />
            </div>

            {/* Source indicator — only visible when using cached/fallback data with an API configured */}
            {error && (
              <div className="stats-source-note">{error}</div>
            )}

            {/* Profile Cards */}
            <div className="profiles-grid">
              {codingProfiles.map((profile, i) => (
                <ProfileCard key={profile.platform} profile={profile} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CodolioStatValue({ target }) {
  const { count, ref } = useCountUp(target, 1800)
  return <div className="codolio-stat-value" ref={ref}>{count}</div>
}

function AnimatedStatCard({ value, label }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function StatLoadingCard({ label }) {
  return (
    <div className="stat-card">
      <div className="stat-value stat-loading">...</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function StaticStatCard({ value, label, index }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`stat-card reveal reveal-delay-${index + 1}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function ProfileCard({ profile, index }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`profile-card reveal reveal-delay-${index + 1}`}>
      <div
        className="profile-icon"
        style={{
          backgroundColor: `${profile.color}15`,
          color: profile.color,
          border: `1px solid ${profile.color}30`,
        }}
      >
        {profile.platform === 'LeetCode' ? (
          <LeetCodeIcon style={{ width: 22, height: 22 }} />
        ) : profile.platform === 'Codolio' ? (
          <CodolioIcon style={{ width: 22, height: 22 }} />
        ) : (
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
            {profile.platform.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <div className="profile-platform">{profile.platform}</div>
        <div className="profile-username">{profile.username}</div>
      </div>
      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="profile-link"
        aria-label={profile.buttonText}
      >
        {profile.buttonText}
        <ExternalLinkIcon />
      </a>
    </div>
  )
}
