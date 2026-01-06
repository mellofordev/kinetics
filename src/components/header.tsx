import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="px-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold text-xl">Kinetics</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          to="/docs"
          className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-medium"
        >
          Docs
        </Link>
        <Link
          to="/docs/components/button"
          className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-medium"
        >
          Components
        </Link>
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <a
          href="https://github.com/mellofordev/kinetics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-foreground text-sm"
        >
          GitHub
        </a>
      </div>
    </div>
    </header>
  );
}
