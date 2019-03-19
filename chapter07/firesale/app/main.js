const { app, BrowserWindow, dialog, Menu } = require('electron');
const appMenu = require('./menu');
const fs = require('fs');

const openFiles = new Map();
const windows = new Set();

// Creating a window when application is opened and there are no windows
app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});

app.on('ready', () => {
  Menu.setApplicationMenu(appMenu);
  createWindow();
});

// Responding to external requests to open a file
app.on('will-finish-launching', () => {
  app.on('open-file', (event, file) => {
    const win = createWindow();
    win.once('ready-to-show', () => {
      openFile(win, file);
    });
  });
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

  let newWindow = new BrowserWindow({ x, y, show: false, title: "FireSale" });

  newWindow.loadFile(__dirname + '/index.html');

  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });

  newWindow.on('close', (event) => {
    if (!newWindow.isDocumentEdited()) {
      return;
    }

    // If the window has unsaved changes, prevents it from closing
    event.preventDefault();

    const choice = dialog.showMessageBox(newWindow, {
      type: 'warning',
      title: 'Quit with Unsaved Changes?',
      message: 'Your changes will be lost if you do not save.',
      buttons: ['Quit Anyway', 'Cancel'],
      // Sets the first option as the default option
      // if the user hits the Return key
      defaultId: 0,
      // Sets the second button as the button selected
      // if the user dismisses the message box.
      cancelId: 1,
    });

    if (0 == choice) {
      // If the user selects "Quit Anyway", forces the window to close
      newWindow.destroy();
    }
  });

  newWindow.on('closed', () => {
    windows.delete(newWindow);

    // When the window is closed, stops the watcher for the file
    // associated with that window.
    stopWatchingFile(newWindow);

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

  startWatchingFile(targetWindow, file);
};

const saveHTML = (targetWindow, content) => {
  const file = dialog.showSaveDialog(targetWindow, {
    title: 'Save HTML',
    defaultPath: app.getPath('temp'),
    filters: [{ name: 'HTML Files', extensions: ['html', 'htm'] }],
  });

  if (!file) {
    return;
  }

  fs.writeFileSync(file, content);
};

const saveMarkdown = (targetWindow, file, content) => {
  if (!file) {
    file = dialog.showSaveDialog(targetWindow, {
      title: 'Save Markdown',
      defaultPath: app.getPath('temp'),
      filters: [{ name: 'Markdown Files', extensions: ['md', 'markdown'] }],
    });
  }

  if (!file) {
    // If the user selects Cancel in the File dialog box, aborts the function
    return;
  }

  // Writes the contents of the buffer to the filesystem
  fs.writeFileSync(file, content);
  openFile(targetWindow, file);
};

const startWatchingFile = (targetWindow, file) => {
  stopWatchingFile(targetWindow);

  const watcher = fs.watchFile(file, (event) => {
    if ('change' === event) {
      const content = fs.readFileSync(file).toString();
      targetWindow.webContents.send('file-changed', file, content);
    }
  });

  // Tracks the watcher so we can stop it later
  openFiles.set(targetWindow, watcher);
};

const stopWatchingFile = (targetWindow) => {
  if (openFiles.has(targetWindow)) {
    openFiles.get(targetWindow).stop();
    openFiles.delete(targetWindow);
  }
};

exports.createWindow = createWindow;
exports.getFileFromUser = getFileFromUser;
exports.openFile = openFile;
exports.saveHTML = saveHTML;
exports.saveMarkdown = saveMarkdown;
