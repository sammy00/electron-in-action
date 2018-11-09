const parser = new DOMParser();

const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStorageButton = document.querySelector('.clear-storage');

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  linksSection.innerHTML = '';
});

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', event => {
  event.preventDefault();

  const url = newLinkUrl.value;

  fetch(url)
    .then(response => response.text())
    .then(parseResponse)
    .then(findTitle)
    .then(title => storeLink(title, url))
    .then(clearForm)
    .then(renderLinks);
});

const clearForm = () => {
  newLinkUrl.value = null;
};

const convertToElement = (link) => {
  return `
<div class="link">
  <h3>${link.title}</h3>
  <p>
    <a href="${link.url}">${link.url}</a>
  </p>
</div>
`;
};

const findTitle = (nodes) => nodes.querySelector('title').innerText;

const getLinks = () => {
  return Object.keys(localStorage)
    .map(key => JSON.parse(localStorage.getItem(key)));
};

const parseResponse = (text) => {
  return parser.parseFromString(text, 'text/html');
};

const renderLinks = () => {
  linksSection.innerHTML = getLinks().map(convertToElement).join('');
};

const storeLink = (title, url) => {
  localStorage.setItem(url, JSON.stringify({
    title: title,
    url: url
  }));
};