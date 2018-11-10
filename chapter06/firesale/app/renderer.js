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

ipcRenderer.on('file-opened', (event, file, content) => {
  // Updates the path of the currently opened file stored in the top-level scope
  filePath = file;
  // Updates the original content to determine if the file has unsaved changes
  originalContent = content;

  markdownView.value = content;
  renderMarkdownToHTML(content);

  // Calls the method that updates the window’s title bar whenever
  // a new file is opened.
  updateUserInterface();
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

const renderMarkdownToHTML = (markdown) => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
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
