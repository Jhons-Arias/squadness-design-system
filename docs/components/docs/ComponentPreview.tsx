'use client'

import { useState } from 'react'
import { LightCodeBlock, type CodeLang } from './LightCodeBlock'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  minHeight?: number
  /** Language for syntax highlighting in the Code tab */
  lang?: CodeLang
  /** Allow absolutely-positioned children (e.g. dropdowns) to overflow the preview box. */
  overflowVisible?: boolean
}

export function ComponentPreview({
  children,
  code,
  minHeight = 160,
  lang = 'jsx',
  overflowVisible,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="docs-preview-wrap"
      style={overflowVisible ? { overflow: 'visible' } : undefined}
    >
      {/* Tab bar */}
      <div className="docs-preview-tabs">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`docs-preview-tab${tab === t ? ' active' : ''}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}

        {/* Copy button — only visible when Code tab is active */}
        {tab === 'code' && (
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
        <LightCodeBlock code={code} lang={lang} embedded />
      )}
    </div>
  )
}
