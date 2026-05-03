'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
export { TopBarStyles } from './topbar.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopBarUser {
  /** Display name shown in the user area */
  name: string
  /** Role or subtitle shown below the name */
  role: string
  /** URL for the avatar image — initials are shown as fallback */
  avatarSrc?: string
}

export interface TopBarProps {
  /** User info displayed on the right */
  user?: TopBarUser
  /** Current theme — controls the Light/Dark toggle */
  theme?: 'light' | 'dark'
  /** Called when the theme toggle is clicked */
  onThemeChange?: (theme: 'light' | 'dark') => void
  /** Called when the sidebar collapse/expand button is clicked */
  onToggleSidebar?: () => void
  /** Called when the notifications button is clicked */
  onNotificationsClick?: () => void
  /** Called when the user area is clicked */
  onUserClick?: () => void
  className?: string
}

// ─── Icons (paths from /docs/public/icons) ───────────────────────────────────

const DockToRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5H4V2.5H2.5V9.5ZM4.75 9.5H9.5V2.5H4.75V9.5ZM1.75 10.25V1.75H10.25V10.25H1.75Z" fill="currentColor" />
  </svg>
)

const NotificationsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.25 9.44225V8.69238H3.15387V4.9615C3.15387 4.28908 3.36142 3.69454 3.7765 3.17787C4.1915 2.66121 4.72433 2.33075 5.375 2.1865V1.25H6.625V2.1865C7.27567 2.33075 7.8085 2.66121 8.2235 3.17787C8.63858 3.69454 8.84613 4.28908 8.84613 4.9615V8.69238H9.75V9.44225H2.25ZM5.99913 10.8461C5.75038 10.8461 5.53771 10.7576 5.36113 10.5806C5.18446 10.4036 5.09613 10.1908 5.09613 9.94225H6.90387C6.90387 10.1917 6.81529 10.4047 6.63812 10.5813C6.46096 10.7578 6.24796 10.8461 5.99913 10.8461ZM3.90387 8.69238H8.09613V4.9615C8.09613 4.38267 7.8915 3.88862 7.48225 3.47937C7.07292 3.07004 6.57883 2.86537 6 2.86537C5.42117 2.86537 4.92708 3.07004 4.51775 3.47937C4.1085 3.88862 3.90387 4.38267 3.90387 4.9615V8.69238Z" fill="currentColor" />
  </svg>
)

const KeyboardArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.99973 7.52685L3.17285 4.69997L3.69973 4.1731L5.99973 6.4731L8.29973 4.1731L8.8266 4.69997L5.99973 7.52685Z" fill="currentColor" />
  </svg>
)

// ─── Avatar fallback — initials from name ─────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

/**
 * Application top bar with sidebar toggle, theme switch, notifications, and user info.
 *
 * @example
 * <TopBar
 *   user={{ name: 'Julia Doe', role: 'Coordinador General', avatarSrc: '/avatar.jpg' }}
 *   theme="light"
 *   onThemeChange={(t) => setTheme(t)}
 *   onToggleSidebar={() => setCollapsed(c => !c)}
 * />
 */
const TopBar: React.FC<TopBarProps> = ({
  user,
  theme = 'light',
  onThemeChange,
  onToggleSidebar,
  onNotificationsClick,
  onUserClick,
  className,
}) => {
  const isDark = theme === 'dark'

  const handleThemeToggle = () => {
    onThemeChange?.(isDark ? 'light' : 'dark')
  }

  return (
    <header className={cn('sq-topbar', className)} aria-label="Top bar">

      {/* ── Sidebar toggle ────────────────────────────────────── */}
      <button
        className="sq-topbar-icon-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        type="button"
      >
        <span className="sq-topbar-icon">
          <DockToRightIcon />
        </span>
      </button>

      {/* ── Spacer ────────────────────────────────────────────── */}
      <div className="sq-topbar-spacer" aria-hidden="true" />

      {/* ── Right: user controls ──────────────────────────────── */}
      <div className="sq-topbar-right">

        {/* Theme toggle */}
        <div className="sq-topbar-theme">
          <span
            className="sq-topbar-theme-label"
            onClick={handleThemeToggle}
          >
            Light
          </span>
          <button
            className="sq-topbar-switch"
            data-checked={isDark ? 'true' : 'false'}
            onClick={handleThemeToggle}
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            type="button"
          >
            <span className="sq-topbar-switch-thumb" />
          </button>
          <span
            className="sq-topbar-theme-label"
            onClick={handleThemeToggle}
          >
            Dark
          </span>
        </div>

        {/* Notifications */}
        <button
          className={cn('sq-topbar-icon-btn', 'sq-topbar-icon-btn-outline')}
          onClick={onNotificationsClick}
          aria-label="Notifications"
          type="button"
        >
          <span className="sq-topbar-icon">
            <NotificationsIcon />
          </span>
        </button>

        {/* Separator */}
        <div className="sq-topbar-separator" aria-hidden="true" />

        {/* User info */}
        {user && (
          <button
            className="sq-topbar-user"
            onClick={onUserClick}
            type="button"
            aria-label={`User menu — ${user.name}`}
          >
            {/* Avatar */}
            <div className="sq-topbar-avatar">
              {user.avatarSrc ? (
                <img src={user.avatarSrc} alt={user.name} />
              ) : (
                getInitials(user.name)
              )}
            </div>

            {/* Name + role */}
            <div className="sq-topbar-user-info">
              <span className="sq-topbar-user-name">{user.name}</span>
              <span className="sq-topbar-user-role">{user.role}</span>
            </div>

            {/* Chevron */}
            <span className="sq-topbar-chevron">
              <KeyboardArrowDownIcon />
            </span>
          </button>
        )}
      </div>
    </header>
  )
}

TopBar.displayName = 'TopBar'

export { TopBar }
