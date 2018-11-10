const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const windows = new Set();

let mainWindow = null;

app.on('ready', () => {
  createWindow();
});

const createWindow = () => {
  let newWindow = new BrowserWindow({ show: false });

  newWindow.loadFile(__dirname + '/index.html');

  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });

  newWindow.on('closed', () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);

  return newWindow;
};

const getFileFromUser = (targetWindow) => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'Text Files', extensions: ['txt'] },
    ],
  });

  if (files) {
    openFile(files[0]);
  }
};

const openFile = (targetWindow, file) => {
  const content = fs.readFileSync(file).toString();
  mainWindow.webContents.send('file-opened', file, content);
};

exports.createWindow = createWindow;
exports.getFileFromUser = getFileFromUser;
exports.openFile = openFile;
