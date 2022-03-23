## 2022年前端高频面试题
### 必知必会
#### 1. 继承 - 场景类
#### 在原型对象所有属性的方法，都能被实例所共享
```js
    function Game() {
        this.name = 'LOL'
    }
    Game.prototype.getName = function() {
        return this.name
    }

    function LOL() {}
    LOL.prototype = new Game()
    LOL.prototype.constructor = LOL
    const game = new LOL()
// 本质：重写原型对象
```

#### 【面试题】追问：使用过原型链直接继承吗？/ 业务中为啥不常用直接继承的方式 / ……
- 本质： 原型链直接继承的问题或者缺点
```js
    function Game() {
        this.name = 'LOL'
        this.skin = ['s']
    }
    Game.prototype.getName = function() {
        return this.name
    }
    function LOL() {}
    LOL.prototype = new Game()
    LOL.prototype.constructor = LOL
    const game1 = new LOL()
    const game2 = new LOL()
    game1.skin.push('ss')
    game2.skin
```
* 1. 父类属性一旦赋值给子类原型属性，此时就处于子类的共享属性
* 2. 实例化子类时，无法向父类做传参

- 提炼：所有对于原型链上的属性修改，都会变成通用调整

### 【面试题】那么如何解决通用属性全局被更改的问题

### 解决方案：构造函数继承
#### a.经典继承
```js
function Game(arg) {
    this.name = 'LOL'
    this.skin = ['s']
}
Game.prototype.getName = function() {
    return this.name
}
function LOL(arg) {
    // ……
    Game.call(this, arg)
}
const game3 = new LOL('arg')
// 解决了共享属性的问题 + 子向父传参的问题
```

### 【面试题】追问：
实质- 原型链上的共享方法无法被直接读取继承，如何解决？
#### b. 方案：组合继承
```js
function Game(arg) {
    this.name = 'LOL'
    this.skin = ['s']
}
Game.prototype.getName = function() {
    return this.name
}
// 继承属性
function LOL(arg) {
    // ……
    Game.call(this, arg)
}
// 遗传方法
LOL.prototype = new Game()
LOL.prototype.constructor = LOL

const game4 = new LOL('arg')
```

### 【面试题】追问：
组合继承就没有缺点吗？这种方案在功能之外有什么缺陷？
本质 - 功能、性能、可读性
* 1. 初始化子类原型
* 2. 子类call父亲的时候

#### 解决方案：寄生组合继承
```js
function Game(arg) {
    this.name = 'LOL'
    this.skin = ['s']
}
Game.prototype.getName = function() {
    return this.name
}
// 继承属性
function LOL(arg) {
    // ……
    Game.call(this, arg)
}
// 遗传方法
LOL.prototype = Object.create(Game.prototype)
LOL.prototype.constructor = LOL
```
【面试题】new Object()和Object.create区别 - 后者可以继承传入的arg

【面试题】多重继承
```js
function Game(arg) {
    this.name = 'LOL'
    this.skin = ['s']
}
Game.prototype.getName = function() {
    return this.name
}

function Store() {
    this.shop = 'steam'
}
Store.prototype.getPlatform = function() {
    return this.shop
}

// 继承属性
function LOL(arg) {
    // ……
    Game.call(this, arg)
    Store.call(this, arg)
}
// 遗传方法
LOL.prototype = Object.create(Game.prototype)
// 多重继承
Object.assign(LOL.prototype, Store.prorotype)
LOL.prototype.constructor = LOL
```

#### 2. 使用库 ES、TS
* 面试题：原理题 + 应用题 + 技巧题

##### 原理
babel 转义 原理：ES => AST => plugin => JS => browser
##### 应用题：语法 + 知识点
##### 技巧:
class
```js
// 经典闭包
function mail() {
    let content = '这是信'
    return function() {
        console.log(content)
    }
}
const envelop = mail()
envelop()
// 函数外部获取到函数作用域内的变量值

function() {
    // ……
}()
```
#### 【面试题】如何生成私有属性
```js
class Course {
    constructor(teacher, course) {
        this._teacher = teacher

        let _course = 'zhaowa'
        this.getCourse = () => {
            return _course
        }
    }
}
```

箭头函数
```js
    function Obj(teacher) {
        this.teacher = teacher
    }

    const Obj = teacher => {
        this.teacher = teacher
    }
    const o = new Obj()
```
* 1. 箭头函数无constructor，无法实例化
* 2. 箭头函数无法构造原型方法

#### 【面试题】当面试官问道，这里为啥不让用箭头函数，一定要function
实质 - 1. 构造角度 2. 上下文角度
