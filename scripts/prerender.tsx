import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { routes } from '../src/config/routes'

// Helper: Get output file path for a route
function getOutputPath(routePath: string): string {
  if (routePath === '/') {
    return 'dist/index.html'
  }
  return `dist${routePath}/index.html`
}

// Helper: Inject HTML content and meta tags
function injectHtml(baseHtml: string, data: {
  title: string
  description: string
  body: string
}): string {
  let html = baseHtml

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${data.title}</title>`
  )

  // Add or replace meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${data.description}" />`
    )
  } else {
    html = html.replace(
      '</head>',
      `  <meta name="description" content="${data.description}" />\n  </head>`
    )
  }

  // Add OpenGraph tags
  html = html.replace(
    '</head>',
    `  <meta property="og:title" content="${data.title}" />
  <meta property="og:description" content="${data.description}" />
  <meta property="og:type" content="website" />
  </head>`
  )

  // Replace root div content
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${data.body}</div>`
  )

  return html
}

// Main pre-render function
async function prerender() {
  console.log('Starting pre-render...')

  // Read base HTML template
  const baseHtml = readFileSync('dist/index.html', 'utf-8')
  console.log('✓ Loaded base HTML template')

  // Pre-render each route
  for (const route of routes) {
    try {
      console.log(`\nPre-rendering: ${route.path}`)

      // For SSG, we'll inject a minimal loading state
      // The full content will be rendered client-side for interactivity
      // This ensures SEO meta tags are present while maintaining React hydration
      const html = `<div class="container mx-auto px-6 py-8">
        <div class="animate-pulse space-y-4">
          <div class="h-8 w-64 bg-gray-200 rounded"></div>
          <div class="h-4 w-full bg-gray-100 rounded"></div>
          <div class="h-4 w-3/4 bg-gray-100 rounded"></div>
        </div>
      </div>`
      console.log('  ✓ Generated HTML structure')

      // Inject into base template
      const fullHtml = injectHtml(baseHtml, {
        title: route.title,
        description: route.description,
        body: html,
      })

      // Write to file
      const outputPath = getOutputPath(route.path)
      const outputDir = dirname(outputPath)
      mkdirSync(outputDir, { recursive: true })
      writeFileSync(outputPath, fullHtml, 'utf-8')
      console.log(`  ✓ Written to ${outputPath}`)

    } catch (error) {
      console.error(`  ✗ Error pre-rendering ${route.path}:`, error)
      process.exit(1)
    }
  }

  console.log('\n✓ Pre-render complete!')
  console.log(`Generated ${routes.length} static pages`)
}

// Run pre-render
prerender().catch((error) => {
  console.error('Pre-render failed:', error)
  process.exit(1)
})
