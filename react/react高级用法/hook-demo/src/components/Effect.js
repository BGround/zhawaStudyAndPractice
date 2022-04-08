import React, { useEffect, useState } from "react";

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 默认监听 componentWillMount componentDidUpdate
    console.log(`click ${count} 了 一下`);
  });

  useEffect(() => {
    // 参数2表示要监听的state [count] 如果是空数组表示只执行一次
    console.log(`请求数据 了 一下`);

    return () => {
      //effect里return一个函数表示组件销毁时执行  相当于componentWillUnmount
      alert("effect 组件销毁了");
    };
  }, []); // 页面初始化请求ajax数据可以写空数据

  return (
    <div>
      <h4>useEffect</h4>
      click:{count}
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
};
