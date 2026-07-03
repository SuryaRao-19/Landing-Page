import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { launch, settle, axeSource, BASE_URL } from './helpers.mjs'

// Run axe-core on the key pages. /contact is included deliberately: it has the
// form, and earlier Lighthouse a11y=100 only covered the (form-less) homepage.
const A11Y_PAGES = ['/', '/contact']

let browser
before(async () => { browser = await launch() })
after(async () => { await browser?.close() })

for (const path of A11Y_PAGES) {
  test(`no serious/critical accessibility violations — ${path}`, async () => {
    const page = await browser.newPage()
    try {
      await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
      await page.goto(BASE_URL + path, { waitUntil: 'networkidle0', timeout: 60000 })
      await settle(page)
      await page.evaluate(axeSource)
      const results = await page.evaluate(
        async () => window.axe.run(document, { resultTypes: ['violations'] }),
      )
      const blocking = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      )
      const summary = blocking
        .map((v) => `  • ${v.id} (${v.impact}) ×${v.nodes.length} — ${v.help}`)
        .join('\n')
      assert.equal(
        blocking.length, 0,
        `serious/critical a11y violations on ${path}:\n${summary}`,
      )
    } finally {
      await page.close()
    }
  })
}
