import puppeteer from 'puppeteer-core'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

/** Resolve a Chrome/Chromium executable. CI sets CHROME_PATH; locally we fall
 *  back to the common install locations (this repo uses puppeteer-core, which
 *  does NOT bundle a browser). */
function chromePath() {
  const fromEnv = process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH
  if (fromEnv) return fromEnv
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ]
  const found = candidates.find((p) => existsSync(p))
  if (!found) throw new Error('Chrome not found — set the CHROME_PATH environment variable.')
  return found
}

export async function launch() {
  return puppeteer.launch({
    executablePath: chromePath(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1'],
    defaultViewport: null,
  })
}

/** axe-core source, injected into the page for accessibility assertions. */
export const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

/** Quick pass to force below-the-fold `content-visibility:auto` sections to
 *  render (enough for layout/overflow checks). */
export async function renderAll(page) {
  await page.evaluate(async () => {
    const step = 600
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
}

/** Thorough settle for a11y/contrast checks: framer-motion `whileInView`
 *  animations are JS-driven (a `prefers-reduced-motion` CSS media query does NOT
 *  stop them), so we scroll slowly to trigger each section, then wait for the
 *  ~0.5s entrance transitions to finish — otherwise axe reads text mid-fade and
 *  reports false contrast failures. */
export async function settle(page) {
  await page.evaluate(async () => {
    const vh = window.innerHeight
    for (let y = 0; y <= document.body.scrollHeight; y += Math.floor(vh * 0.8)) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 250))
    }
    await new Promise((r) => setTimeout(r, 900))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 900))
  })
}

export const VIEWPORTS = [
  { label: '375', width: 375, height: 812, mobile: true, dpr: 2 },
  { label: '768', width: 768, height: 1024, mobile: true, dpr: 2 },
  { label: '1024', width: 1024, height: 768, mobile: false, dpr: 1 },
]

export const PAGES = ['/', '/contact', '/services', '/about', '/industries', '/case-studies']
