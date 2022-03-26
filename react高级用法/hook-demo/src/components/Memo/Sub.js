import React, { useMemo } from "react";

export default ({ time }) => {
  const getData = () => {
    return time + "数据";
  };

  const data = useMemo(() => getData(), [time]);

  return (
    <div>
      <div>sub: {time}</div>
      <div>数据: {data}</div>
    </div>
  );
};
