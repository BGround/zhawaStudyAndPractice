const parent = document.getElementById('parent');
const child = document.getElementById('child');
const son = document.getElementById('son');
const baidu = document.getElementById('a-baidu');

baidu.addEventListener('click', function(e) {
    e.preventDefault();
})

const banned = false;

window.addEventListener('click', function(e) {
    if (banned) {
        e.stopPropagation();
        this.alert('用户被封禁了！');
        return;
    }
    console.log('window 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

parent.addEventListener('click', function(e) {
    console.log('parent 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

child.addEventListener('click', function(e) {
    console.log('child 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

son.addEventListener('click', function(e) {
    console.log('son 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

son.addEventListener('click', e => console.log('son 冒泡', e.target.nodeName, e.currentTarget.nodeName));

child.addEventListener('click', e => console.log('child 冒泡', e.target.nodeName, e.currentTarget.nodeName));

parent.addEventListener('click', e => console.log('parent 冒泡', e.target.nodeName, e.currentTarget.nodeName));

window.addEventListener('click', e => console.log('window 冒泡', e.target.nodeName, e.currentTarget.nodeName));