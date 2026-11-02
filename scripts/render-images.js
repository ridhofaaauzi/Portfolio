// Renders the Open Graph image and PNG/ICO icons into /public with a headless
// Chromium browser. Run with `npm run og`; set BROWSER_PATH if Edge/Chrome
// lives somewhere else.
import { Buffer } from 'node:buffer'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const publicDir = path.join(root, 'public')

const candidates = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const browser = candidates.find((candidate) => existsSync(candidate))
if (!browser) throw new Error('No Chromium browser found; set BROWSER_PATH')

const profileDir = mkdtempSync(path.join(tmpdir(), 'og-render-'))

function screenshot(page, out, width, height) {
  const url = pathToFileURL(path.join(root, 'scripts', page))
  url.search = `?size=${width}`
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=3000',
    `--user-data-dir=${profileDir}`,
    `--window-size=${width},${height}`,
    `--screenshot=${out}`,
    url.href,
  ], { stdio: 'ignore' })
  console.log(`✓ ${path.relative(root, out)} (${width}×${height})`)
}

// An .ico that just wraps a PNG (supported by every current browser).
function writeIco(png, out) {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // one image
  header.writeUInt8(32, 6) // width
  header.writeUInt8(32, 7) // height
  header.writeUInt16LE(1, 10) // colour planes
  header.writeUInt16LE(32, 12) // bits per pixel
  header.writeUInt32LE(png.length, 14)
  header.writeUInt32LE(22, 18) // image data offset
  writeFileSync(out, Buffer.concat([header, png]))
  console.log(`✓ ${path.relative(root, out)}`)
}

try {
  screenshot('og-image.html', path.join(publicDir, 'og-image.png'), 1200, 630)
  screenshot('icon.html', path.join(publicDir, 'apple-touch-icon.png'), 180, 180)
  screenshot('icon.html', path.join(publicDir, 'icon-192.png'), 192, 192)
  screenshot('icon.html', path.join(publicDir, 'icon-512.png'), 512, 512)

  const small = path.join(profileDir, 'icon-32.png')
  screenshot('icon.html', small, 32, 32)
  writeIco(readFileSync(small), path.join(publicDir, 'favicon.ico'))
} finally {
  rmSync(profileDir, { recursive: true, force: true })
}
