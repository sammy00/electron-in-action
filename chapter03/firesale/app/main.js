const { app, BrowserWindow } = require("electron")

// Declares mainWindow at the top level so that it won't be collected as garbage
// after the "ready" event completes
let mainWindow = null

app.on("ready", () => {
  // show set as false to hide the window
  mainWindow = new BrowserWindow({ show: false })

  mainWindow.loadFile(__dirname + "/index.html")

  mainWindow.once("ready-to-show", () => {
    // show the window once UI is ready
    mainWindow.show()
    // open the Developer Tools programmatically
    mainWindow.webContents.openDevTools()
  })
  mainWindow.on("closed", () => {
    // nullify the window once closed
    mainWindow = null
  })

  //mainWindow.webContents.openDevTools();
})
