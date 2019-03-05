const { app, BrowserWindow, dialog } = require("electron")
const fs = require("fs")

const windows = new Set()

let mainWindow = null

// Creating a window when application is opened and there are no windows
app.on("activate", (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow()
  }
})

app.on("ready", () => {
  createWindow()
})

// Keeping the application alive when all windows are closed
app.on("window-all-closed", () => {
  if ("darwin" == process.platform) {
    return false
  }

  app.quit()
})

const createWindow = () => {
  let x, y

  const currentWindow = BrowserWindow.getFocusedWindow()
  if (currentWindow) {
    const [a, b] = currentWindow.getPosition()

    x = a + 10
    y = b + 10
  }

  let newWindow = new BrowserWindow({ x, y, show: false })

  newWindow.loadFile(__dirname + "/index.html")

  newWindow.once("ready-to-show", () => {
    newWindow.show()
  })

  newWindow.on("closed", () => {
    // removes the reference from the window set when it has been closed
    windows.delete(newWindow)
    newWindow = null
  })

  // adds the window to the windows set
  windows.add(newWindow)

  return newWindow
}

// Takes a reference to a browser window to determine which window should
// display the file dialog and subsequently load the file selected by the user.
const getFileFromUser = (targetWindow) => {
  // dialog.showOpenDialog() takes a reference to a browser window object
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ["openFile"],
    filters: [
      { name: "Markdown Files", extensions: ["md", "markdown"] },
      { name: "Text Files", extensions: ["txt"] },
    ],
  })

  if (files) {
    openFile(files[0])
  }
}

const openFile = (targetWindow, file) => {
  const content = fs.readFileSync(file).toString()
  mainWindow.webContents.send("file-opened", file, content)
}

exports.createWindow = createWindow
exports.getFileFromUser = getFileFromUser
exports.openFile = openFile
