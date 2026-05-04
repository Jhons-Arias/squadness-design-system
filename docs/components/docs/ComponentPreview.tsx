'use client'

import { useState } from 'react'
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
}

export function ComponentPreview({
  children,
  code,
  styles,
  minHeight = 160,
  lang = 'jsx',
  overflowVisible,
}: ComponentPreviewProps) {
  const tabs = styles
    ? (['preview', 'code', 'styles'] as const)
    : (['preview', 'code'] as const)

  const [tab, setTab] = useState<'preview' | 'code' | 'styles'>('preview')
  const [copied, setCopied] = useState(false)

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
            onClick={() => setTab(t)}
            className={`docs-preview-tab${tab === t ? ' active' : ''}`}
          >
            {TAB_LABEL[t]}
          </button>
        ))}

        {/* Copy button — only in code/styles tabs */}
        {(tab === 'code' || tab === 'styles') && (
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
      ) : tab === 'styles' ? (
        <LightCodeBlock code={styles!} lang="css" embedded />
      ) : (
        <LightCodeBlock code={code} lang={lang} embedded />
      )}
    </div>
  )
}
