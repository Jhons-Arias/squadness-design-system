'use client'

import { useState } from 'react'
import { TopBar, type TopBarProps } from '@squadness/ui/topbar'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DoDont } from '@/components/docs/DoDont'
import { ReferenceLinks } from '@/components/docs/ReferenceLinks'
import { OnThisPage, type TocItem } from '@/components/layout/OnThisPage'

const TOC: TocItem[] = [
  { id: 'examples',           label: 'Ejemplos',           level: 1 },
  { id: 'appearance',         label: 'Apariencia',         level: 1 },
  { id: 'default',            label: 'Default',            level: 2 },
  { id: 'with-theme',         label: 'With theme toggle',  level: 2 },
  { id: 'no-user',            label: 'Without user',       level: 2 },
  { id: 'references',         label: 'Referencias',        level: 1 },
  { id: 'content-guidelines', label: 'Guías de contenido', level: 1 },
]

// ── Shared user data ──────────────────────────────────────────────────────────
const DEMO_USER = {
  name: 'Julia Doe',
  role: 'Coordinador General',
}

// ── Code snippets ─────────────────────────────────────────────────────────────
const examplesCode = `import { TopBar } from '@squadness/ui/topbar'
import { TopBarStyles } from '@squadness/ui/topbar.styles'

// 1. Inject CSS once in your root layout:
// <style dangerouslySetInnerHTML={{ __html: TopBarStyles }} />

// 2. Use the component:
const [theme, setTheme] = useState<'light' | 'dark'>('light')
const [collapsed, setCollapsed] = useState(false)

<TopBar
  user={{ name: 'Julia Doe', role: 'Coordinador General' }}
  theme={theme}
  onThemeChange={setTheme}
  onToggleSidebar={() => setCollapsed(c => !c)}
  onNotificationsClick={() => console.log('notifications')}
  onUserClick={() => console.log('user menu')}
/>`

const withThemeCode = `{/* Light mode */}
<TopBar
  user={{ name: 'Julia Doe', role: 'Coordinador General' }}
  theme="light"
  onThemeChange={setTheme}
/>

{/* Dark mode */}
<TopBar
  user={{ name: 'Julia Doe', role: 'Coordinador General' }}
  theme="dark"
  onThemeChange={setTheme}
/>`

const noUserCode = `{/* Without user — useful when auth is loading */}
<TopBar
  theme="light"
  onToggleSidebar={() => setCollapsed(c => !c)}
/>`

const avatarCode = `{/* With avatar image */}
<TopBar
  user={{
    name: 'Julia Doe',
    role: 'Coordinador General',
    avatarSrc: '/avatar.jpg',
  }}
  theme="light"
/>`

// ── Helpers ───────────────────────────────────────────────────────────────────
function Divider() {
  return <hr className="docs-divider" />
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="docs-section-title">{children}</h2>
}

function SubTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="docs-subsection-title">{children}</h3>
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="docs-page-desc">{children}</p>
}

// ── TopBar preview wrapper (removes border radius, full width) ────────────────
function TopBarBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid rgba(5,21,36,0.06)',
      borderRadius: 10,
      overflow: 'hidden',
      width: '100%',
    }}>
      {children}
    </div>
  )
}

