import { gettingStartedRegistry } from '@/registry/getting-started'
import { getAllNavItems } from '@/lib/nav'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllNavItems()
    .filter(item => item.slug.startsWith('getting-started/'))
    .map(item => ({ slug: item.slug.replace('getting-started/', '') }))
}

export async function generateMetadata({ params }: PageProps) {
  const page = gettingStartedRegistry[params.slug]
  if (!page) return {}
  return { title: `${page.title} — Squadness` }
}

function ComingSoon({ slug }: { slug: string }) {
  const label = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', gap: 12,
      fontFamily: "'Inter', sans-serif",
    }}>
      <p style={{ fontSize: 12, color: '#62748e', margin: 0 }}>Getting Started</p>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#020618', margin: 0 }}>{label}</h1>
      <p style={{ fontSize: 18, color: '#314158', margin: 0 }}>Próximamente</p>
    </div>
  )
}

export default function GettingStartedPage({ params }: PageProps) {
  const page = gettingStartedRegistry[params.slug]
  if (!page) return <ComingSoon slug={params.slug} />
  const { Component } = page
  return <Component />
}
