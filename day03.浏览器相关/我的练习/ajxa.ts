interface IOptions {
    url: string,
    type: 'GET' | 'POST',
    data: any,
    timeout?: number
}

export function ajax(
    options : IOptions = {
        url: '',
        type: 'GET',
        data: {},
        timeout: 3000
    }
) {
    return new Promise((resolve, reject) => {
        if (!options.url) {
            return;
        }

        function formatUrl(object) {
            let dataArr = [];
            for (let key in object) {
                dataArr.push(`${key}=${encodeURIComponent(object[key])}`)
            }
            return dataArr.join('$');
        }

        let queryString = formatUrl(options.data);
        let xhr;
        let timer;

        if ((window as any).XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        const onStateChange = () => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    clearTimeout(timer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.status);
                    }
                }
            }
        }

        if (options.type.toUpperCase() === 'GET') {
            xhr.open("GET", `${options.url}?${queryString}`);
            onStateChange();
            xhr.send();
        } else if (options.type.toUpperCase() === 'POST') {
            xhr.open("POST", options.url);
            xhr.setRequestHeader(
                "ContentType",
                "application/x-www-form-urlencoded"
            );
            onStateChange();
            xhr.send()
        }

        if (options.timeout) {
            timer = setTimeout(() => {
                xhr.abort();
                reject("timeout");
            }, options.timeout);
        }

    })
}