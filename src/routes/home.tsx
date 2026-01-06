import { Link } from '@tanstack/react-router'
import { Button } from '@registry/learnui/button'

export function HomePage() {
  return (
    <div className="mx-auto relative px-6 md:px-8">
      {/* Hero */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Build interactive learning experiences
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Open-source components for creating educational content like brilliant.org.
          Copy-paste components distributed via shadcn CLI.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Link to="/docs">
            <Button>Get Started</Button>
          </Link>
          <Link to="/docs/components/button">
            <Button variant="outline">Components</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-[980px] gap-6 py-8 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold mb-2">LearnUI</h3>
          <p className="text-sm text-muted-foreground">
            shadcn-based UI components with custom variants and themes for learning interfaces.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold mb-2">Diagram</h3>
          <p className="text-sm text-muted-foreground">
            SVG components with animation and physics controls for interactive diagrams.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold mb-2">Hooks</h3>
          <p className="text-sm text-muted-foreground">
            Pre-made hooks for physics simulations, animations, and interactive motions.
          </p>
        </div>
      </section>
    </div>
  )
}