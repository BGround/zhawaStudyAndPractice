import React, { useContext } from "react";
import Context from "./Context";

export default () => {
  const count = useContext(Context);
  return (
    <div>
      <h4>ContextSub-Sub</h4>
      click:{count}
    </div>
  );
};
