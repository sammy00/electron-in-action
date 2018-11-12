const { app, dialog, BrowserWindow, Menu, shell } = require('electron');
const main = require('./main');

const createApplicationMenu = () => {
  // An easy way to see if any windows are open is to use
  // BrowserWindow.getAllWindows(). If no windows are open, this array will be
  // empty with a length of 0, which is falsey in JavaScript.
  const hasOneOrMoreWindows = !!BrowserWindow.getAllWindows().length;
  const focusedWindow = BrowserWindow.getFocusedWindow();
  const hasFilePath = !!(
    focusedWindow && focusedWindow.getRepresentedFilename()
  );
  // template serves as the blueprint for the menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CommandOrControl+N',
          click() {
            main.createWindow();
          },
        },
        {
          label: 'Open File',
          accelerator: 'CommandOrControl+O',
          click(item, focusedWindow) {
            if (focusedWindow) {
              return main.getFileFromUser(focusedWindow);
            }

            const newWindow = main.createWindow();
            newWindow.on('show', () => {
              main.getFileFromUser(focusedWindow);
            });
          },
        },
        {
          label: 'Save File',
          accelerator: 'CommandOrControl+S',
          click(item, focusedWindow) {
            if (!focusedWindow) {
              return dialog.showErrorBox(
                'Cannot Save or Export',
                'There is currently no active document to save or export.'
              );
            }
            focusedWindow.webContents.send('save-markdown');
          },
        },
        {
          label: 'Export HTML',
          accelerator: 'Shift+CommandOrControl+S',
          click(item, focusedWindow) {
            if (!focusedWindow) {
              return dialog.showErrorBox(
                'Cannot Save or Export',
                'There is currently no active document to save or export.'
              );
            }
            focusedWindow.webContents.send('save-html');
          },
        },
        { type: 'separator' },
        {
          label: 'Show File',
          accelerator: 'Shift+CommandOrControl+S',
          enabled: hasFilePath,
          click(item, focusedWindow) {
            if (!focusedWindow) {
              return dialog.showErrorBox(
                "Cannot Show File's Location",
                'There is currently no active document show.'
              );
            }
            focusedWindow.webContents.send('show-file');
          },
        },
        {
          label: 'Open in Default Editor',
          accelerator: 'Shift+CommandOrControl+S',
          enabled: hasFilePath,
          click(item, focusedWindow) {
            if (!focusedWindow) {
              return dialog.showErrorBox(
                'Cannot Open File in Default Editor',
                'There is currently no active document to open.'
              );
            }
            focusedWindow.webContents.send('open-in-default');
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CommandOrControl+Z',
          role: 'undo',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CommandOrControl+Z',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CommandOrControl+X',
          role: 'cut',
        },
        {
          label: 'Copy',
          accelerator: 'CommandOrControl+C', // keyboard shortcut
          role: 'copy',
        },
        {
          label: 'Paste',
          accelerator: 'CommandOrControl+V',
          role: 'paste',
        },
        {
          label: 'Select All',
          accelerator: 'CommandOrControl+A',
          role: 'selectall',
        },
      ],
    },
    {
      label: 'Window',
      // The window role on the Window menu causes Electron to add a list of
      // all open windows at the end of the menu when running in macOS
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CommandOrControl+M',
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CommandOrControl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Visit Website',
          click() {},
        },
        {
          label: 'Toggle Developer Tool',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          },
        },
      ],
    },
  ];

  // Gets the name of the application. This won’t show up in the menu now
  // but is useful down the road. This targets the MacOS.
  if ('darwin' === process.platform) {
    //template.unshift({ label: 'Fire Sale' });
    const appName = app.getName();
    template.unshift({
      label: appName,
      submenu: [
        {
          label: `About ${appName}`,
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: `Hide ${appName}`,
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          label: `Quit ${appName}`,
          accelerator: 'Command+Q',
          click() {
            app.quit();
          },
        },
      ],
    });

    const windowMenu = template.find((item) => 'Window' === item.label);
    (windowMenu.role = 'window'),
      windowMenu.submenu.push(
        {
          type: 'separator',
        },
        {
          label: 'Bring All to Front',
          role: 'front',
        }
      );
  }

  return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

//module.exports = Menu.buildFromTemplate(template);
module.exports = createApplicationMenu;
