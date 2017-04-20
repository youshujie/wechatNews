const $ = function (selector) {
    if (document.querySelectorAll(selector).length === 1) {
        return document.querySelector(selector);
    } else {
        return document.querySelectorAll(selector);
    }
};

const ajax = function (conf) {
    let method = conf.method;
    let url = conf.url;
    let success = conf.success;
    let data = conf.data;
    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    if (method == 'GET' || method == 'get') {
        xhr.send(null);
    } else if (method == 'POST' || method == 'post') {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        }
    };  
};
