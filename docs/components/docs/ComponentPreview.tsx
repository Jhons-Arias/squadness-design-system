'use client'

import { useState } from 'react'
import { CodeBlock } from './CodeBlock'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  minHeight?: number
  /** Allow absolutely-positioned children (e.g. dropdowns) to overflow the preview box. */
  overflowVisible?: boolean
}

export function ComponentPreview({ children, code, minHeight = 160, overflowVisible }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')

  return (
    <div className="docs-preview-wrap" style={overflowVisible ? { overflow: 'visible' } : undefined}>
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
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className="docs-preview-canvas" style={{ minHeight }}>
          {children}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  )
}
