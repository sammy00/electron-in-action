const { app, BrowserWindow,dialog } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadFile(__dirname + '/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUser();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  //mainWindow.webContents.openDevTools();
});

const getFileFromUser = ()=>{
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (!files) { return; }

  console.log(files);
};