// ── Interactive example ───────────────────────────────────────────────────────
function ExampleDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <TopBarBox>
      <TopBar
        user={DEMO_USER}
        theme={theme}
        onThemeChange={setTheme}
        onToggleSidebar={() => {}}
        onNotificationsClick={() => {}}
        onUserClick={() => {}}
      />
    </TopBarBox>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function TopBarPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div className="docs-content">
      <div className="docs-main">

        <p className="docs-breadcrumb">Components</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="docs-page-title">Top Bar</h1>
          <Desc>
            El Top Bar es la barra de navegación superior de la aplicación. Contiene el botón para
            colapsar el sidebar, el toggle de tema claro/oscuro, el acceso a notificaciones y la
            información del usuario activo.
          </Desc>
        </div>

        {/* ── Ejemplos ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionTitle id="examples">Ejemplos</SectionTitle>
          <ComponentPreview code={examplesCode} minHeight={80}>
            <ExampleDemo />
          </ComponentPreview>
        </div>

        <Divider />

        {/* ── Apariencia ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="appearance">Apariencia</SectionTitle>
            <Desc>
              El Top Bar se adapta al estado del sidebar y soporta el toggle de tema,
              notificaciones e información de usuario con avatar o iniciales como fallback.
            </Desc>
          </div>

          {/* Default */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="default">Default</SubTitle>
            <ComponentPreview code={examplesCode} minHeight={80}>
              <TopBarBox>
                <TopBar
                  user={DEMO_USER}
                  theme="light"
                  onToggleSidebar={() => {}}
                  onNotificationsClick={() => {}}
                  onUserClick={() => {}}
                />
              </TopBarBox>
            </ComponentPreview>
          </div>

          {/* With theme toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="with-theme">With theme toggle</SubTitle>
            <Desc>
              El toggle alterna entre modo claro y oscuro. El estado activo lo controla
              el padre mediante la prop <code>theme</code>.
            </Desc>
            <ComponentPreview code={withThemeCode} minHeight={160}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <TopBarBox>
                  <TopBar
                    user={DEMO_USER}
                    theme="light"
                    onThemeChange={setTheme}
                    onToggleSidebar={() => {}}
                  />
                </TopBarBox>
                <TopBarBox>
                  <TopBar
                    user={DEMO_USER}
                    theme="dark"
                    onThemeChange={setTheme}
                    onToggleSidebar={() => {}}
                  />
                </TopBarBox>
              </div>
            </ComponentPreview>
          </div>

          {/* Without user */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SubTitle id="no-user">Without user</SubTitle>
            <Desc>
              Cuando no se pasa la prop <code>user</code>, la sección de usuario queda
              oculta — útil mientras se carga la sesión.
            </Desc>
            <ComponentPreview code={noUserCode} minHeight={80}>
              <TopBarBox>
                <TopBar
                  theme="light"
                  onToggleSidebar={() => {}}
                />
              </TopBarBox>
            </ComponentPreview>
          </div>
        </div>

        <Divider />

        {/* ── Referencias ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="references">Referencias</SectionTitle>
            <Desc>Explora cómo otros sistemas de diseño implementan este componente.</Desc>
          </div>
          <ReferenceLinks
            links={[
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com/docs/components/navigation-menu' },
            ]}
          />
        </div>

        <Divider />

        {/* ── Guías de contenido ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionTitle id="content-guidelines">Guías de contenido</SectionTitle>
            <Desc>Reglas para usar y configurar el Top Bar correctamente en la aplicación.</Desc>
          </div>
          <DoDont
            do={[
              'Muestra siempre el nombre y rol del usuario activo para dar contexto de sesión',
              'Usa el botón de sidebar para que el usuario pueda ganar espacio horizontal cuando lo necesite',
              'Proporciona un avatarSrc cuando el usuario tenga foto de perfil — las iniciales son solo el fallback',
              'Conecta onThemeChange al estado global de tema para que el cambio persista en toda la app',
            ]}
            dont={[
              'Agregar acciones de página (guardar, exportar) al Top Bar — esas pertenecen al área de contenido',
              'Ocultar el Top Bar en vistas internas — siempre debe ser visible para mantener la navegación global',
              'Usar el Top Bar como único punto de acceso a configuraciones críticas — complementa con un menú lateral',
              'Mostrar información sensible (correo, teléfono) directamente en el rol del usuario',
            ]}
            note="El rol que aparece debajo del nombre es solo informativo — no lo uses para mostrar permisos o niveles de acceso. Esa lógica debe vivir en el sistema de autorización de tu app."
          />
        </div>

      </div>

      <OnThisPage items={TOC} />
    </div>
  )
}
