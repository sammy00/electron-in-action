// Listing 4.1 Importing the dialog module: ./app/main.js
const { app, BrowserWindow, dialog } = require("electron")
const fs = require("fs")

let mainWindow = null

app.on("ready", () => {
  mainWindow = new BrowserWindow({ show: false })

  mainWindow.loadFile(__dirname + "/index.html")

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
    //getFileFromUser();
  })
  mainWindow.on("closed", () => {
    mainWindow = null
  })

  //mainWindow.webContents.openDevTools();
})

const getFileFromUser = () => {
  const files = dialog.showOpenDialog({
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

const openFile = (file) => {
  const content = fs.readFileSync(file).toString()
  mainWindow.webContents.send("file-opened", file, content)
}

exports.getFileFromUser = getFileFromUser
