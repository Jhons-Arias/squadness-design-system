'use client'

import React, { useState } from 'react'
import { Layout, PageHeader, PageBody } from '@squadness/ui/layout'
import { type SidebarItem } from '@squadness/ui/sidebar'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { LightCodeBlock } from '@/components/docs/LightCodeBlock'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// ─── TOC ──────────────────────────────────────────────────────────────────────

const TOC: TocItem[] = [
  { id: 'preview',     label: 'Preview',            level: 1 },
  { id: 'anatomia',    label: 'Anatomía',            level: 1 },
  { id: 'page-header', label: 'PageHeader',          level: 1 },
  { id: 'colapsado',   label: 'Sidebar colapsado',   level: 1 },
  { id: 'props',       label: 'Props',               level: 1 },
  { id: 'uso',         label: 'Uso en código',       level: 1 },
]

// ─── Shared helpers ───────────────────────────────────────────────────────────

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}
function SubsectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="docs-subsection-title">{children}</h3>
}
function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}
function Divider() {
  return <hr className="docs-divider" />
}
// ─── Icons — same paths used in the Side Bar component ───────────────────────

const HomeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.25 10.25V4.62498L6 1.80286L9.75 4.62498V10.25H6.95188V6.90386H5.04813V10.25H2.25Z" fill="currentColor" />
  </svg>
)

const ShippingIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.92809 9.37012C1.65567 9.09771 1.51946 8.766 1.51946 8.375H0.67334V2.25H8.38484V4.15387H9.71171L11.3271 6.31738V8.375H10.4233C10.4233 8.766 10.2871 9.09771 10.0146 9.37012C9.74217 9.64262 9.41047 9.77887 9.01947 9.77887C8.62847 9.77887 8.29672 9.64262 8.02422 9.37012C7.7518 9.09771 7.61559 8.766 7.61559 8.375H4.32709C4.32709 8.766 4.19088 9.09771 3.91846 9.37012C3.64605 9.64262 3.31434 9.77887 2.92334 9.77887C2.53226 9.77887 2.20051 9.64262 1.92809 9.37012ZM3.38771 8.83938C3.51396 8.71313 3.57709 8.55833 3.57709 8.375C3.57709 8.19167 3.51396 8.03683 3.38771 7.9105C3.26146 7.78425 3.10667 7.72113 2.92334 7.72113C2.74001 7.72113 2.58517 7.78425 2.45884 7.9105C2.33259 8.03683 2.26946 8.19167 2.26946 8.375C2.26946 8.55833 2.33259 8.71313 2.45884 8.83938C2.58517 8.96571 2.74001 9.02887 2.92334 9.02887C3.10667 9.02887 3.26146 8.96571 3.38771 8.83938ZM9.48384 8.83938C9.61017 8.71313 9.67334 8.55833 9.67334 8.375C9.67334 8.19167 9.61017 8.03683 9.48384 7.9105C9.35759 7.78425 9.2028 7.72113 9.01947 7.72113C8.83613 7.72113 8.6813 7.78425 8.55497 7.9105C8.42872 8.03683 8.36559 8.19167 8.36559 8.375C8.36559 8.55833 8.42872 8.71313 8.55497 8.83938C8.6813 8.96571 8.83613 9.02887 9.01947 9.02887C9.2028 9.02887 9.35759 8.96571 9.48384 8.83938ZM8.38484 6.625H10.6252L9.32709 4.90388H8.38484V6.625Z" fill="currentColor" />
  </svg>
)

const ContactsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.59588 10.6154C2.47105 10.6154 2.35955 10.5652 2.26138 10.4649C2.1633 10.3646 2.11426 10.2526 2.11426 10.1289V8.91677C2.11426 8.2241 2.32963 7.61227 2.76038 7.08127C3.19113 6.55027 3.74497 6.21164 4.42188 6.06539C4.11297 6.28206 3.87355 6.55481 3.70363 6.88364C3.53372 7.21248 3.44876 7.56489 3.44876 7.94089V10.1279C3.44876 10.2123 3.46126 10.2967 3.48626 10.381C3.51126 10.4654 3.54976 10.5436 3.60176 10.6154H2.59588ZM4.29188 10.6154C4.16113 10.6154 4.04772 10.5671 3.95163 10.4705C3.85555 10.374 3.80751 10.2601 3.80751 10.1289V7.94139C3.80751 7.39973 3.99692 6.94073 4.37576 6.56439C4.75459 6.18814 5.21484 6.00002 5.75651 6.00002H7.94001C8.47917 6.00002 8.93693 6.18814 9.31326 6.56439C9.68951 6.94073 9.87763 7.39973 9.87763 7.94139V8.67402C9.87763 9.21569 9.68951 9.67464 9.31326 10.0509C8.93693 10.4272 8.47792 10.6154 7.93626 10.6154H4.29188ZM5.99976 5.02689C5.49259 5.02689 5.0623 4.85048 4.70888 4.49764C4.35538 4.14473 4.17863 3.7141 4.17863 3.20577C4.17863 2.69744 4.35538 2.26685 4.70888 1.91402C5.0623 1.5611 5.49259 1.38464 5.99976 1.38464C6.50692 1.38464 6.93722 1.5611 7.29063 1.91402C7.64413 2.26685 7.82088 2.69744 7.82088 3.20577C7.82088 3.7141 7.64413 4.14473 7.29063 4.49764C6.93722 4.85048 6.50692 5.02689 5.99976 5.02689Z" fill="currentColor" />
  </svg>
)

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6.63895 5.66775C6.81562 5.49117 6.90395 5.27821 6.90395 5.02888C6.90395 4.77954 6.81562 4.56654 6.63895 4.38988C6.46237 4.21329 6.24941 4.125 6.00007 4.125C5.75074 4.125 5.53778 4.21329 5.3612 4.38988C5.18453 4.56654 5.0962 4.77954 5.0962 5.02888C5.0962 5.27821 5.18453 5.49117 5.3612 5.66775C5.53778 5.84433 5.75074 5.93262 6.00007 5.93262C6.24941 5.93262 6.46237 5.84433 6.63895 5.66775ZM6.00007 10.7548C4.74174 9.66442 3.79816 8.64971 3.16932 7.71062C2.54049 6.77146 2.22607 5.90925 2.22607 5.124C2.22607 3.97017 2.59928 3.03604 3.3457 2.32162C4.0922 1.60721 4.97699 1.25 6.00007 1.25C7.02316 1.25 7.90795 1.60721 8.65445 2.32162C9.40087 3.03604 9.77407 3.97017 9.77407 5.124C9.77407 5.90925 9.45966 6.77146 8.83082 7.71062C8.20199 8.64971 7.25841 9.66442 6.00007 10.7548Z" fill="currentColor" />
  </svg>
)

const ArticleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3.625 8.375H6.875V7.625H3.625V8.375ZM3.625 6.375H8.375V5.625H3.625V6.375ZM3.625 4.375H8.375V3.625H3.625V4.375ZM1.75 10.25V1.75H10.25V10.25H1.75ZM2.5 9.5H9.5V2.5H2.5V9.5Z" fill="currentColor" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.84588 10.75L4.65551 9.22688C4.52159 9.18204 4.38426 9.11925 4.24351 9.0385C4.10284 8.95767 3.97705 8.87112 3.86613 8.77887L2.45551 9.375L1.30176 7.375L2.52188 6.45288C2.51038 6.37854 2.50222 6.30388 2.49738 6.22888C2.49255 6.15388 2.49013 6.07917 2.49013 6.00475C2.49013 5.93367 2.49255 5.86142 2.49738 5.788C2.50222 5.71458 2.51038 5.63429 2.52188 5.54713L1.30176 4.625L2.45551 2.63463L3.86126 3.226C3.98184 3.1305 4.11055 3.04317 4.24738 2.964C4.38422 2.88483 4.51867 2.82121 4.65076 2.77312L4.84588 1.25H7.15363L7.34401 2.77787C7.49401 2.83237 7.62972 2.896 7.75113 2.96875C7.87263 3.0415 7.99526 3.12725 8.11901 3.226L9.54401 2.63463L10.6978 4.625L9.45838 5.5615C9.4763 5.64225 9.48609 5.71775 9.48776 5.788C9.48934 5.85817 9.49013 5.92883 9.49013 6C9.49013 6.06792 9.48851 6.137 9.48526 6.20725C9.48209 6.27742 9.47059 6.35771 9.45076 6.44813L10.6805 7.375L9.52663 9.375L8.11901 8.774C7.99526 8.87275 7.86897 8.96008 7.74013 9.036C7.6113 9.112 7.47926 9.17404 7.34401 9.22213L7.15363 10.75H4.84588ZM5.49976 10H6.48251L6.66226 8.66062C6.91742 8.59396 7.15059 8.49925 7.36176 8.3765C7.57301 8.25367 7.77672 8.09579 7.97288 7.90287L9.21513 8.425L9.70751 7.575L8.62288 6.75775C8.66455 6.62825 8.69288 6.50129 8.70788 6.37687C8.72297 6.25254 8.73051 6.12692 8.73051 6C8.73051 5.86983 8.72297 5.74421 8.70788 5.62313C8.69288 5.50196 8.66455 5.37821 8.62288 5.25188L9.71701 4.425L9.22476 3.575L7.96801 4.10475C7.80068 3.92592 7.60022 3.76792 7.36663 3.63075C7.13297 3.49358 6.89659 3.39646 6.65751 3.33938L6.49976 2H5.50751L5.34201 3.33463C5.08692 3.39488 4.85138 3.48717 4.63538 3.6115C4.4193 3.73592 4.21317 3.89617 4.01701 4.09225L2.77476 3.575L2.28251 4.425L3.36226 5.22975C3.32059 5.34842 3.29142 5.47183 3.27476 5.6C3.25809 5.72817 3.24976 5.86308 3.24976 6.00475C3.24976 6.13492 3.25809 6.2625 3.27476 6.3875C3.29142 6.5125 3.31901 6.63592 3.35751 6.75775L2.28251 7.575L2.77476 8.425L4.01226 7.9C4.20201 8.09483 4.40488 8.25446 4.62088 8.37888C4.83697 8.50321 5.07576 8.59871 5.33726 8.66537L5.49976 10ZM6.00551 7.5C6.42151 7.5 6.77551 7.354 7.06751 7.062C7.35951 6.77 7.50551 6.416 7.50551 6C7.50551 5.584 7.35951 5.23 7.06751 4.938C6.77551 4.646 6.42151 4.5 6.00551 4.5C5.58434 4.5 5.22905 4.646 4.93963 4.938C4.65022 5.23 4.50551 5.584 4.50551 6C4.50551 6.416 4.65022 6.77 4.93963 7.062C5.22905 7.354 5.58434 7.5 6.00551 7.5Z" fill="currentColor" />
  </svg>
)

// ─── Logos — same images used in the Side Bar component ──────────────────────

const LOGO_EXPANDED = (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`${BASE}/Logotipo Squadness.png`} alt="Squadness" width={126} height={32} style={{ objectFit: 'contain' }} />
)

const LOGO_COLLAPSED = (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`${BASE}/Logo Collapsed.png`} alt="Squadness" width={32} height={32} style={{ objectFit: 'contain' }} />
)

// ─── Nav items — same structure as Side Bar docs ──────────────────────────────

