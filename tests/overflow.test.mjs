import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { launch, renderAll, BASE_URL, VIEWPORTS, PAGES } from './helpers.mjs'

// Guards against the class of mobile bug this project has hit repeatedly:
// a grid/flex/animation child that widens the document past the viewport.
let browser
before(async () => { browser = await launch() })
after(async () => { await browser?.close() })

for (const path of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow — ${path} @ ${vp.label}px`, async () => {
      const page = await browser.newPage()
      try {
        await page.setViewport({
          width: vp.width, height: vp.height,
          deviceScaleFactor: vp.dpr, isMobile: vp.mobile, hasTouch: vp.mobile,
        })
        await page.goto(BASE_URL + path, { waitUntil: 'networkidle0', timeout: 60000 })
        await renderAll(page)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        assert.ok(overflow <= 1, `expected ≤1px horizontal overflow, got ${overflow}px`)
      } finally {
        await page.close()
      }
    })
  }
}
