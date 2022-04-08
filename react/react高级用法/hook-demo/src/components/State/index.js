import React, {useEffect, useState, useRef} from 'react'

// export default () => {
//     const [value, setvalue] = useState(0)

//     const log = () => {
//         setTimeout(() => {
//             alert(value);
//         }, 3000);
//     }

//     return (
//         <div>
//             <p>Capture Value(闭包陷阱)</p>
//             <p>value: {value}</p>
//             <button onClick={log}>alert</button>
//             <button onClick={() => setvalue(value + 1)}>
//                 add
//             </button>
//         </div>
//     )
// }


// 函数组件有两个按钮，"alert", "add" 先点击 "alert" 再点击 "add"

/* 
分析：
这个就是闭包陷阱，函数式组件每次render都会产生一个新的log函数，这个新的函数会产生一个当前阶段value值得闭包

1. 初始次渲染，生成一个 log 函数 (value = 0)
2. value = 0 时，点击alert按钮执行log函数(value = 0)
3. 点击add按钮，比如 value 的值增加到6， 组件render， 生成一个新的log函数(value = 6)
4. 计时器触发，log函数(vaule = 0) 弹出闭包里的value值为0
*/


// 使用useRef解决闭包陷阱的问题

const Fn = () => {
    const [value, setValue] = useState(0);
    const countRef = useRef(value);

    const log = () => {
        setTimeout(() => {
            alert(countRef.current);
        }, 3000);
    }

    useEffect(() => {
        countRef.current = value
    }, [value]);

    return (
        <div>
            <p>Fn</p>
            <p>value: {value}</p>
            <button onClick={log}>alert</button>
            <button onClick={() => setValue(value + 1)}>
                add
            </button>
        </div>
    )

} 

export default Fn;

// useRef 每次render时都会返回同一个引用类型的对象，我们设置值和读取值都在这个对象上处理，这样就能获得最新的value值




