
const ERROR_MESSAGE = 'Ну удалось загрузить пользователей!';

const content = document.querySelector('.content');
const userList = document.querySelector('.user-list');

const downloadBtn = document.querySelector('.download-button');
downloadBtn.addEventListener('click', fetchRandomUsers);

fetchRandomUsers();

function fetchRandomUsers() {
    setLoader(true);
    hiddenError();
    userList.innerHTML = '';

    // У меня API работает только с VPN

    const url = 'https://randomuser.me/api/?results=10';

    fetch(url)
        .then(response => response.json())
        .then((response) => {
            if (response.info.results > 0) {
                success(response.results);
            } else {
                throw new Error(ERROR_MESSAGE);
            }
        })
        .catch((error) => {
            showError(error.message);
        })
        .finally(() => {
            setLoader(false);
        })
}

function success(data) {
    const html = data.map(user => createUserTpl(user)).join('');
    userList.innerHTML = html;
}

function createUserTpl({ id, name, picture, email }) {
    return `
        <li class="user">
            <figure>
                <img src="${picture.large}" alt="${name.first} ${name.last}">
                <figcaption>${name.title} <br> ${name.first} ${name.last}</figcaption>
            </figure>
            <a href="mailto:${email}">${email}</a>
        </li>
    `;
}

function showError(message) {
    const errorEl = document.querySelector('p.error');

    if (!errorEl) {
        const el = document.createElement('p');
        el.classList.add('error');
        el.innerHTML = message;
        content.insertBefore(el, userList);
    } else {
        errorEl.innerHTML = message;
    }
}

function hiddenError() {
    const errorEl = document.querySelector('p.error');
    errorEl && errorEl.remove();
}

function setLoader(status) {
    const loader = document.querySelector('.loader');
    status
        ? loader.classList.add('loading')
        : loader.classList.remove('loading');
}