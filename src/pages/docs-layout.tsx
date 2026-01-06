import { Link, Outlet, useRouterState } from '@tanstack/react-router'

interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

const sidebarNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Button', href: '/docs/components/button' },
    ],
  },
  {
    title: 'Diagram',
    items: [
      { title: 'Circle', href: '/docs/diagram/circle', disabled: true },
      { title: 'Rectangle', href: '/docs/diagram/rectangle', disabled: true },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { title: 'usePhysics', href: '/docs/hooks/use-physics', disabled: true },
      { title: 'useSpring', href: '/docs/hooks/use-spring', disabled: true },
    ],
  },
]

export function DocsLayout() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <div className="px-6 mx-auto flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      {/* Sidebar */}
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 border-r md:sticky md:block lg:w-[260px]">
        <div className="h-full py-8 pr-6 lg:pr-8 overflow-y-auto">
          <nav className="grid items-start gap-2">
            {sidebarNav.map((section) => (
              <div key={section.title} className="pb-6">
                <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold">
                  {section.title}
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm gap-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      disabled={item.disabled}
                      className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors ${
                        item.disabled
                          ? 'cursor-not-allowed opacity-60'
                          : currentPath === item.href
                            ? 'font-medium text-foreground bg-accent'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {item.title}
                      {item.disabled && (
                        <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative py-8 lg:py-10">
        <div className="mx-auto w-full min-w-0 max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}