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

module.exports = Menu.buildFromTemplate(template);
