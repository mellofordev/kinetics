import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface ComponentProps {
  children?: ReactNode
  className?: string
  href?: string
}

// Custom components for MDX
export const mdxComponents = {
  h1: ({ children }: ComponentProps) => (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: ComponentProps) => (
    <h2 className="scroll-m-20 border-b pb-3 text-2xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: ComponentProps) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: ComponentProps) => (
    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: ComponentProps) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: ComponentProps) => <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
  ol: ({ children }: ComponentProps) => <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
  li: ({ children }: ComponentProps) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }: ComponentProps) => (
    <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-600 dark:border-slate-700 dark:text-slate-400">{children}</blockquote>
  ),
  code: ({ children, className }: ComponentProps) => {
    // Inline code
    if (!className) {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {children}
        </code>
      )
    }
    // Code block
    return (
      <code className={className}>{children}</code>
    )
  },
  pre: ({ children, ...props }: ComponentProps) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg p-4 text-sm border border-border" {...props}>
      {children}
    </pre>
  ),
  a: ({ href, children }: ComponentProps) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
  table: ({ children }: ComponentProps) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: ComponentProps) => (
    <thead className="bg-muted/50">{children}</thead>
  ),
  tr: ({ children }: ComponentProps) => (
    <tr className="border-b transition-colors hover:bg-muted/50">{children}</tr>
  ),
  th: ({ children }: ComponentProps) => (
    <th className="border px-4 py-3 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right">{children}</th>
  ),
  td: ({ children }: ComponentProps) => (
    <td className="border px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{children}</td>
  ),
  // Custom components available in MDX
  Button,
}