import React, { useState } from "react";
import Sub from "./Sub";

export default () => {
  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(1);

  return (
    <div>
      <h3>useMemo</h3>
      <div>parent: {time1}</div>
      <button onClick={() => setTime1(Date.now())}>change parent</button>
      <button onClick={() => setTime2(Date.now())}>change sub</button>
      <Sub time={time2} />
    </div>
  );
};
