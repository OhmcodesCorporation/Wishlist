const TOKEN_REFRESH_INTERVAL = 500; // 1.5 minutes 90000
const TOKEN_REFRESH_URL = 'https://localhost:8000/api/token/refresh';
let timeout = null;

const refreshableFetch = (url, init) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => refreshableFetch(TOKEN_REFRESH_URL), TOKEN_REFRESH_INTERVAL);

    return fetch(url, init);
}

export default refreshableFetch;
