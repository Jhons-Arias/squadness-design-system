'use client'

import { useState } from 'react'

// ─── Token types ──────────────────────────────────────────────────────────────

type TokenType =
  | 'keyword'      // import, from, export, const, return, function
  | 'component'    // PascalCase identifiers (<Button>, Button)
  | 'prop'         // JSX attribute names
  | 'string'       // "...", '...', `...`
  | 'comment'      // // ..., /* ... */
  | 'tag'          // < > / in JSX
  | 'selector'     // CSS: .class, #id, :root, @rule, element
  | 'property'     // CSS: property names including --custom-props
  | 'value'        // CSS: values
  | 'punctuation'  // : ; { } ( ) , =
  | 'plain'

interface Token { type: TokenType; text: string }

// ─── Tokenizers ───────────────────────────────────────────────────────────────

function tokenizeJSX(line: string): Token[] {
  const tokens: Token[] = []
  let rest = line

  const push = (type: TokenType, text: string) => tokens.push({ type, text })

  const JS_KEYWORDS = /^(import|export|from|const|let|var|function|return|default|type|interface|as|if|else|true|false|null|undefined|async|await|=>)\b/
  const COMPONENT   = /^([A-Z][a-zA-Z0-9]*)/
  const STRING      = /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/
  const COMMENT     = /^(\/\/.*|\/\*[\s\S]*?\*\/)/
  const JSX_TAG     = /^([<>/])/
  const PROP_NAME   = /^([a-z][a-zA-Z0-9]*)(?==)/
  const PUNCT       = /^([={}()\[\]:;,.])/
  const WHITESPACE  = /^(\s+)/
  const WORD        = /^([a-zA-Z_$][a-zA-Z0-9_$-]*)/
  const OTHER       = /^([^\s])/

  while (rest.length > 0) {
    let m: RegExpMatchArray | null

    if ((m = rest.match(COMMENT)))      { push('comment', m[1]);   rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(STRING)))       { push('string', m[1]);    rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(WHITESPACE)))   { push('plain', m[1]);     rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(JS_KEYWORDS)))  { push('keyword', m[1]);   rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(COMPONENT)))    { push('component', m[1]); rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(JSX_TAG)))      { push('tag', m[1]);       rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(PROP_NAME)))    { push('prop', m[1]);      rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(PUNCT)))        { push('punctuation', m[1]); rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(WORD)))         { push('plain', m[1]);     rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(OTHER)))        { push('plain', m[1]);     rest = rest.slice(m[1].length); continue }
    break
  }

  return tokens
}

function tokenizeCSS(line: string): Token[] {
  const tokens: Token[] = []
  let rest = line

  const push = (type: TokenType, text: string) => tokens.push({ type, text })

  const COMMENT   = /^(\/\*[\s\S]*?\*\/|\/\/.*)/
  const AT_RULE   = /^(@[\w-]+)/
  const SELECTOR  = /^(:[:\w-]+|&[\w\s>~+[\]="'.-]*|[.#][\w-]+(?:\s*[,>~+]\s*[.#]?[\w-]*)*)/
  const CSS_PROP  = /^(--[\w-]+|[\w-]+)(?=\s*:)/
  const VALUE_NUM = /^(-?[\d.]+(?:px|rem|em|%|vh|vw|deg|s|ms)?)\b/
  const VALUE_HEX = /^(#[0-9a-fA-F]{3,8})\b/
  const VALUE_FN  = /^([\w-]+)\(/
  const STRING    = /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/
  const PUNCT     = /^([{}();:,])/
  const WHITESPACE = /^(\s+)/
  const WORD      = /^([\w-]+)/
  const OTHER     = /^([^\s])/

  while (rest.length > 0) {
    let m: RegExpMatchArray | null

    if ((m = rest.match(COMMENT)))   { push('comment', m[1]);    rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(WHITESPACE))){ push('plain', m[1]);      rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(AT_RULE)))   { push('selector', m[1]);   rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(CSS_PROP)))  { push('property', m[1]);   rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(VALUE_HEX))) { push('value', m[1]);      rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(VALUE_NUM))) { push('value', m[1]);      rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(VALUE_FN)))  { push('value', m[1]); push('punctuation', '('); rest = rest.slice(m[0].length); continue }
    if ((m = rest.match(SELECTOR)))  { push('selector', m[1]);   rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(STRING)))    { push('string', m[1]);     rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(PUNCT)))     { push('punctuation', m[1]); rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(WORD)))      { push('plain', m[1]);      rest = rest.slice(m[1].length); continue }
    if ((m = rest.match(OTHER)))     { push('plain', m[1]);      rest = rest.slice(m[1].length); continue }
    break
  }

  return tokens
}

