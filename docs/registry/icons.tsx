'use client'

import { useState, useMemo } from 'react'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'
import { ICON_SVGS } from '@/lib/icon-svgs'

const TOC: TocItem[] = [
  { id: 'personas',     label: 'Personas',         level: 1 },
  { id: 'acciones',     label: 'Acciones',          level: 1 },
  { id: 'navegacion',   label: 'Navegación',        level: 1 },
  { id: 'estado',       label: 'Estado',            level: 1 },
  { id: 'comunicacion', label: 'Comunicación',      level: 1 },
  { id: 'sistema',      label: 'Sistema',           level: 1 },
  { id: 'ui',           label: 'UI / Controles',    level: 1 },
  { id: 'archivos',     label: 'Archivos & Datos',  level: 1 },
  { id: 'tiempo',       label: 'Tiempo',            level: 1 },
  { id: 'comercio',     label: 'Comercio',          level: 1 },
  { id: 'dominio',      label: 'Dominio',           level: 1 },
]

// ── Icon catalog (flat — each variant is its own entry) ───────────────────────

interface IconEntry {
  name: string   // display name & clipboard value
  file: string   // key into ICON_SVGS
  category: string
}

const ICONS: IconEntry[] = [
  // ── Personas ──────────────────────────────────────────────────────────────
  { name: 'person_fill',           file: 'person_fill',           category: 'personas' },
  { name: 'person_outline',        file: 'person_outline',        category: 'personas' },
  { name: 'people_fill',           file: 'people_fill',           category: 'personas' },
  { name: 'people_outline',        file: 'people_outline',        category: 'personas' },
  { name: 'account_circle_fill',   file: 'account_circle_fill',   category: 'personas' },
  { name: 'account_circle_outline',file: 'account_circle_outline',category: 'personas' },
  { name: 'manage_accounts',       file: 'manage_accounts',       category: 'personas' },
  { name: 'badge',                 file: 'badge',                 category: 'personas' },
  { name: 'contacts_product',      file: 'contacts_product',      category: 'personas' },

  // ── Acciones ──────────────────────────────────────────────────────────────
  { name: 'add',                   file: 'add',                   category: 'acciones' },
  { name: 'close',                 file: 'close',                 category: 'acciones' },
  { name: 'delete_fill',           file: 'delete_fill',           category: 'acciones' },
  { name: 'delete_outline',        file: 'delete_outline',        category: 'acciones' },
  { name: 'edit_fill',             file: 'edit_fill',             category: 'acciones' },
  { name: 'edit_outline',          file: 'edit_outline',          category: 'acciones' },
  { name: 'visibility_fill',       file: 'visibility_fill',       category: 'acciones' },
  { name: 'visibility_outline',    file: 'visibility_outline',    category: 'acciones' },
  { name: 'search',                file: 'search',                category: 'acciones' },
  { name: 'download',              file: 'download',              category: 'acciones' },
  { name: 'upload',                file: 'upload',                category: 'acciones' },
  { name: 'cloud_upload',          file: 'cloud_upload',          category: 'acciones' },
  { name: 'save',                  file: 'save',                  category: 'acciones' },
  { name: 'share',                 file: 'share',                 category: 'acciones' },
  { name: 'print',                 file: 'print',                 category: 'acciones' },
  { name: 'open_in_new',           file: 'open_in_new',           category: 'acciones' },
  { name: 'link',                  file: 'link',                  category: 'acciones' },
  { name: 'content_copy',          file: 'content_copy',          category: 'acciones' },
  { name: 'content_paste',         file: 'content_paste',         category: 'acciones' },
  { name: 'undo',                  file: 'undo',                  category: 'acciones' },
  { name: 'redo',                  file: 'redo',                  category: 'acciones' },
  { name: 'refresh',               file: 'refresh',               category: 'acciones' },
  { name: 'remove',                file: 'remove',                category: 'acciones' },
  { name: 'filter_alt',            file: 'filter_alt',            category: 'acciones' },

  // ── Navegación ────────────────────────────────────────────────────────────
  { name: 'arrow_back',            file: 'arrow_back',            category: 'navegacion' },
  { name: 'arrow_forward',         file: 'arrow_forward',         category: 'navegacion' },
  { name: 'arrow_upward',          file: 'arrow_upward',          category: 'navegacion' },
  { name: 'arrow_downward',        file: 'arrow_downward',        category: 'navegacion' },
  { name: 'arrow_outward',         file: 'arrow_outward',         category: 'navegacion' },
  { name: 'chevron_left',          file: 'chevron_left',          category: 'navegacion' },
  { name: 'chevron_right',         file: 'chevron_right',         category: 'navegacion' },
  { name: 'keyboard_arrow_up',     file: 'keyboard_arrow_up',     category: 'navegacion' },
  { name: 'keyboard_arrow_down',   file: 'keyboard_arrow_down',   category: 'navegacion' },
  { name: 'expand_more',           file: 'expand_more',           category: 'navegacion' },
  { name: 'expand_less',           file: 'expand_less',           category: 'navegacion' },
  { name: 'first_page',            file: 'first_page',            category: 'navegacion' },
  { name: 'last_page',             file: 'last_page',             category: 'navegacion' },
  { name: 'swap_vert',             file: 'swap_vert',             category: 'navegacion' },
  { name: 'swap_horiz',            file: 'swap_horiz',            category: 'navegacion' },

  // ── Estado ────────────────────────────────────────────────────────────────
  { name: 'check',                 file: 'check',                 category: 'estado' },
  { name: 'check_circle_fill',     file: 'check_circle_fill',     category: 'estado' },
  { name: 'check_circle_outline',  file: 'check_circle_outline',  category: 'estado' },
  { name: 'info_fill',             file: 'info_fill',             category: 'estado' },
  { name: 'info_outline',          file: 'info_outline',          category: 'estado' },
  { name: 'help_fill',             file: 'help_fill',             category: 'estado' },
  { name: 'help_outline',          file: 'help_outline',          category: 'estado' },
  { name: 'warning_fill',          file: 'warning_fill',          category: 'estado' },
  { name: 'warning_outline',       file: 'warning_outline',       category: 'estado' },
  { name: 'error_fill',            file: 'error_fill',            category: 'estado' },
  { name: 'error_outline',         file: 'error_outline',         category: 'estado' },
  { name: 'dangerous',             file: 'dangerous',             category: 'estado' },
  { name: 'star_fill',             file: 'star_fill',             category: 'estado' },
  { name: 'star_outline',          file: 'star_outline',          category: 'estado' },
  { name: 'favorite_fill',         file: 'favorite_fill',         category: 'estado' },
  { name: 'favorite_outline',      file: 'favorite_outline',      category: 'estado' },
  { name: 'thumb_up_fill',         file: 'thumb_up_fill',         category: 'estado' },
  { name: 'thumb_up_outline',      file: 'thumb_up_outline',      category: 'estado' },
  { name: 'bookmark_fill',         file: 'bookmark_fill',         category: 'estado' },
  { name: 'bookmark_outline',      file: 'bookmark_outline',      category: 'estado' },
  { name: 'notifications_fill',    file: 'notifications_fill',    category: 'estado' },
  { name: 'notifications_outline', file: 'notifications_outline', category: 'estado' },
  { name: 'verified_fill',         file: 'verified_fill',         category: 'estado' },
  { name: 'verified_outline',      file: 'verified_outline',      category: 'estado' },
  { name: 'trending_up',           file: 'trending_up',           category: 'estado' },
  { name: 'trending_down',         file: 'trending_down',         category: 'estado' },
  { name: 'fiber_manual_record',   file: 'fiber_manual_record',   category: 'estado' },

  // ── Comunicación ──────────────────────────────────────────────────────────
  { name: 'email_fill',            file: 'email_fill',            category: 'comunicacion' },
  { name: 'email_outline',         file: 'email_outline',         category: 'comunicacion' },
  { name: 'phone',                 file: 'phone',                 category: 'comunicacion' },
  { name: 'chat_fill',             file: 'chat_fill',             category: 'comunicacion' },
  { name: 'chat_outline',          file: 'chat_outline',          category: 'comunicacion' },
  { name: 'send_fill',             file: 'send_fill',             category: 'comunicacion' },
  { name: 'send_outline',          file: 'send_outline',          category: 'comunicacion' },
  { name: 'mark_email_read',       file: 'mark_email_read',       category: 'comunicacion' },

  // ── Sistema ───────────────────────────────────────────────────────────────
  { name: 'settings_fill',         file: 'settings_fill',         category: 'sistema' },
  { name: 'settings_outline',      file: 'settings_outline',      category: 'sistema' },
  { name: 'lock_fill',             file: 'lock_fill',             category: 'sistema' },
  { name: 'lock_outline',          file: 'lock_outline',          category: 'sistema' },
  { name: 'lock_open',             file: 'lock_open',             category: 'sistema' },
  { name: 'key',                   file: 'key',                   category: 'sistema' },
  { name: 'shield_fill',           file: 'shield_fill',           category: 'sistema' },
  { name: 'shield_outline',        file: 'shield_outline',        category: 'sistema' },
  { name: 'admin_panel_settings',  file: 'admin_panel_settings',  category: 'sistema' },

  // ── UI / Controles ────────────────────────────────────────────────────────
  { name: 'menu',                  file: 'menu',                  category: 'ui' },
  { name: 'more_vert',             file: 'more_vert',             category: 'ui' },
  { name: 'more_horiz',            file: 'more_horiz',            category: 'ui' },
  { name: 'tune',                  file: 'tune',                  category: 'ui' },
  { name: 'drag_indicator',        file: 'drag_indicator',        category: 'ui' },
  { name: 'grid_on',               file: 'grid_on',               category: 'ui' },
  { name: 'table_rows_narrow',     file: 'table_rows_narrow',     category: 'ui' },
  { name: 'gallery_thumbnail',     file: 'gallery_thumbnail',     category: 'ui' },
  { name: 'dock_to_right',         file: 'dock_to_right',         category: 'ui' },

  // ── Archivos & Datos ──────────────────────────────────────────────────────
  { name: 'folder_fill',           file: 'folder_fill',           category: 'archivos' },
  { name: 'folder_outline',        file: 'folder_outline',        category: 'archivos' },
  { name: 'folder_open',           file: 'folder_open',           category: 'archivos' },
  { name: 'create_new_folder',     file: 'create_new_folder',     category: 'archivos' },
  { name: 'description',           file: 'description',           category: 'archivos' },
  { name: 'article',               file: 'article',               category: 'archivos' },
  { name: 'attach_file',           file: 'attach_file',           category: 'archivos' },
  { name: 'docs',                  file: 'docs',                  category: 'archivos' },
  { name: 'image_fill',            file: 'image_fill',            category: 'archivos' },
  { name: 'image_outline',         file: 'image_outline',         category: 'archivos' },
  { name: 'analytics',             file: 'analytics',             category: 'archivos' },
  { name: 'bar_chart',             file: 'bar_chart',             category: 'archivos' },
  { name: 'pie_chart',             file: 'pie_chart',             category: 'archivos' },
  { name: 'data_usage',            file: 'data_usage',            category: 'archivos' },

  // ── Tiempo ────────────────────────────────────────────────────────────────
  { name: 'calendar_today',        file: 'calendar_today',        category: 'tiempo' },
  { name: 'date_range',            file: 'date_range',            category: 'tiempo' },
  { name: 'schedule',              file: 'schedule',              category: 'tiempo' },
  { name: 'history',               file: 'history',               category: 'tiempo' },
  { name: 'timer',                 file: 'timer',                 category: 'tiempo' },

  // ── Comercio ──────────────────────────────────────────────────────────────
  { name: 'shopping_cart_fill',    file: 'shopping_cart_fill',    category: 'comercio' },
  { name: 'shopping_cart_outline', file: 'shopping_cart_outline', category: 'comercio' },
  { name: 'store',                 file: 'store',                 category: 'comercio' },
  { name: 'payment',               file: 'payment',               category: 'comercio' },
  { name: 'label',                 file: 'label',                 category: 'comercio' },
  { name: 'inventory_2',           file: 'inventory_2',           category: 'comercio' },

  // ── Dominio ───────────────────────────────────────────────────────────────
  { name: 'home_fill',             file: 'home_fill',             category: 'dominio' },
  { name: 'home_outline',          file: 'home_outline',          category: 'dominio' },
  { name: 'dashboard_2_gear',      file: 'dashboard_2_gear',      category: 'dominio' },
  { name: 'location_on',           file: 'location_on',           category: 'dominio' },
  { name: 'location_chip',         file: 'location_chip',         category: 'dominio' },
  { name: 'map',                   file: 'map',                   category: 'dominio' },
  { name: 'local_shipping',        file: 'local_shipping',        category: 'dominio' },
  { name: 'breaking_news',         file: 'breaking_news',         category: 'dominio' },
  { name: 'curtains_closed',       file: 'curtains_closed',       category: 'dominio' },
  { name: 'universal_local',       file: 'universal_local',       category: 'dominio' },
  { name: 'photo_camera',          file: 'photo_camera',          category: 'dominio' },
  { name: 'play_arrow',            file: 'play_arrow',            category: 'dominio' },
  { name: 'pause',                 file: 'pause',                 category: 'dominio' },
  { name: 'volume_up',             file: 'volume_up',             category: 'dominio' },
]

