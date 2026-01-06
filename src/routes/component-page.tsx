import { useState, useEffect } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../components/mdx-components'

interface ComponentPageProps {
  loader: () => Promise<{ default: React.ComponentType }>
  Component?: React.ComponentType  // Pre-loaded component for SSR
}

export function ComponentPage({ loader, Component: PreloadedComponent }: ComponentPageProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(PreloadedComponent || null)

  useEffect(() => {
    // Only load if not pre-loaded (for client-side navigation)
    if (!PreloadedComponent) {
      loader().then((mod) => setComponent(() => mod.default))
    }
  }, [loader, PreloadedComponent])

  if (!Component) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <MDXProvider components={mdxComponents}>
      <div className="mdx-content">
        <Component />
      </div>
    </MDXProvider>
  )
}