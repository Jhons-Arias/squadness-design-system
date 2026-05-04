'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Layout, PageHeader, PageBody, LayoutStyles } from '@squadness/ui/layout'
import { Button, ButtonStyles } from '@squadness/ui/button'
import { Badge, BadgeStyles } from '@squadness/ui/badge'

// ── Iconos ────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.25 10.25V4.62498L6 1.80286L9.75 4.62498V10.25H6.95188V6.90386H5.04813V10.25H2.25Z" fill="currentColor" />
  </svg>
)

const UsersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M0.75 9.75V8.7C0.75 8.3625 0.834375 8.05313 1.00313 7.77188C1.17188 7.49063 1.4 7.275 1.6875 7.125C2.3 6.8125 2.92188 6.57813 3.55313 6.42188C4.18438 6.26563 4.8375 6.1875 5.25 6.1875C5.4625 6.1875 5.6719 6.19375 5.8781 6.20625C5.6 6.4625 5.4094 6.675 5.2781 6.9C5.1719 7.125 5.0875 7.3594 5.025 7.6031C4.875 7.5844 4.725 7.5719 4.575 7.5656C4.425 7.5594 4.275 7.5563 4.125 7.5563C3.5 7.5563 2.8906 7.625 2.2969 7.7625C1.7031 7.9 1.125 8.1 0.5625 8.3625C0.45 8.4125 0.3563 8.4906 0.2813 8.5969C0.2063 8.7031 0.1688 8.8125 0.1688 8.925V9.25H5.025C5.125 9.4875 5.2438 9.7125 5.3813 9.925H0.75V9.75Z" fill="currentColor"/>
  </svg>
)

const ChartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 9.75V5.25H3V9.75H1.5ZM5.25 9.75V2.25H6.75V9.75H5.25ZM9 9.75V6.75H10.5V9.75H9Z" fill="currentColor"/>
  </svg>
)

// ── Nav items ─────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'home',      label: 'Inicio',     icon: <HomeIcon />,  href: '/playground' },
  { id: 'clients',   label: 'Clientes',   icon: <UsersIcon />, href: '/clients'    },
  {
    id: 'inventory', label: 'Inventario', icon: <ChartIcon />,
    children: [
      { id: 'inv-status',    label: 'Estado',     href: '/inventory/status'    },
      { id: 'inv-warehouse', label: 'En almacén', href: '/inventory/warehouse' },
    ],
  },
]

function getActiveId(path: string) {
  for (const item of navItems) {
    if (item.href === path) return item.id
    if (item.children) {
      const child = item.children.find(c => c.href === path)
      if (child) return child.id
    }
  }
  return 'home'
}

// ── Página ────────────────────────────────────────────────────────────────────

const ALL_STYLES = LayoutStyles + ButtonStyles + BadgeStyles

export default function PlaygroundPage() {
  const pathname = usePathname()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ALL_STYLES }} />

      <Layout
        sidebarItems={navItems}
        activeId={getActiveId(pathname)}
        onItemClick={(item) => console.log('navegar a', item.href)}
        user={{ name: 'Julia Doe', role: 'Coordinador General' }}
        sidebarLogo={<img src="/Logotipo Squadness.png" width={126} height={32} alt="Squadness" />}
        sidebarLogoCollapsed={<img src="/Logo Collapsed.png" width={32} height={32} alt="Squadness" />}
      >
        <PageHeader
          title="Inicio"
          description="Bienvenido al playground del design system."
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline">Exportar</Button>
              <Button variant="primary">Nueva orden</Button>
            </div>
          }
        />
        <PageBody>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="success">Activo</Badge>
            <Badge variant="warning">Pendiente</Badge>
            <Badge variant="error">Cancelado</Badge>
          </div>
        </PageBody>
      </Layout>
    </>
  )
}
