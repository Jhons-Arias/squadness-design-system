// Shared token table used in every component docs page

interface TokenRow {
  token: string        // Figma variable name e.g. "Button/Primary/Surface Default"
  property: string     // CSS property e.g. "background-color"
  value: string        // hex or rgba e.g. "#005fdb"
  primitive: string    // primitive reference e.g. "blue/700"
  description: string  // brief note e.g. "Default state" or "Hover state"
}

interface TokenTableProps {
  tokens: TokenRow[]
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            {['Token', 'Propiedad CSS', 'Valor', 'Primitivo', 'Descripción'].map(h => (
              <th key={h} style={{
                padding: '6px 12px', textAlign: 'left',
                fontSize: 11, fontWeight: 600,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
              <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--color-brand)', background: 'rgba(0,95,219,0.06)',
                  padding: '2px 6px', borderRadius: 3, whiteSpace: 'nowrap',
                }}>{row.token}</code>
              </td>
              <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-subtle)' }}>
                  {row.property}
                </code>
              </td>
              <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                    background: row.value,
                    border: '1px solid var(--color-border-subtle)',
                  }} />
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                    {row.value}
                  </code>
                </div>
              </td>
              <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                  {row.primitive}
                </span>
              </td>
              <td style={{ padding: '10px 12px', verticalAlign: 'top', color: 'var(--color-text-subtle)', lineHeight: 1.5 }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