// ─── Token colors ─────────────────────────────────────────────────────────────

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:     '#005fdb',   // brand blue
  component:   '#0047a3',   // brand hover (darker blue)
  prop:        '#62748e',   // muted
  string:      '#3c6300',   // success text (green)
  comment:     '#94a3b8',   // slate-400
  tag:         '#62748e',   // muted
  selector:    '#005fdb',   // brand blue
  property:    '#314158',   // subtle (default text color for props)
  value:       '#92400e',   // amber-800 (warm orange)
  punctuation: '#62748e',   // muted
  plain:       '#020618',   // text-primary
}

// ─── Line renderer ────────────────────────────────────────────────────────────

function renderLine(line: string, lang: 'jsx' | 'css' | 'bash' | 'plain'): Token[] {
  if (lang === 'jsx')  return tokenizeJSX(line)
  if (lang === 'css')  return tokenizeCSS(line)
  if (lang === 'bash') {
    // bash: command in blue, flags in muted, strings in green
    return [{ type: 'plain', text: line }]
  }
  return [{ type: 'plain', text: line }]
}

// ─── Component ────────────────────────────────────────────────────────────────

export type CodeLang = 'jsx' | 'css' | 'bash' | 'plain'

interface LightCodeBlockProps {
  code: string
  lang?: CodeLang
  /** Optional filename label shown in the header bar */
  filename?: string
  /**
   * When true: no outer border/radius — designed to sit flush inside
   * a ComponentPreview card which already provides the container chrome.
   */
  embedded?: boolean
}

export function LightCodeBlock({
  code,
  lang = 'plain',
  filename,
  embedded = false,
}: LightCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = code.split('\n')

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: embedded ? 'none' : '1px solid var(--color-border-subtle)',
      borderRadius: embedded ? 0 : 12,
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: '22px',
    }}>
      {/* Header bar — only shown when NOT embedded (standalone usage) */}
      {!embedded && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid var(--color-border-subtle)',
          background: 'var(--color-surface-white)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Traffic-light dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['#f87171', '#fb923c', '#4ade80'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            {filename && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--color-text-muted)',
                marginLeft: 4,
              }}>{filename}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            style={{
              padding: '2px 10px',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.1s, color 0.1s',
            }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      )}

      {/* Code area */}
      <div style={{ overflowX: 'auto', padding: '16px 0' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 'max-content' }}>
          <tbody>
            {lines.map((line, i) => {
              const tokens = renderLine(line, lang)
              return (
                <tr key={i} style={{ lineHeight: '22px' }}>
                  {/* Line number */}
                  <td style={{
                    textAlign: 'right',
                    padding: '0 16px 0 20px',
                    userSelect: 'none',
                    color: 'var(--color-border-subtle)',
                    fontSize: 12,
                    width: 1,
                    whiteSpace: 'nowrap',
                    verticalAlign: 'top',
                  }}>
                    {i + 1}
                  </td>
                  {/* Code content */}
                  <td style={{ padding: '0 20px 0 0', whiteSpace: 'pre', verticalAlign: 'top' }}>
                    {tokens.map((tok, j) => (
                      <span key={j} style={{ color: TOKEN_COLORS[tok.type] }}>{tok.text}</span>
                    ))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
