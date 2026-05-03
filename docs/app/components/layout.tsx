import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed top bar — full viewport width */}
      <TopBar />

      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Scrollable main area — offset from fixed sidebar + topbar */}
      <div className="docs-main-scroll">
        {children}
      </div>
    </>
  )
}
