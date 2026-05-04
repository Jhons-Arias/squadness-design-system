'use client'

import { useState } from 'react'
import { Layout, PageHeader, PageBody, LayoutStyles } from '@squadness/ui/layout'
import { Button, ButtonStyles } from '@squadness/ui/button'
import { Badge, BadgeStyles } from '@squadness/ui/badge'
import { Table, TableStyles, type TableColumn } from '@squadness/ui/table'
import { Pagination, PaginationStyles } from '@squadness/ui/pagination'
import { DateFilterDropdown, DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown'

// ── Estilos ───────────────────────────────────────────────────────────────────

const ALL_STYLES = LayoutStyles + ButtonStyles + BadgeStyles + TableStyles + PaginationStyles + DateFilterDropdownStyles

// ── Iconos de navegación ──────────────────────────────────────────────────────

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

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.25 8.75H3.5V7.25H7.25V3.5H8.75V7.25H12.5V8.75H8.75V12.5H7.25V8.75Z" fill="currentColor"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M5.25 9.75V6.75L1.5 2.25H10.5L6.75 6.75V9.75H5.25Z" fill="currentColor"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 8.25L2.625 4.875L3.375 4.1L5.4375 6.1625V1.5H6.5625V6.1625L8.625 4.1L9.375 4.875L6 8.25ZM2.25 10.5V9.375H9.75V10.5H2.25Z" fill="currentColor"/>
  </svg>
)

const RowsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 9.5V8.5H10.5V9.5H1.5ZM1.5 7V6H10.5V7H1.5ZM1.5 4.5V3.5H10.5V4.5H1.5Z" fill="currentColor"/>
  </svg>
)

// ── Items de navegación ───────────────────────────────────────────────────────

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

// ── Datos de la tabla ─────────────────────────────────────────────────────────

type BañoRow = {
  id: number
  chapilla: string
  clave: string
  latitud: string
  longitud: string
  estado: 'Disponible' | 'Renta' | 'Recolección'
  ruta: string
}

const ESTADO_VARIANT: Record<BañoRow['estado'], 'success' | 'neutral' | 'warning'> = {
  Disponible:  'success',
  Renta:       'neutral',
  Recolección: 'warning',
}

const tableData: BañoRow[] = [
  { id: 1,  chapilla: '33', clave: '0078', latitud: '25.4995862', longitud: '-100.955862', estado: 'Disponible',  ruta: 'Centro' },
  { id: 2,  chapilla: '34', clave: '0079', latitud: '25.5012340', longitud: '-100.967120', estado: 'Renta',       ruta: 'Centro' },
  { id: 3,  chapilla: '35', clave: '0080', latitud: '25.4987651', longitud: '-100.943210', estado: 'Disponible',  ruta: 'Norte'  },
  { id: 4,  chapilla: '36', clave: '0081', latitud: '25.5034521', longitud: '-100.978900', estado: 'Renta',       ruta: 'Norte'  },
  { id: 5,  chapilla: '37', clave: '0082', latitud: '25.5056789', longitud: '-100.934560', estado: 'Disponible',  ruta: 'Sur'    },
  { id: 6,  chapilla: '38', clave: '0083', latitud: '25.4963214', longitud: '-100.989012', estado: 'Disponible',  ruta: 'Centro' },
  { id: 7,  chapilla: '39', clave: '0084', latitud: '25.5078123', longitud: '-100.921340', estado: 'Renta',       ruta: 'Sur'    },
  { id: 8,  chapilla: '40', clave: '0085', latitud: '25.4941876', longitud: '-100.956780', estado: 'Renta',       ruta: 'Norte'  },
  { id: 9,  chapilla: '41', clave: '0086', latitud: '25.5023456', longitud: '-100.945670', estado: 'Recolección', ruta: 'Centro' },
  { id: 10, chapilla: '42', clave: '0087', latitud: '25.4978901', longitud: '-100.972340', estado: 'Renta',       ruta: 'Sur'    },
  { id: 11, chapilla: '43', clave: '0088', latitud: '25.5045678', longitud: '-100.963210', estado: 'Disponible',  ruta: 'Norte'  },
  { id: 12, chapilla: '44', clave: '0089', latitud: '25.5001234', longitud: '-100.981230', estado: 'Recolección', ruta: 'Centro' },
  { id: 13, chapilla: '45', clave: '0090', latitud: '25.4956789', longitud: '-100.948900', estado: 'Disponible',  ruta: 'Sur'    },
]

