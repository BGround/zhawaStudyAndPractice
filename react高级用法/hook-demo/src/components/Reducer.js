import React, { useReducer } from "react";

export default () => {
  // 第一个参数是reducer函数 第二个参数是初始化的值
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return state + 1;
      case "del":
        return state - 1;
    }
    return state;
  }, 0);

  return (
    <div>
      <h3>useReducer</h3>
      <h4>{count}</h4>
      <div>
        <button onClick={() => dispatch({ type: "add" })}>add</button>
        <button onClick={() => dispatch({ type: "del" })}>del</button>
      </div>
    </div>
  );
};
