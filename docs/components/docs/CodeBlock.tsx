'use client'

import { useState } from 'react'

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="docs-code-wrap">
      <pre className="docs-code-block">{code}</pre>
      <button className="docs-code-copy" onClick={handleCopy}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
