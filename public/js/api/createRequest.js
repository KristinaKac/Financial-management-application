/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    let URL;
    let arr = [];


    if (options.method === 'GET') {
        if (options.data) {
            for (const key in options.data) {
                arr.push(`${key}=${options.data[key]}`);
            }
        }
        options.data ? URL = `${options.url}?${arr.join('&')}` : URL = options.url;
    } else {
        if (options.data) {
            for (const key in options.data) {
                formData.append(key, options.data[key]);
            }
        }
        URL = options.url;
    }
    try {
        xhr.open(options.method, URL);
        xhr.responseType = 'json';
        xhr.send(formData);
    } catch (error) {
        throw new Error('Что-то пошло не так ', error);
    }
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            options.callback(xhr.error, xhr.response);
        }
    })
};