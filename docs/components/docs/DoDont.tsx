interface DoDontProps {
  do: string[]
  dont: string[]
  note?: string
}

export function DoDont({ do: doItems, dont: dontItems, note }: DoDontProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div className="docs-do-dont">
        <div className="docs-do">
          <p className="docs-do-label">Do</p>
          <ul>
            {doItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="docs-dont">
          <p className="docs-dont-label">Don&apos;t</p>
          <ul>
            {dontItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      {note && <p className="docs-note">{note}</p>}
    </div>
  )
}
