const marked = require("marked")

//  Caching DOM selectors
const markdownView = document.querySelector("#markdown")
const htmlView = document.querySelector("#html")
const newFileButton = document.querySelector("#new-file")
const openFileButton = document.querySelector("#open-file")
const saveMarkdownButton = document.querySelector("#save-markdown")
const revertButton = document.querySelector("#revert")
const saveHtmlButton = document.querySelector("#save-html")
const showFileButton = document.querySelector("#show-file")
const openInDefaultButton = document.querySelector("#open-in-default")

// listen on the "keyup" event for re-rendering the HTML when Markdown changes
markdownView.addEventListener("keyup", (event) => {
  renderMarkdownToHTML(event.target.value)
})

// Converting Markdown to HTML
const renderMarkdownToHTML = (markdown) => {
  htmlView.innerHTML = marked(markdown, { sanitize: true })
}
