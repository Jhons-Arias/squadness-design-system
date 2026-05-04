import { DocsShell } from '@/components/layout/DocsShell'

export default function FoundationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsShell>
      {children}
    </DocsShell>
  )
}
