'use client'

import { useState, useRef, useEffect } from 'react'
import { LightCodeBlock, type CodeLang } from './LightCodeBlock'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  /** Optional CSS source shown in the Styles tab */
  styles?: string
  minHeight?: number
  /** Language for syntax highlighting in the Code tab */
  lang?: CodeLang
  /** Allow absolutely-positioned children (e.g. dropdowns) to overflow the preview box. */
  overflowVisible?: boolean
  /** Pixel height at which code is clipped before expand. Default 200. */
  collapseHeight?: number
}

export function ComponentPreview({
  children,
  code,
  styles,
  minHeight = 160,
  lang = 'jsx',
  overflowVisible,
  collapseHeight = 200,
}: ComponentPreviewProps) {
  type Tab = 'preview' | 'code' | 'styles'
  const tabs: Tab[] = styles ? ['preview', 'code', 'styles'] : ['preview', 'code']

  const [tab, setTab] = useState<Tab>('preview')
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const codeInnerRef = useRef<HTMLDivElement>(null)

  // Detect overflow whenever tab changes
  useEffect(() => {
    setExpanded(false)
    const el = codeInnerRef.current
    if (!el) return
    setOverflows(el.scrollHeight > collapseHeight)
  }, [tab, collapseHeight])

  function handleTabChange(t: Tab) {
    setTab(t)
  }

  async function handleCopy() {
    const text = tab === 'styles' ? styles! : code
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const TAB_LABEL: Record<string, string> = {
    preview: 'Preview',
    code:    'index.jsx',
    styles:  'styles.css',
  }

  const isCodeTab = tab === 'code' || tab === 'styles'

  return (
    <div
      className="docs-preview-wrap"
      style={overflowVisible ? { overflow: 'visible' } : undefined}
    >
      {/* Tab bar */}
      <div className="docs-preview-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`docs-preview-tab${tab === t ? ' active' : ''}`}
          >
            {TAB_LABEL[t]}
          </button>
        ))}

        {/* Copy button — only in code/styles tabs */}
        {isCodeTab && (
          <button
            onClick={handleCopy}
            style={{
              marginLeft: 'auto',
              padding: '2px 10px',
              fontFamily: 'var(--sq-font-body)',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--sq-text-subtlest)',
              background: 'transparent',
              border: '1px solid var(--sq-border-subtle)',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.1s, color 0.1s',
              alignSelf: 'center',
            }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        )}
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className="docs-preview-canvas" style={{ minHeight }}>
          {children}
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Clipping wrapper */}
          <div
            style={{
              maxHeight: expanded ? 'none' : collapseHeight,
              overflow: 'hidden',
              borderRadius: overflows && !expanded ? '0 0 0 0' : undefined,
            }}
          >
            {/* Inner ref to measure real height */}
            <div ref={codeInnerRef}>
              {tab === 'styles' ? (
                <LightCodeBlock code={styles!} lang="css" embedded />
              ) : (
                <LightCodeBlock code={code} lang={lang} embedded />
              )}
            </div>
          </div>

          {/* Fade + Expand button */}
          {overflows && !expanded && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(to bottom, transparent, var(--sq-surface-default, #f8fafc))',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 14,
                pointerEvents: 'none',
              }}
            >
              <button
                onClick={() => setExpanded(true)}
                style={{
                  pointerEvents: 'auto',
                  padding: '5px 16px',
                  fontFamily: 'var(--sq-font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--sq-text-default)',
                  background: 'var(--sq-surface-raised, #ffffff)',
                  border: '1px solid var(--sq-border-subtle)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  transition: 'background 0.1s',
                }}
              >
                Expand code
              </button>
            </div>
          )}

          {/* Collapse button */}
          {overflows && expanded && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0',
                borderTop: '1px solid var(--sq-border-subtle)',
              }}
            >
              <button
                onClick={() => setExpanded(false)}
                style={{
                  padding: '5px 16px',
                  fontFamily: 'var(--sq-font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--sq-text-subtlest)',
                  background: 'transparent',
                  border: '1px solid var(--sq-border-subtle)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
              >
                Collapse code
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
