/* eslint-disable react-refresh/only-export-components */
import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { RootLayout } from './pages/root'
import { DocsLayout } from './pages/docs-layout'
import { HomePage } from './routes/home'
import { ComponentPage } from '@/routes/component-page'

// Lazy load MDX content
type MDXLoader = () => Promise<{ default: React.ComponentType }>

const Introduction: MDXLoader = () => import('@/content/docs/introduction.mdx')
const Installation: MDXLoader = () => import('@/content/docs/installation.mdx')
const ButtonDocs: MDXLoader = () => import('@/content/components/button/button.mdx')

// Root route
const rootRoute = createRootRoute({
  component: RootLayout,
})

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

// Docs layout route
const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'docs',
  component: DocsLayout,
})

// Docs pages
const introductionRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: '/',
  component: () => <ComponentPage loader={Introduction} />,
})

const installationRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: 'installation',
  component: () => <ComponentPage loader={Installation} />,
})

// Components routes
const componentsRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: 'components',
})

const buttonRoute = createRoute({
  getParentRoute: () => componentsRoute,
  path: 'button',
  component: () => <ComponentPage loader={ButtonDocs} />,
})

// Build the route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  docsRoute.addChildren([
    introductionRoute,
    installationRoute,
    componentsRoute.addChildren([buttonRoute]),
  ]),
])

// Create the router
export const router = createRouter({ routeTree })

// Type declaration for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}