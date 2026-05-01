'use client'

import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  label: string
  level?: 1 | 2   // 1 = top-level, 2 = sub-item (bullet). Defaults to 1.
}

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-10% 0% -75% 0%', threshold: 0 }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <aside className="docs-on-this-page">
      <p className="docs-nav-section-label">On this page</p>
      <div className="docs-nav-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        {items.map((item) => {
          const isActive = active === item.id
          const isSub = item.level === 2

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="docs-nav-item"
              style={{
                paddingLeft: isSub ? 'var(--space-200)' : 'var(--space-075)',
                fontWeight: isActive ? 500 : 400,
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: isSub ? 6 : 0,
              }}
            >
              {isSub && (
                <span style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'currentColor',
                  flexShrink: 0,
                  opacity: 0.5,
                }} />
              )}
              {item.label}
            </a>
          )
        })}
      </div>
    </aside>
  )
}
