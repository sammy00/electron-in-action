const {
  app,
  BrowserWindow
} = require('electron');

let mainWindow = null;

app.on('ready', () => {
  console.log('Hello from Electron');
  mainWindow = new(BrowserWindow);
  //  Loading an HTML document into the main window: ./app/main.js
  mainWindow.loadFile(__dirname+'/index.html');
  // open dev tool 
  mainWindow.webContents.openDevTools();
});