const columns: TableColumn<BañoRow>[] = [
  { key: 'chapilla', label: 'CHAPILLA' },
  { key: 'clave',    label: 'CLAVE DE EQUIPO' },
  { key: 'latitud',  label: 'LATITUD' },
  { key: 'longitud', label: 'LONGITUD' },
  {
    key: 'estado',
    label: 'ESTADO',
    render: (value) => {
      const estado = value as BañoRow['estado']
      return (
        <Badge variant={ESTADO_VARIANT[estado]} size="sm">
          {estado}
        </Badge>
      )
    },
  },
  { key: 'ruta', label: 'RUTA' },
]

// ── Página ────────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 13
const TOTAL_ITEMS = 25
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ROWS_PER_PAGE)

export default function InventoryStatusPage() {
  const [currentPage, setCurrentPage]   = useState(1)
  const [selectedIds, setSelectedIds]   = useState<(string | number)[]>([])
  const [expandedId, setExpandedId]     = useState<string | number | null>(null)

  const handleView = (row: BañoRow) => {
    setExpandedId(prev => (prev === row.id ? null : row.id))
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ALL_STYLES }} />

      <Layout
        sidebarItems={navItems}
        activeId="inv-status"
        sidebarLogo={
          <img src="/Logotipo Squadness.png" width={126} height={32} alt="Squadness" />
        }
        sidebarLogoCollapsed={
          <img src="/Logo Collapsed.png" width={32} height={32} alt="Squadness" />
        }
        user={{ name: 'Julia Doe', role: 'Coordinador General' }}
        onItemClick={(item) => console.log('navegar a', item.href)}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <PageHeader
          title="Listado de baños portátiles"
          actions={
            <Button variant="primary" startIcon={<AddIcon />}>
              Agregar
            </Button>
          }
        />

        <PageBody>
          {/* ── Barra de filtros ──────────────────────────────────────────── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
            gap: 8,
          }}>
            {/* Izquierda: fecha + filtro + conteo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DateFilterDropdown placeholder="Últimos 30 días" />

              <Button variant="outline" size="sm" startIcon={<FilterIcon />}>
                Agregar filtro
              </Button>

              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                paddingLeft: 8,
                fontSize: 12,
                color: 'var(--text-subtlest, #62748e)',
              }}>
                <RowsIcon />
                {TOTAL_ITEMS} resultados
              </span>
            </div>

            {/* Derecha: exportar */}
            <Button variant="outline" size="sm" startIcon={<DownloadIcon />}>
              Exportar
            </Button>
          </div>

          {/* ── Tabla ────────────────────────────────────────────────────── */}
          <Table<BañoRow>
            columns={columns}
            data={tableData}
            rowKey="id"
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onEdit={(row) => console.log('editar', row.id)}
            onView={handleView}
            expandedId={expandedId}
            renderExpanded={(row) => (
              <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-subtle)' }}>
                <strong>Detalle — Chapilla {row.chapilla}</strong>
                <p style={{ marginTop: 4 }}>
                  Clave: {row.clave} · Lat: {row.latitud} · Lng: {row.longitud} · Ruta: {row.ruta}
                </p>
              </div>
            )}
          />

          {/* ── Footer: conteo + paginación ──────────────────────────────── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            padding: '0 4px',
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-subtlest, #62748e)' }}>
              Mostrando {tableData.length} de {TOTAL_ITEMS}
            </span>

            <Pagination
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              totalItems={TOTAL_ITEMS}
              onPageChange={setCurrentPage}
              showPageNumbers
              rowsPerPage={ROWS_PER_PAGE}
            />
          </div>
        </PageBody>
      </Layout>
    </>
  )
}
