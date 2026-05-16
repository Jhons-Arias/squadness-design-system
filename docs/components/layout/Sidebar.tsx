'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation, type NavSection } from '@/lib/nav'

function NavItem({ label, slug, onClose }: { label: string; slug: string; onClose?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === `/${slug}`

  return (
    <Link
      href={`/${slug}`}
      className={`docs-nav-item${isActive ? ' active' : ''}`}
      onClick={onClose}
    >
      {label}
    </Link>
  )
}

function NavSection({ section, onClose }: { section: NavSection; onClose?: () => void }) {
  return (
    <div className="docs-nav-group">
      <p className="docs-nav-section-label">{section.label}</p>

      {/* Flat items (Foundations) */}
      {section.items && (
        <div className="docs-nav-section">
          {section.items.map((item) => (
            <NavItem key={item.slug} {...item} onClose={onClose} />
          ))}
        </div>
      )}

      {/* Grouped items (Components) */}
      {section.groups && section.groups.map((group) => (
        <div key={group.label} className="docs-nav-section">
          <p className="docs-nav-group-label">{group.label}</p>
          {group.items.map((item) => (
            <NavItem key={item.slug} {...item} onClose={onClose} />
          ))}
        </div>
      ))}
    </div>
  )
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`docs-sidebar${isOpen ? ' docs-sidebar--open' : ''}`}>
      {navigation.map((section) => (
        <NavSection key={section.label} section={section} onClose={onClose} />
      ))}
    </aside>
  )
}
