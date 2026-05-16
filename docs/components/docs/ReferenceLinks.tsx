interface ReferenceLink {
  label: string
  href: string
}

export function ReferenceLinks({ links }: { links: ReferenceLink[] }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="docs-ref-link"
        >
          {link.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
          </svg>
        </a>
      ))}
    </div>
  )
}
