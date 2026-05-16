'use client'

import * as React from 'react'
import { Sidebar, type SidebarItem } from './sidebar'
import { TopBar, type TopBarUser } from './topbar'
export { LayoutStyles } from './layout.styles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LayoutProps {
  /** Navigation items passed to the Sidebar */
  sidebarItems: SidebarItem[]
  /** Currently active nav item id */
  activeId?: string
  /** Logo element rendered inside the sidebar header (expanded) */
  sidebarLogo?: React.ReactNode
  /** Logo element shown when sidebar is collapsed (icon-only) */
  sidebarLogoCollapsed?: React.ReactNode
  /** Footer element rendered at the bottom of the sidebar */
  sidebarFooter?: React.ReactNode
  /** User info shown in the TopBar */
  user?: TopBarUser
  /** Initial collapsed state of the sidebar (uncontrolled) */
  defaultCollapsed?: boolean
  /** Controlled collapsed state — use with onCollapsedChange */
  collapsed?: boolean
  /** Called when the sidebar collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Called when a nav item is clicked */
  onItemClick?: (item: SidebarItem) => void
  /** Called when the notifications button is clicked */
  onNotificationsClick?: () => void
  /** Called when the user area is clicked */
  onUserClick?: () => void
  /** Page content — place <PageHeader> and <PageBody> here */
  children?: React.ReactNode
  className?: string
}

export interface PageHeaderProps {
  /** Main page title */
  title: string
  /** Optional subtitle / description */
  description?: string
  /** Right-aligned actions (buttons, filters, etc.) */
  actions?: React.ReactNode
  className?: string
}

export interface PageBodyProps {
  children?: React.ReactNode
  className?: string
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

/**
 * Standard page header with title, optional description and actions slot.
 *
 * @example
 * <PageHeader
 *   title="Estado de inventario"
 *   description="Vista general del inventario en almacén."
 *   actions={<Button variant="primary">Nuevo servicio</Button>}
 * />
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className = '',
}) => (
  <div className={`sq-page-header ${className}`}>
    <div className="sq-page-header-text">
      <h1 className="sq-page-header-title">{title}</h1>
      {description && (
        <p className="sq-page-header-description">{description}</p>
      )}
    </div>
    {actions && (
      <div className="sq-page-header-actions">{actions}</div>
    )}
  </div>
)

PageHeader.displayName = 'PageHeader'

// ─── PageBody ─────────────────────────────────────────────────────────────────

/**
 * Scrollable body area inside the layout card, below the PageHeader.
 */
const PageBody: React.FC<PageBodyProps> = ({ children, className = '' }) => (
  <div className={`sq-page-body ${className}`}>{children}</div>
)

PageBody.displayName = 'PageBody'

// ─── Layout ───────────────────────────────────────────────────────────────────

/**
 * Full-page application shell: collapsible Sidebar + TopBar + scrollable content card.
 *
 * Supports both controlled and uncontrolled collapsed state.
 *
 * @example — Uncontrolled
 * <Layout
 *   sidebarItems={navItems}
 *   sidebarLogo={<img src="/logo.png" alt="Squadness" height={28} />}
 *   activeId="inventory"
 *   user={{ name: 'Julia Doe', role: 'Coordinador General' }}
 *   onItemClick={(item) => router.push(item.href!)}
 * >
 *   <PageHeader title="Estado de inventario" actions={<Button variant="primary">Nuevo</Button>} />
 *   <PageBody>…content…</PageBody>
 * </Layout>
 *
 * @example — Controlled
 * const [collapsed, setCollapsed] = useState(false)
 * <Layout collapsed={collapsed} onCollapsedChange={setCollapsed} …>…</Layout>
 */
const Layout: React.FC<LayoutProps> = ({
  sidebarItems,
  activeId,
  sidebarLogo,
  sidebarLogoCollapsed,
  sidebarFooter,
  user,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  onItemClick,
  onNotificationsClick,
  onUserClick,
  children,
  className = '',
}) => {
  // ── Collapsed state (uncontrolled fallback) ────────────────────────────────
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)

  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed

  const handleToggle = () => {
    const next = !collapsed
    if (!isControlled) setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }

  return (
    <div className={`sq-layout ${className}`}>

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <div
        className="sq-layout-sidebar"
        data-collapsed={String(collapsed)}
      >
        <Sidebar
          items={sidebarItems}
          activeId={activeId}
          collapsed={collapsed}
          logo={sidebarLogo}
          logoCollapsed={sidebarLogoCollapsed}
          footer={sidebarFooter}
          onItemClick={onItemClick}
        />
      </div>

      {/* ── Main column ───────────────────────────────────────── */}
      <div className="sq-layout-main">

        {/* TopBar */}
        <TopBar
          user={user}
          onToggleSidebar={handleToggle}
          onNotificationsClick={onNotificationsClick}
          onUserClick={onUserClick}
        />

        {/* Scrollable body with inner card */}
        <div className="sq-layout-body">
          <div className="sq-layout-card">
            <div className="sq-layout-card-content">
              {children}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

Layout.displayName = 'Layout'

export { Layout, PageHeader, PageBody }
