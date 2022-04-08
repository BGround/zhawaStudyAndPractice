import React, { useState } from "react";
import Context from "./Context";
import App from "./App";

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h4>useContext</h4>
      click:{count}
      <button onClick={() => setCount(count + 1)}>click</button>
      <Context.Provider value={count}>
        {/* value 表示上下文要传递的数据 */}
        <App />
      </Context.Provider>
    </div>
  );
};
