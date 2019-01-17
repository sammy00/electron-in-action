const assert = require('assert')
const path = require('path')
const Application = require('spectron').Application
const electronPath = require('electron')

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')]
})

describe('Clipmaster 9000', function() {
  this.timeout(10000)

  beforeEach(() => {
    return app.start()
  })

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  //it('should work', () => {
  //  // Delete this test as soon as you write one of your own.
  //  assert.ok(true);
  //});

  it('does not have the developer tools open', async () => {
    const devToolsAreOpen = await app.client
      .waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened()

    return assert.equal(devToolsAreOpen, false)
  })

  it('has a button with the text "Copy from Clipboard"', async () => {
    const buttonText = await app.client.getText('#copy-from-clipboard')
    return assert.equal(buttonText, 'Copy from Clipboard')
  })

  it('has the correct title', async () => {
    const title = await app.client.waitUntilWindowLoaded().getTitle()
    return assert.equal(title, 'Clipmaster 9000')
  })

  it('should not have clippings when it starts up', async () => {
    await app.client.waitUntilWindowLoaded()
    const clippings = await app.client.$$('.clippings-list-item')
    return assert.equal(clippings.length, 0)
  })

  it('shows an initial window', async () => {
    const nWindow = await app.client.getWindowCount()
    return assert.equal(nWindow, 1)
  })
})
