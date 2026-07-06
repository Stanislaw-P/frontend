import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const statePath = path.join(__dirname, 'data', 'event-state.json')
const port = Number(process.env.PORT) || 3000

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
])

async function readEventState() {
  const rawState = await readFile(statePath, 'utf8')
  const parsedState = JSON.parse(rawState)

  return {
    nominationsRevealed: Boolean(parsedState.nominationsRevealed),
  }
}

async function writeEventState(nextState) {
  await writeFile(statePath, `${JSON.stringify(nextState, null, 2)}\n`, 'utf8')
  return nextState
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(data))
}

async function handleApi(request, response, pathname) {
  if (request.method === 'GET' && pathname === '/api/event-state') {
    sendJson(response, 200, await readEventState())
    return true
  }

  if (request.method === 'POST' && pathname === '/api/admin/nominations/open') {
    sendJson(response, 200, await writeEventState({ nominationsRevealed: true }))
    return true
  }

  if (request.method === 'POST' && pathname === '/api/admin/nominations/close') {
    sendJson(response, 200, await writeEventState({ nominationsRevealed: false }))
    return true
  }

  if (pathname.startsWith('/api/')) {
    sendJson(response, 404, { message: 'API endpoint not found' })
    return true
  }

  return false
}

async function serveStatic(response, pathname) {
  const safePathname = decodeURIComponent(pathname)
  const requestedPath = path.normalize(safePathname).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(distDir, requestedPath)

  if (!filePath.startsWith(distDir)) {
    filePath = path.join(distDir, 'index.html')
  }

  if (pathname === '/' || !existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html')
  }

  const fileBuffer = await readFile(filePath)
  const extension = path.extname(filePath)

  response.writeHead(200, {
    'Content-Type': mimeTypes.get(extension) || 'application/octet-stream',
  })
  response.end(fileBuffer)
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)

    if (await handleApi(request, response, url.pathname)) {
      return
    }

    await serveStatic(response, url.pathname)
  } catch (error) {
    console.error(error)
    sendJson(response, 500, { message: 'Internal server error' })
  }
})

server.listen(port, () => {
  console.log(`Graduation app is running at http://localhost:${port}`)
})
