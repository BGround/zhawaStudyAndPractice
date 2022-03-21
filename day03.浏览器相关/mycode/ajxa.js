"use strict";
exports.__esModule = true;
exports.ajax = void 0;
function ajax(options) {
    if (options === void 0) { options = {
        url: '',
        type: 'GET',
        data: {},
        timeout: 3000
    }; }
    return new Promise(function (resolve, reject) {
        if (!options.url) {
            return;
        }
        function formatUrl(object) {
            var dataArr = [];
            for (var key in object) {
                dataArr.push("".concat(key, "=").concat(encodeURIComponent(object[key])));
            }
            return dataArr.join('$');
        }
        var queryString = formatUrl(options.data);
        var xhr;
        var timer;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var onStateChange = function () {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    clearTimeout(timer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(xhr.status);
                    }
                }
            };
        };
        if (options.type.toUpperCase() === 'GET') {
            xhr.open("GET", "".concat(options.url, "?").concat(queryString));
            onStateChange();
            xhr.send();
        }
        else if (options.type.toUpperCase() === 'POST') {
            xhr.open("POST", options.url);
            xhr.setRequestHeader("ContentType", "application/x-www-form-urlencoded");
            onStateChange();
            xhr.send();
        }
        if (options.timeout) {
            timer = setTimeout(function () {
                xhr.abort();
                reject("timeout");
            }, options.timeout);
        }
    });
}
exports.ajax = ajax;
