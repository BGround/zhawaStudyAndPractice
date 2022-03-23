### promise的属性和静态方法连写 any race all allSettled finally

```js
//先实例
const p1 = Promise.resolve('p1 执行');

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2在2s之后执行');
    }, 2000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resovle('p3在1s之后执行');
    }, 1000)
})


```

### Promise.all
```js
Promise.all = promises => {
    return new Promise((resolve, reject) => {
        let arr = [];
        let count = 0;

        for(let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then(value => {
                    arr[i] = value;
                    count++

                    // 这个判断是在
                    if (count === promises.length) {
                        resolve(arr)
                    }
                })
                .catch(reason => {
                    reject(reason);
                })
            
        }
    })
}
```

### Promise.any

```js
Promise.any = promises => {
    return new Promise((resolve, reject) => {
        let arr = [];
        let count = 0;
        promises.forEach((item, i) => {
            Promise.resolve(item).then(resolve, reason => {
                arr[i] = {status: reject, value: reason};
                count++;

                if (count === promises.length) {
                    reject(new Error('no promise success'));
                }
            })
        })
    })
}

```

### Promise.prototype.finally

```js
Promise.prototype.finally = function(callback) {
    return this.then(
        (value) => {
            Promise.resolve(callback()).then(() => value);
        },
        (reason) => {
            Promise.resolve(callback()).then(() => reason);
        }
    )
}

```

### Promise.race

```js
Promise.race = promises => {
    return new Promise((resolve, reject) => {
        promises.forEach(item => {
            Promise.resolve(item).then(resolve, reject)
        })
    })
}

```

### Promise.allSettled
```js
Promise.allSettled = promises => {
    return new Promise((resolve, reject) => {
        let arr = [];
        let count = 0;
        const processResult = (res, index, status) => {
            arr[i] = {status: status, value: res};
            count++;

            if (count === promises.length) {
                resolve(arr);
            }
        }

        promises.forEach((item, i) => {
            Promise.resolve(item).then(
                value => {
                    processResult(value, i, 'resolve');
                },
                reason => {
                    processResult(reason, i, 'reject);
                }
            )
        })
    })
}

```