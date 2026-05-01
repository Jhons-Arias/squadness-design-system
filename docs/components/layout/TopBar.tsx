import Link from 'next/link'
import Image from 'next/image'

export function TopBar() {
  return (
    <header className="docs-topbar">
      <Link href="/components/button" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)' }}>
        <Image
          src="/Logo Squadness.png"
          alt="Squadness"
          width={32}
          height={32}
          style={{ objectFit: 'contain' }}
          priority
        />
        <span className="docs-page-title" style={{ fontSize: 20 }}>Docs</span>
      </Link>
    </header>
  )
}
