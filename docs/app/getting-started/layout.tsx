import { DocsShell } from '@/components/layout/DocsShell'

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsShell>
      {children}
    </DocsShell>
  )
}
