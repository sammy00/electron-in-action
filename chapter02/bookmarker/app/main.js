const { app, BrowserWindow } = require("electron")

let mainWindow = null

app.on("ready", () => {
  console.log("Hello from Electron")

  // when the app is ready, creates a browser window, and
  // assigns it to the variable created in the top-level scope
  mainWindow = new BrowserWindow()
  //  Loading an HTML document into the main window: ./app/main.js
  // loadFile on BrowserWindow is a shortcut of BrowserWindow.webContents.loadFile
  mainWindow.loadFile(__dirname + "/index.html")
  // open dev tool
  mainWindow.webContents.openDevTools()
})
