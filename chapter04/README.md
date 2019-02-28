# Chapter 04. Using native file dialog boxes and facilitating interprocess communication

## Overview

- Implementing a native open file dialog box using Electron's `dialog` module
- Facilitating communication between the main process and a renderer process
- Exposing functionality from the main process to renderer processes
- Importing functionality from the main process into the renderer process using Electron's `remote` module
- Sending information from the main process to a renderer process using the `webContents` module and setting up a listener for messages from the main process using the `ipcRenderer` module

## 4.1 Triggering native file dialog boxes

- create native dialogs using `dialog` module
- trigger the opening dialog by [`dialog.showOpenDialog([browserWindow, ], options[, callback])`](https://electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options-callback)
  - `openFile` value of properties signifies the dialog box is for opening file

## 4.2 Reading files using Node

- `dialog.showOpenDialog()` returns an array consisting of the paths of the file or files that the user selected
- The built-in `fs` library helps to read the content from files

### 4.2.1 Scoping the Open File dialog

- By default, `dialog.showOpenDialog()` lets us open any file on our computer without filtering by file types
- The `filters` property in `options` can whitelist the types of files to open

### 4.2.2 Implementing dialog sheets in macOS

- **WHY**: the names for file extension filters is unavailable in macOS
- **HOW**: pass a reference to the `BrowserWindow` instance as anchor

## 4.3 Facilitating interprocess communication

### Introducing the remote module

## 4.4 Triggering the Open File function using interprocess communication

### Understanding the CommonJS require system

### Requiring functionality from another process

## 4.5 Sending content from the main process to the renderer process

### Sending the file contents to the renderer contents 82
