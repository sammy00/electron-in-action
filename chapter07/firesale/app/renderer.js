const { remote, ipcRenderer } = require('electron');

const path = require('path');

const main = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const marked = require('marked');

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

let filePath = null;
let originalContent = '';

// Setting up foundation for drag-and-drop events
document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('dragleave', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

ipcRenderer.on('file-changed', (event, file, content) => {
  remote.dialog.showMessageBox(currentWindow, {
    type: 'warning',
    title: 'Overwrite Current Unsaved Changes?',
    message: 'Another application has changed this file. Load changes?',
    buttons: ['Yes', 'Cancel'],
    defaultId: 0,
    cancelId: 1,
  });

  renderFile(file, content);
});

ipcRenderer.on('file-opened', (event, file, content) => {
  if (!currentWindow.isDocumentEdited()) {
    renderFile(file, content);
    return;
  }

  const choice = remote.dialog.showMessageBox(currentWindow, {
    type: 'warning',
    title: 'Overwrite Current Unsaved Changes?',
    message:
      'Opening a new file in this window will overwrite your unsaved changes. Open this file anyway?',
    buttons: ['Yes', 'Cancel'],
    defaultId: 0,
    cancelId: 1,
  });

  if (1 == choice) {
    return;
  }
});

ipcRenderer.on('save-html', () => {
  main.saveHTML(currentWindow, filePath, markdownView.value);
});

ipcRenderer.on('save-markdown', () => {
  main.saveMarkdown(currentWindow, filePath, markdownView.value);
});

markdownView.addEventListener('dragover', (event) => {
  const file = getDraggedFile(event);

  if (fileTypeIsSupported(file)) {
    markdownView.classList.add('drag-over');
  } else {
    markdownView.classList.add('drag-error');
  }
});

markdownView.addEventListener('drop', (event) => {
  const file = getDroppedFile(event);

  if (fileTypeIsSupported(file)) {
    main.openFile(currentWindow, file.path);
  } else {
    alert('That file type is not supported');
  }

  markdownView.classList.remove('drag-over');
  markdownView.classList.remove('drag-error');
});

markdownView.addEventListener('keyup', (event) => {
  renderMarkdownToHTML(event.target.value);
  // Whenever the user inputs a keystroke into the Markdown view, checks to see
  // if the current content matches the content that we stored in a variable
  // and updates the UI accordingly.
  updateUserInterface(originalContent !== event.target.value);
});

newFileButton.addEventListener('click', () => {
  main.createWindow();
});

openFileButton.addEventListener('click', () => {
  main.getFileFromUser(currentWindow);
});

const renderFile = (file, content) => {
  // Updates the path of the currently opened file stored in the top-level scope
  filePath = file;
  // Updates the original content to determine if the file has unsaved changes
  originalContent = content;

  markdownView.value = content;
  renderMarkdownToHTML(content);

  // Calls the method that updates the window’s title bar whenever
  // a new file is opened.
  updateUserInterface(false);
};

revertButton.addEventListener('click', () => {
  markdownView.value = originalContent;
  renderMarkdownToHTML(originalContent);
});

saveHtmlButton.addEventListener('click', () => {
  main.saveHTML(currentWindow, htmlView.innerHTML);
});

// Adding an event listener to the Save File button
saveMarkdownButton.addEventListener('click', () => {
  main.saveMarkdown(currentWindow, filePath, markdownView.value);
});

const fileTypeIsSupported = (file) => {
  return ['text/plain', 'text/markdown'].includes(file.type);
};

const getDraggedFile = (event) => event.dataTransfer.items[0];
const getDroppedFile = (event) => event.dataTransfer.files[0];

const renderMarkdownToHTML = (markdown) => {
  htmlView.innerHTML = marked(markdown, {
    sanitize: true,
  });
};

const updateUserInterface = (edited) => {
  // edited indicates whether the document has unsaved changes
  let title = 'Fire Sale';

  if (filePath) {
    // Updating the window title based on the current file
    title = `${path.basename(filePath)} - ${title}`;
  }
  if (edited) {
    title = `${title} (Edited)`;
  }

  currentWindow.setTitle(title);
  // If edited, then updates the window accordingly
  currentWindow.setDocumentEdited(edited);

  // Enabling the Save and Revert buttons when there are unsaved changes
  saveMarkdownButton.disabled = !edited;
  revertButton.disabled = !edited;
};
