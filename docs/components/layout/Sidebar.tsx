'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation, type NavSection } from '@/lib/nav'

function NavItem({ label, slug }: { label: string; slug: string }) {
  const pathname = usePathname()
  const isActive = pathname === `/${slug}`

  return (
    <Link href={`/${slug}`} className={`docs-nav-item${isActive ? ' active' : ''}`}>
      {label}
    </Link>
  )
}

function NavSection({ section }: { section: NavSection }) {
  return (
    <div className="docs-nav-group">
      <p className="docs-nav-section-label">{section.label}</p>

      {/* Flat items (Foundations) */}
      {section.items && (
        <div className="docs-nav-section">
          {section.items.map((item) => (
            <NavItem key={item.slug} {...item} />
          ))}
        </div>
      )}

      {/* Grouped items (Components) */}
      {section.groups && section.groups.map((group) => (
        <div key={group.label} className="docs-nav-section">
          <p className="docs-nav-group-label">{group.label}</p>
          {group.items.map((item) => (
            <NavItem key={item.slug} {...item} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="docs-sidebar">
      {navigation.map((section) => (
        <NavSection key={section.label} section={section} />
      ))}
    </aside>
  )
}
