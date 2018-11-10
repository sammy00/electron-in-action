const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

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

const getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'Text Files', extensions: ['txt'] },
    ],
  });

  if (!files) {
    return;
  }

  console.log(fs.readFileSync(files[0]).toString());
};
