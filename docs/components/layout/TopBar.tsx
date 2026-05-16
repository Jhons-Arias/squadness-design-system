'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getAllNavItems } from '@/lib/nav'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const ALL_ITEMS = getAllNavItems()

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M21 21L16.5 16.5M19 11A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

interface TopBarProps {
  onMenuToggle?: () => void
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_ITEMS.filter(item => item.label.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function navigate(slug: string) {
    router.push(`/${slug}`)
    setOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setOpen(true)
    setActiveIdx(0)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[activeIdx]) navigate(results[activeIdx].slug)
    }
  }

  const showDropdown = open && results.length > 0

  return (
    <header className="docs-topbar">
      {/* Hamburger — mobile only */}
      {onMenuToggle && (
        <button
          className="docs-topbar-hamburger"
          onClick={onMenuToggle}
          aria-label="Abrir menú"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* Logo + wordmark */}
      <Link href="/components/button" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/Logo Squadness.png`}
          alt="Squadness"
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
        <span style={{
          fontFamily: 'var(--sq-font-body)',
          fontWeight: 600,
          fontSize: 15,
          color: 'var(--sq-text-default)',
          letterSpacing: '-0.01em',
        }}>
          Docs
        </span>
      </Link>

      {/* Push search to the right */}
      <div style={{ flex: 1 }} />

      {/* Search bar */}
      <div ref={wrapRef} className="docs-topbar-search" style={{ position: 'relative', width: 248 }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            height: 34, padding: '0 10px',
            background: 'var(--sq-surface-default)',
            border: '1px solid var(--sq-border-subtle)',
            borderRadius: 'var(--sq-radius-sm)',
            color: 'var(--sq-text-subtlest)',
            cursor: 'text',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar componente..."
            value={query}
            onChange={onInputChange}
            onFocus={() => { if (query) setOpen(true) }}
            onKeyDown={onKeyDown}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent',
              fontSize: 13,
              fontFamily: 'var(--sq-font-body)',
              color: 'var(--sq-text-default)',
              minWidth: 0,
            }}
          />

          {/* ⌘K hint when idle */}
          {!query && (
            <span style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
              <kbd style={{
                padding: '1px 5px',
                background: 'var(--sq-surface-raised)',
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 4,
                fontSize: 10,
                fontFamily: 'var(--sq-font-body)',
                color: 'var(--sq-text-subtlest)',
              }}>⌘</kbd>
              <kbd style={{
                padding: '1px 5px',
                background: 'var(--sq-surface-raised)',
                border: '1px solid var(--sq-border-subtle)',
                borderRadius: 4,
                fontSize: 10,
                fontFamily: 'var(--sq-font-body)',
                color: 'var(--sq-text-subtlest)',
              }}>K</kbd>
            </span>
          )}

          {/* Clear button */}
          {query && (
            <button
              onClick={() => { setQuery(''); setOpen(false) }}
              style={{
                border: 'none', background: 'none', cursor: 'pointer',
                color: 'var(--sq-text-subtlest)', padding: 0, lineHeight: 0, flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3.2 9.33 2.67 8.8 5.47 6 2.67 3.2l.53-.53L6 5.47l2.8-2.8.53.53L6.53 6l2.8 2.8-.53.53L6 6.53z" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>

        {/* Results dropdown */}
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0, right: 0,
            background: 'var(--sq-surface-raised)',
            border: '1px solid var(--sq-border-subtle)',
            borderRadius: 'var(--sq-radius-sm)',
            boxShadow: '0 8px 24px rgba(5,21,36,0.10)',
            overflow: 'hidden',
            zIndex: 100,
          }}>
            {results.map((item, idx) => {
              const isActive = idx === activeIdx
              const section = item.slug.split('/')[0]
              const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1)
              return (
                <button
                  key={item.slug}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => navigate(item.slug)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '8px 12px',
                    background: isActive ? 'var(--sq-surface-default)' : 'transparent',
                    border: 'none', borderBottom: '1px solid var(--sq-border-default)',
                    cursor: 'pointer', textAlign: 'left', gap: 8,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 500,
                    color: 'var(--sq-text-default)',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--sq-font-body)', fontSize: 11,
                    color: 'var(--sq-text-subtlest)', flexShrink: 0,
                  }}>
                    {sectionLabel}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
