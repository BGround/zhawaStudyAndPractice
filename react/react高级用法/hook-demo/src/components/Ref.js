import React, { useRef } from "react";

export default () => {
  const inputRef = useRef();

  return (
    <>
      <input ref={inputRef} />
      <br />
      <button
        onClick={() => {
          console.log(inputRef);
          const val = Math.random();
          // 可以直接操作元素dom
          inputRef.current.value = val;
          inputRef.current.style.border = `5px solid #${Math.ceil(
            val * 1000000
          )}`;
        }}
      >
        change dom
      </button>
    </>
  );
};
