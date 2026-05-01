import { notFound } from 'next/navigation'
import { registry } from '@/registry'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const page = registry[params.slug]
  if (!page) return {}
  return { title: page.title }
}

export default function ComponentPage({ params }: PageProps) {
  const page = registry[params.slug]
  if (!page) notFound()

  const { Component } = page
  return <Component />
}
