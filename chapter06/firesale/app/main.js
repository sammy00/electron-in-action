const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const windows = new Set();

// Creating a window when application is opened and there are no windows
app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});

app.on('ready', () => {
  createWindow();
});

// Keeping the application alive when all windows are closed
app.on('window-all-closed', () => {
  if ('darwin' == process.platform) {
    return false;
  }

  app.quit();
});

const createWindow = () => {
  let x, y;

  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    const [a, b] = currentWindow.getPosition();

    x = a + 10;
    y = b + 10;
  }

  let newWindow = new BrowserWindow({ x, y, show: false });

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
    openFile(targetWindow, files[0]);
  }
};

const openFile = (targetWindow, file) => {
  const content = fs.readFileSync(file).toString();

  // Appending to the list of recent documents
  app.addRecentDocument(file);

  // Setting the represented file in **macOS**
  targetWindow.setRepresentedFilename(file);

  targetWindow.webContents.send('file-opened', file, content);
};

exports.createWindow = createWindow;
exports.getFileFromUser = getFileFromUser;
exports.openFile = openFile;
