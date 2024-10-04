import { Elysia } from 'elysia'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

const app = new Elysia()

// Define your runtime config object
const runtimeConfig = {
  API_URL: process.env.API_URL,
  FEATURE_FLAG: process.env.FEATURE_FLAG,
  SAMPLE: process.env.SAMPLE || 'DEFAULT VALUE'
  // Add more variables as needed
}

app.get('*', ({ request }) => {
  const urlPath = new URL(request.url).pathname

  // Check if the request is for the root path, then serve index.html
  let filePath = path.join(process.cwd(), 'ui', 'dist', urlPath === '/' ? 'index.html' : urlPath)

  // If the request is for HTML, inject the runtime config
  if (urlPath === '/') {
    if (!fs.existsSync(filePath)) {
      return new Response('index.html not found', { status: 404 })
    }

    // Read the index.html file
    let html = fs.readFileSync(filePath, 'utf-8')

    // Inject the runtime config into the HTML before </head>
    const configScript = `<script>window.__RUNTIME_CONFIG__ = ${JSON.stringify(runtimeConfig)}</script>`
    html = html.replace('</head>', `${configScript}</head>`)

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  }

  // For other files (e.g., JS, CSS), serve them with appropriate MIME types
  if (!fs.existsSync(filePath)) {
    return new Response('File not found', { status: 404 })
  }

  const contentType = mime.lookup(filePath) || 'application/octet-stream'
  const fileContent = fs.readFileSync(filePath)

  return new Response(fileContent, {
    headers: { 'Content-Type': contentType }
  })
})

app.listen(3000)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)
