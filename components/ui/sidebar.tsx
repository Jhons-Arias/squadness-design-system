'use client'

import * as React from "react";
import { cn } from "@/lib/utils";
export { SidebarStyles } from "./sidebar.styles";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: SidebarItem[];
  badge?: string | number;
}

export interface SidebarProps {
  /** Navigation items. */
  items: SidebarItem[];
  /** Currently active item id. */
  activeId?: string;
  /** Collapsed = icon-only mode. */
  collapsed?: boolean;
  /** Callback fired when collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Callback fired when a nav item is clicked. */
  onItemClick?: (item: SidebarItem) => void;
  /** Logo area (rendered at the top, expanded state). */
  logo?: React.ReactNode;
  /** Logo shown when sidebar is collapsed (icon-only). Falls back to `logo` if not provided. */
  logoCollapsed?: React.ReactNode;
  /** Footer area (rendered at the bottom). */
  footer?: React.ReactNode;
  className?: string;
}

// ─── Icons (paths from /docs/public/icons) ───────────────────────────────────

/** keyboard_arrow_down — submenu open indicator */
export const KeyboardArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.99973 7.52685L3.17285 4.69997L3.69973 4.1731L5.99973 6.4731L8.29973 4.1731L8.8266 4.69997L5.99973 7.52685Z" fill="currentColor" />
  </svg>
);

/** keyboard_arrow_up — submenu closed indicator */
export const KeyboardArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5.99973 5.22685L3.69973 7.52685L3.17285 6.99997L5.99973 4.1731L8.8266 6.99997L8.29973 7.52685L5.99973 5.22685Z" fill="currentColor" />
  </svg>
);

// ─── SidebarNavItem ───────────────────────────────────────────────────────────

interface NavItemProps {
  item: SidebarItem;
  activeId?: string;
  collapsed: boolean;
  depth?: number;
  onItemClick?: (item: SidebarItem) => void;
}

const SidebarNavItem: React.FC<NavItemProps> = ({
  item,
  activeId,
  collapsed,
  depth = 0,
  onItemClick,
}) => {
  const isActive = activeId === item.id;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [open, setOpen] = React.useState(
    hasChildren && item.children!.some((c) => c.id === activeId)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasChildren) {
      setOpen((v) => !v);
    }
    onItemClick?.(item);
  };

  const Tag = (item.href && !hasChildren ? "a" : "button") as React.ElementType;

  return (
    <li className="sq-sidebar-item-wrap">
      <Tag
        href={item.href}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={hasChildren ? open : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          "sq-sidebar-item",
          isActive && "sq-sidebar-item-active",
          depth > 0 && "sq-sidebar-item-child",
          collapsed && "sq-sidebar-item-collapsed"
        )}
      >
        {/* Icon */}
        {item.icon && (
          <span className="sq-sidebar-icon">{item.icon}</span>
        )}

        {/* Label — hidden when collapsed */}
        {!collapsed && (
          <span className="sq-sidebar-label">{item.label}</span>
        )}

        {/* Badge */}
        {!collapsed && item.badge !== undefined && (
          <span className="sq-sidebar-badge">{item.badge}</span>
        )}

        {/* Expand chevron */}
        {!collapsed && hasChildren && (
          <span className="sq-sidebar-chevron">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </span>
        )}
      </Tag>

      {/* Children */}
      {hasChildren && !collapsed && open && (
        <ul className="sq-sidebar-children" role="group">
          {item.children!.map((child) => (
            <SidebarNavItem
              key={child.id}
              item={child}
              activeId={activeId}
              collapsed={collapsed}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

/**
 * Navigation sidebar with full state support:
 * Expanded · Collapsed (icon-only) · Active Item · Sub-menu · Badge
 *
 * @example
 * <Sidebar
 *   items={navItems}
 *   activeId="dashboard"
 *   logo={<img src="/Logo Squadness.png" alt="Squadness" height={28} />}
 *   onItemClick={(item) => router.push(item.href!)}
 * />
 */
const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  collapsed = false,
  onCollapsedChange,
  onItemClick,
  logo,
  logoCollapsed,
  footer,
  className,
}) => {
  const activeLogo = collapsed ? (logoCollapsed ?? logo) : logo
  return (
    <nav
      className={cn(
        "sq-sidebar",
        collapsed ? "sq-sidebar-collapsed" : "sq-sidebar-expanded",
        className
      )}
      aria-label="Main navigation"
    >
      {/* ── Header: Logo ─────────────────────────────────────────── */}
      {activeLogo && (
        <div className={cn("sq-sidebar-header", collapsed && "sq-sidebar-header-collapsed")}>
          <div className="sq-sidebar-logo">{activeLogo}</div>
        </div>
      )}

      {/* ── Nav items ────────────────────────────────────────────── */}
      <div className="sq-sidebar-nav">
        <ul className="sq-sidebar-nav-list">
          {items.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              activeId={activeId}
              collapsed={collapsed}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      {footer && (
        <div className="sq-sidebar-footer">{footer}</div>
      )}
    </nav>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };
export type { SidebarItem as SidebarNavItemType };
