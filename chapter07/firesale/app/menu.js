const { app, BrowserWindow, Menu, shell } = require('electron');
const main = require('./main');

// template serves as the blueprint for the menu
const template = [
  {
    label: 'Edit',
    submenu: [
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
    ],
  },
];

// Gets the name of the application. This won’t show up in the menu now
// but is useful down the road. This targets the MacOS.
if ('darwin' === process.platform) {
  template.unshift({ label: 'Fire Sale' });
}

module.exports = Menu.buildFromTemplate(template);
