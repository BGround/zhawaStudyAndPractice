## 前端工程化体系 - 面试详解
### 1. 独立体系
#### 网络
a. 基础知识： ajax、http&https、浏览器
* ajax 基础步骤 - XMLHttpRequest => open => setHeader => send => onreadystateChange
* 数据类型格式 - json操作转换、formData < = > json
* http状态码（重点 3xx, 会引申到缓存机制）、 http 和 https(ssl……) 浏览器加载混合、安全性

toB业务 Saas
安全性
> XSS 与 CSRF
xss: 转义及编码过滤（$、<>、alert等）、httpOnly（js无法去读取cookie）
CSRF: 同源origin&referer验证、token验证、csrfKey(cookie的一部分)

浏览器 
1. 跨域（利用动态script标签的JSONP、CORS响应头、载入iframe页面的document.domain……）
2. 机制

b. 框架工具的使用 - axios
* 基础使用
* 拦截器技巧 - 结合账号体系、上报体系、监控

#### 路由
从MVVM开始，由SPA而来
实现原理： hash & history
* 面试题： 路由原理 / hash模式与history模式的区别与注意？
```js
    // hash模式
    // http:// zhaowa.com/doc/#/yunyindoc2
    // 1. #后面hash值变化，不会出发浏览器的单独请求的，也就是不会刷新页面 
    // 2. 触发hashChange事件，指向模块，实现前端模块的切换

    // history模式 HTML5 http:// zhaowa.com/doc/yunyindoc2
    // 1. pushState和replaceState，不发送服务请求改变url
    // 2. onpopstate 回调，感知url变化

    // 追问：用户在刷新浏览器时，会重新加载不存在的路由吗？ - 会
    // a. 一定会重新请求 -> 必然会碰到请求到前端子路径的问题
    // b. 服务端对于未配置的子路由都指向根路径
```

#### 状态
前端状态维护方式：全局存储、状态机
a. 原理 实例模块的专用化
> 无论用eventBus还是vueX，都过新建了一个专用于存储的vue实例来做响应式存储

面试：单例和模块化

b. 状态流转

### 2. 模块化
#### step1: 面向过程
```js
    $(document).ready(function(){
        // 流程化代码 => 先xxx, 再xxx， 挂载xxx， xxx方法
    })
```

#### step2: 类模块化
```js
    // 第一种
    // global function模式
    function module1() {}
    function module2() {}
    // 命名冲突 模块间的关系模糊

    // 第二种
    // namespace模式
    const module3 = {
        site: 'www.zhaowa.com',
        foo: foo() {},
        bar: bar() {}
    }
    module3.site = 'www.zhaowa.cn'
    module3.foo()
    // 内部完全暴露，模块共享

    // 第三种
    // IIFE模式：匿名立即执行函数
    (function(window) {
        // 属性
        const site = 'www.zhaowa.com'

        // 方法
        // foo() bar()

        // 装载
        window.module3 = { foo, bar }
    })(window)
    // 本质 - 闭包
```

#### step3: 模块化历程
```js
    // 1. node => CommonJS规范 => 同步加载模块
    // 暴露：
    // example.js
    module.exports.x = xxx;
    module.exports.boo = boo;

    // 引入：require(xxx)
    // main.js
    var example = require('./example.js')

    // 工具 - Browserify.js

    // 2. AMD规范 => 允许指定回调函数
    // 暴露：
    // example.js
    define(function() {
        return xxx
    })

    // 存在依赖
    define(['module1', 'module2'],function(m1, m2) {
        return xxx
    })

    // 引入：require(xxx)
    // main.js
    require(['module1', 'module2'], function() {
        // ……
    })

    // 工具 - require.js

    // 3. CMD - 结合了common + AMD 专用于浏览器端
    // sea.js

    // 4. ES6模块化 - 通用的模块解决方案
    // example.js
    let site = 'www.zhaowa.com'
    const getSite = () => {
        return site
    }
    exports {
        getSite
    }

    // main.js
    import { getSite } from './example.js'

    // 面试
    // ES6 与 commonJS差异
    // 重点： commonJs输出值的拷贝、ES6输出值的引用 - 看法
```


