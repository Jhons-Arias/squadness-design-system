import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Sidebar />
      <div className="docs-main-scroll">
        {children}
      </div>
    </>
  )
}