const DEMO_ITEMS: SidebarItem[] = [
  { id: 'inicio',      label: 'Inicio',        icon: <HomeIcon /> },
  {
    id: 'ordenes',     label: 'Órdenes',       icon: <ShippingIcon />,
    children: [
      { id: 'ordenes-activas',   label: 'Activas'   },
      { id: 'ordenes-historial', label: 'Historial' },
    ],
  },
  { id: 'clientes',    label: 'Clientes',      icon: <ContactsIcon /> },
  { id: 'ubicaciones', label: 'Ubicaciones',   icon: <LocationIcon /> },
  { id: 'reportes',    label: 'Reportes',      icon: <ArticleIcon />, badge: 3 },
  { id: 'config',      label: 'Configuración', icon: <SettingsIcon /> },
]

const DEMO_USER = { name: 'Julia Doe', role: 'Coordinador General' }

// ─── Interactive preview ──────────────────────────────────────────────────────

function LayoutPreview() {
  const [activeId, setActiveId] = useState('ordenes-activas')

  return (
    <div style={{
      width: '100%', height: 480, borderRadius: 12,
      border: '1px solid var(--sq-border-subtle)',
      overflow: 'hidden', position: 'relative',
    }}>
      <Layout
        sidebarItems={DEMO_ITEMS}
        sidebarLogo={LOGO_EXPANDED}
        activeId={activeId}
        user={DEMO_USER}
        onItemClick={(item) => { if (!item.children) setActiveId(item.id) }}
      >
        <PageHeader
          title="Estado de inventario"
          description="Vista general del inventario de servicios en almacén."
          actions={
            <button style={{
              height: 32, padding: '0 14px',
              background: 'var(--sq-brand)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 600,
            }}>
              Nuevo servicio
            </button>
          }
        />
        <PageBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Servicios activos',    value: '142', color: '#3c6300' },
              { label: 'En tránsito',          value: '38',  color: '#005fdb' },
              { label: 'Pendientes de entrega', value: '27', color: '#92400e' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', border: '1px solid var(--sq-border-subtle)',
                borderRadius: 10, background: 'var(--sq-surface-default)',
              }}>
                <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtle)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--sq-font-body)', fontSize: 18, fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </div>
        </PageBody>
      </Layout>
    </div>
  )
}

// ─── Collapsed preview ────────────────────────────────────────────────────────

function CollapsedPreview() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setCollapsed(false)}
          style={{
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            fontFamily: 'var(--sq-font-body)', fontSize: 12, fontWeight: 500,
            border: '1px solid var(--sq-border-subtle)',
            background: !collapsed ? 'var(--sq-brand)' : 'var(--sq-surface-default)',
            color: !collapsed ? '#fff' : 'var(--sq-text-subtle)',
          }}
        >Expandido</button>
        <button
          onClick={() => setCollapsed(true)}
          style={{
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            fontFamily: 'var(--sq-font-body)', fontSize: 12, fontWeight: 500,
            border: '1px solid var(--sq-border-subtle)',
            background: collapsed ? 'var(--sq-brand)' : 'var(--sq-surface-default)',
            color: collapsed ? '#fff' : 'var(--sq-text-subtle)',
          }}
        >Colapsado</button>
      </div>
      <div style={{
        width: '100%', height: 380, borderRadius: 12,
        border: '1px solid var(--sq-border-subtle)',
        overflow: 'hidden',
      }}>
        <Layout
          sidebarItems={DEMO_ITEMS}
          sidebarLogo={collapsed ? LOGO_COLLAPSED : LOGO_EXPANDED}
          activeId="inicio"
          user={DEMO_USER}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        >
          <PageHeader title="Inicio" />
          <PageBody>
            <p style={{ fontFamily: 'var(--sq-font-body)', fontSize: 13, color: 'var(--sq-text-subtlest)' }}>
              Haz clic en el ícono de sidebar en el TopBar para colapsar / expandir el panel.
            </p>
          </PageBody>
        </Layout>
      </div>
    </div>
  )
}

// ─── PageHeader variants ──────────────────────────────────────────────────────

function PageHeaderVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Solo título */}
      <div style={{ border: '1px solid var(--sq-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <PageHeader title="Solo título" />
      </div>
      {/* Título + descripción */}
      <div style={{ border: '1px solid var(--sq-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <PageHeader
          title="Título con descripción"
          description="Texto de apoyo que describe el contenido de esta página."
        />
      </div>
      {/* Título + acción */}
      <div style={{ border: '1px solid var(--sq-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <PageHeader
          title="Con acción primaria"
          actions={
            <button style={{
              height: 32, padding: '0 14px',
              background: 'var(--sq-brand)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 600,
            }}>Nuevo</button>
          }
        />
      </div>
      {/* Título + descripción + múltiples acciones */}
      <div style={{ border: '1px solid var(--sq-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <PageHeader
          title="Completo"
          description="Título, descripción y múltiples acciones."
          actions={
            <>
              <button style={{
                height: 32, padding: '0 14px',
                background: 'var(--sq-surface-default)', color: 'var(--sq-text-subtle)',
                border: '1px solid var(--sq-border-subtle)', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 500,
              }}>Exportar</button>
              <button style={{
                height: 32, padding: '0 14px',
                background: 'var(--sq-brand)', color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'var(--sq-font-body)', fontSize: 13, fontWeight: 600,
              }}>Nuevo servicio</button>
            </>
          }
        />
      </div>
    </div>
  )
}

// ─── Props table ──────────────────────────────────────────────────────────────

const LAYOUT_PROPS = [
  { prop: 'sidebarItems',      type: 'SidebarItem[]',                 default: '—',      desc: 'Árbol de ítems de navegación.' },
  { prop: 'activeId',          type: 'string',                        default: '—',      desc: 'ID del ítem activo en la sidebar.' },
  { prop: 'sidebarLogo',       type: 'ReactNode',                     default: '—',      desc: 'Elemento de logo en la cabecera del sidebar.' },
  { prop: 'sidebarFooter',     type: 'ReactNode',                     default: '—',      desc: 'Elemento fijo en el pie del sidebar.' },
  { prop: 'user',              type: 'TopBarUser',                    default: '—',      desc: 'Datos del usuario en el TopBar.' },
  { prop: 'defaultCollapsed',  type: 'boolean',                       default: 'false',  desc: 'Estado inicial de la sidebar (no controlado).' },
  { prop: 'collapsed',         type: 'boolean',                       default: '—',      desc: 'Estado controlado de la sidebar.' },
  { prop: 'onCollapsedChange', type: '(collapsed: boolean) => void',  default: '—',      desc: 'Callback cuando cambia el estado de collapse.' },
  { prop: 'onItemClick',       type: '(item: SidebarItem) => void',   default: '—',      desc: 'Callback al hacer clic en un ítem de la sidebar.' },
  { prop: 'onNotificationsClick', type: '() => void',                 default: '—',      desc: 'Callback al hacer clic en notificaciones.' },
  { prop: 'onUserClick',       type: '() => void',                    default: '—',      desc: 'Callback al hacer clic en el área de usuario.' },
  { prop: 'children',          type: 'ReactNode',                     default: '—',      desc: 'Contenido — normalmente <PageHeader> + <PageBody>.' },
]

const PAGEHEADER_PROPS = [
  { prop: 'title',       type: 'string',    default: '—', desc: 'Título principal de la página.' },
  { prop: 'description', type: 'string',    default: '—', desc: 'Subtítulo o descripción opcional.' },
  { prop: 'actions',     type: 'ReactNode', default: '—', desc: 'Botones u otros controles alineados a la derecha.' },
]

function PropsTable({ rows }: { rows: typeof LAYOUT_PROPS }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--sq-font-body)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--sq-border-subtle)' }}>
            {['Prop', 'Tipo', 'Default', 'Descripción'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                color: 'var(--sq-text-subtlest)', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--sq-border-default)' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-brand)', background: 'rgba(0,95,219,0.06)', padding: '2px 6px', borderRadius: 4 }}>{row.prop}</code>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 11, color: 'var(--sq-text-subtlest)' }}>{row.type}</code>
              </td>
              <td style={{ padding: '10px 12px', fontFamily: 'var(--sq-font-mono)', fontSize: 12, color: 'var(--sq-text-subtlest)' }}>{row.default}</td>
              <td style={{ padding: '10px 12px', color: 'var(--sq-text-subtle)', lineHeight: 1.5 }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Tokens ───────────────────────────────────────────────────────────────────


// ─── Code examples ────────────────────────────────────────────────────────────

const codeBasic = `import { Layout, PageHeader, PageBody } from '@squadness/ui/layout'
import { LayoutStyles } from '@squadness/ui/layout.styles'

// 1. Inyectar estilos una vez (en tu layout raíz)
<style dangerouslySetInnerHTML={{ __html: LayoutStyles }} />

// 2. Usar el componente
const navItems = [
  { id: 'home',      label: 'Inicio',     icon: <HomeIcon />,    href: '/'          },
  { id: 'clients',   label: 'Clientes',   icon: <UsersIcon />,   href: '/clients'   },
  {
    id: 'inventory', label: 'Inventario', icon: <ChartIcon />,
    children: [
      { id: 'inv-status',    label: 'Estado',     href: '/inventory/status'    },
      { id: 'inv-warehouse', label: 'En almacén', href: '/inventory/warehouse' },
    ],
  },
]

export default function AppLayout({ children }) {
  const pathname = usePathname()

  return (
    <Layout
      sidebarItems={navItems}
      sidebarLogo={<img src="/logo.png" alt="Squadness" height={28} />}
      activeId={getActiveId(pathname)}
      user={{ name: 'Julia Doe', role: 'Coordinador General', avatarSrc: '/avatar.jpg' }}
      onItemClick={(item) => router.push(item.href!)}
    >
      {children}
    </Layout>
  )
}`

const codeControlled = `// Estado controlado (para persistir en localStorage, URL, etc.)
const [collapsed, setCollapsed] = useState(() => {
  return localStorage.getItem('sidebar-collapsed') === 'true'
})

const handleCollapse = (next: boolean) => {
  setCollapsed(next)
  localStorage.setItem('sidebar-collapsed', String(next))
}

<Layout
  collapsed={collapsed}
  onCollapsedChange={handleCollapse}
  sidebarItems={navItems}
  user={user}
>
  <PageHeader
    title="Estado de inventario"
    description="Vista general del inventario de servicios en almacén."
    actions={<Button variant="primary">Nuevo servicio</Button>}
  />
  <PageBody>
    {/* contenido de la página */}
  </PageBody>
</Layout>`

// ─── Do / Don't ───────────────────────────────────────────────────────────────

const doItems = [
  'Usar <PageHeader> siempre como primer hijo directo del Layout',
  'Pasar onItemClick para manejar la navegación con router',
  'Usar sidebarLogo para mantener la identidad de la marca en el panel',
]
const dontItems = [
  'Anidar un <Layout> dentro de otro Layout',
  'Poner padding extra en <PageBody> — ya tiene su propio padding interno',
  'Usar position:fixed o position:absolute dentro del card de contenido',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function LayoutPage() {
  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components · Navigation</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Layout</h1>
          <Desc>
            Shell de aplicación completo: sidebar colapsable + topbar + área de contenido en tarjeta blanca. Orquesta <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 16 }}>Sidebar</code> y <code style={{ fontFamily: 'var(--sq-font-mono)', fontSize: 16 }}>TopBar</code> con estado de collapse integrado.
          </Desc>
        </div>

        <Divider />

        {/* ── Preview ───────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="preview">Preview</SectionTitle>
          <LayoutPreview />
        </div>

        <Divider />

        {/* ── Anatomía ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="anatomia">Anatomía</SectionTitle>
            <Desc>El Layout está compuesto por cuatro capas apiladas en dos ejes.</Desc>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr', gap: 12,
            padding: '20px', border: '1px solid var(--sq-border-subtle)',
            borderRadius: 12, fontFamily: 'var(--sq-font-body)', fontSize: 13,
          }}>
            {/* Sidebar col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                padding: '10px 12px', borderRadius: 8,
                background: 'rgba(0,95,219,0.07)',
                border: '1.5px dashed rgba(0,95,219,0.3)',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sq-brand)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sidebar</span>
                <span style={{ color: 'var(--sq-text-subtlest)', fontSize: 12 }}>240px · 52px collapsed</span>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--sq-surface-default)', border: '1px solid var(--sq-border-subtle)', color: 'var(--sq-text-subtlest)', fontSize: 12, lineHeight: 1.5 }}>
                Logo + nav items<br/>con soporte de submenú y badge
              </div>
            </div>

            {/* Main col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                padding: '10px 12px', borderRadius: 8,
                background: 'rgba(0,95,219,0.04)',
                border: '1.5px dashed rgba(0,95,219,0.2)',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sq-brand)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>TopBar</span>
                <span style={{ color: 'var(--sq-text-subtlest)', fontSize: 12 }}>56px de alto · toggle + usuario</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--sq-surface-default)', border: '1px solid var(--sq-border-subtle)', color: 'var(--sq-text-subtlest)', fontSize: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--sq-text-subtle)' }}>Content Area</strong> — bg #f8fafc, p-16px<br/>
                  <span style={{ fontSize: 11 }}>└ Inner card (white, radius 16px, overflow scroll)</span>
                </div>
                <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--sq-surface-default)', border: '1px solid var(--sq-border-subtle)', color: 'var(--sq-text-subtlest)', fontSize: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--sq-text-subtle)'  }}>&lt;PageHeader&gt;</strong> — title + description + actions<br/>
                  <strong style={{ color: 'var(--sq-text-subtle)' }}>&lt;PageBody&gt;</strong> — área scrollable con p-16px
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── PageHeader variants ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="page-header">PageHeader</SectionTitle>
            <Desc>Componente de cabecera de página. Acepta título, descripción opcional y un slot de acciones a la derecha.</Desc>
          </div>
          <PageHeaderVariants />
        </div>

        <Divider />

        {/* ── Sidebar colapsado ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionTitle id="colapsado">Sidebar colapsado</SectionTitle>
            <Desc>El botón de toggle en el TopBar alterna la sidebar entre 240px y 52px (solo íconos). El estado puede ser controlado o no controlado.</Desc>
          </div>
          <CollapsedPreview />
        </div>

        <Divider />

        {/* ── Props ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionTitle id="props">Props</SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SubsectionTitle id="props-layout">Layout</SubsectionTitle>
            <PropsTable rows={LAYOUT_PROPS} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SubsectionTitle id="props-pageheader">PageHeader</SubsectionTitle>
            <PropsTable rows={PAGEHEADER_PROPS} />
          </div>
        </div>

        <Divider />

        <Divider />

        {/* ── Do / Don't ────────────────────────────────────────────────────── */}
        <DoDont do={doItems} dont={dontItems} />

        <Divider />

        {/* ── Código ────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionTitle id="uso">Uso en código</SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SubsectionTitle id="uso-basic">Uso básico (no controlado)</SubsectionTitle>
            <LightCodeBlock code={codeBasic} lang="jsx" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SubsectionTitle id="uso-controlled">Estado controlado</SubsectionTitle>
            <LightCodeBlock code={codeControlled} lang="jsx" />
          </div>
        </div>

        <Divider />

        <ReferenceLinks links={[
          { label: 'Sidebar', href: '/components/side-bar' },
          { label: 'Top Bar', href: '/components/top-bar' },
          { label: 'Figma — Layout', href: 'https://www.figma.com/design/1UlbPJBRilqyKlkqtovwpQ/Squadness---Design-System?node-id=373-31030' },
        ]} />

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
