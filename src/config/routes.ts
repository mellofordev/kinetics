import '../vite-env.d.ts'

export interface RouteMetadata {
  path: string
  title: string
  description: string
  mdxLoader?: () => Promise<{ default: React.ComponentType }>
}

export const routes: RouteMetadata[] = [
  {
    path: '/',
    title: 'Kinetics - Interactive Learning Components',
    description: 'Open-source components for creating educational content like brilliant.org. Copy-paste components distributed via shadcn CLI.',
  },
  {
    path: '/docs',
    title: 'Introduction | Kinetics',
    description: 'Kinetics is an open-source library for building interactive learning experiences with LearnUI, Diagram, and Hooks components.',
    mdxLoader: () => import('@/content/docs/introduction.mdx'),
  },
  {
    path: '/docs/installation',
    title: 'Installation | Kinetics',
    description: 'Learn how to install and set up Kinetics components in your project using the shadcn CLI.',
    mdxLoader: () => import('@/content/docs/installation.mdx'),
  },
  {
    path: '/docs/components/button',
    title: 'Button Component | Kinetics',
    description: 'A button component with multiple variants and sizes for building interactive learning interfaces.',
    mdxLoader: () => import('@/content/components/button/button.mdx'),
  },
]