const CATEGORY_LABELS: Record<string, string> = {
  personas:     'Personas',
  acciones:     'Acciones',
  navegacion:   'Navegación',
  estado:       'Estado',
  comunicacion: 'Comunicación',
  sistema:      'Sistema',
  ui:           'UI / Controles',
  archivos:     'Archivos & Datos',
  tiempo:       'Tiempo',
  comercio:     'Comercio',
  dominio:      'Dominio',
}

const CATEGORIES = Object.keys(CATEGORY_LABELS)

// ── Icon item ─────────────────────────────────────────────────────────────────

function IconItem({ icon }: { icon: IconEntry }) {
  const [copied, setCopied] = useState(false)
  const svgContent = ICON_SVGS[icon.file] ?? ''

  const handleCopy = () => {
    navigator.clipboard.writeText(icon.name).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? '¡Copiado!' : `Copiar "${icon.name}"`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '10px 4px 8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 6,
        transition: 'background 100ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(5,21,36,0.04)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
    >
      <div
        style={{ color: copied ? '#005fdb' : '#314158', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <span style={{
        fontSize: 10,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        color: copied ? '#005fdb' : '#62748e',
        textAlign: 'center',
        wordBreak: 'break-all',
        lineHeight: 1.35,
        width: '100%',
      }}>
        {copied ? '¡Copiado!' : icon.name}
      </span>
    </button>
  )
}

// ── IconsPage ─────────────────────────────────────────────────────────────────

export function IconsPage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return null
    const q = search.toLowerCase()
    return ICONS.filter(i => i.name.toLowerCase().includes(q))
  }, [search])

  const grouped = useMemo(() => {
    const map: Record<string, IconEntry[]> = {}
    for (const icon of ICONS) {
      if (!map[icon.category]) map[icon.category] = []
      map[icon.category].push(icon)
    }
    return map
  }, [])

  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 2,
  }

  return (
    <div className="docs-content">
      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="docs-main">

        {/* Header row: title left, search right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#020618', margin: 0, fontFamily: "'Inter', sans-serif" }}>
            Icons
          </h1>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            height: 34, padding: '0 10px',
            background: '#ffffff',
            border: '1px solid rgba(5,21,36,0.1)',
            borderRadius: 8,
            minWidth: 200, maxWidth: 260,
            flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: '#62748e' }}>
              <path d="M20.5 20.5L15 15M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar ícono..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: '0.8125rem', fontFamily: "'Inter', sans-serif", color: '#020618',
                minWidth: 0,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#62748e', padding: 0, lineHeight: 0, flexShrink: 0 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3.2 9.33 2.67 8.8 5.47 6 2.67 3.2l.53-.53L6 5.47l2.8-2.8.53.53L6.53 6l2.8 2.8-.53.53L6 6.53z" fill="currentColor"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search results — flat grid */}
        {filtered !== null ? (
          filtered.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: '#62748e', fontFamily: "'Inter', sans-serif" }}>
              Sin resultados para "{search}".
            </p>
          ) : (
            <div style={grid}>
              {filtered.map(icon => <IconItem key={icon.name} icon={icon} />)}
            </div>
          )
        ) : (
          /* Grouped by category */
          CATEGORIES.filter(cat => grouped[cat]?.length).map(cat => (
            <div key={cat} id={cat} style={{ marginBottom: 32 }}>
              <h2 style={{
                fontSize: '0.875rem', fontWeight: 600, color: '#020618',
                margin: '0 0 8px', fontFamily: "'Inter', sans-serif",
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {CATEGORY_LABELS[cat]}
                <span style={{ fontSize: 11, fontWeight: 400, color: '#62748e' }}>
                  {grouped[cat].length}
                </span>
              </h2>
              <div style={grid}>
                {grouped[cat].map(icon => <IconItem key={icon.name} icon={icon} />)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* On this page */}
      <OnThisPage items={TOC} />
    </div>
  )
}
