import React, { useContext } from "react";
import Context from "./Context";
import Page from "./Page";

export default () => {
  const count = useContext(Context); // 获取Provide里的数据 和redux connect有点像
  return (
    <div>
      <h4>ContextSub</h4>
      click:{count}
      <Page />
    </div>
  );
};
