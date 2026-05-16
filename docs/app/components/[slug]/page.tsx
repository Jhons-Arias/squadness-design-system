import { registry } from '@/registry'
import { getAllNavItems } from '@/lib/nav'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  // Include ALL nav slugs so output:export never hits a missing-param error.
  // Registry-only slugs are also kept as a fallback.
  const navSlugs = getAllNavItems()
    .filter((item) => item.slug.startsWith('components/'))
    .map((item) => ({ slug: item.slug.replace('components/', '') }))

  const registrySlugs = Object.keys(registry).map((slug) => ({ slug }))

  // Deduplicate
  const seen = new Set<string>()
  return [...navSlugs, ...registrySlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false
    seen.add(slug)
    return true
  })
}

export async function generateMetadata({ params }: PageProps) {
  const page = registry[params.slug]
  if (!page) return {}
  return { title: page.title }
}

function ComingSoon({ slug }: { slug: string }) {
  const label = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 12,
      fontFamily: "'Inter', sans-serif",
    }}>
      <p style={{ fontSize: 12, color: '#62748e', margin: 0 }}>Components</p>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#020618', margin: 0 }}>{label}</h1>
      <p style={{ fontSize: 16, color: '#314158', margin: 0 }}>Próximamente</p>
    </div>
  )
}

export default function ComponentPage({ params }: PageProps) {
  const page = registry[params.slug]

  if (!page) return <ComingSoon slug={params.slug} />

  const { Component } = page
  return <Component />
}
