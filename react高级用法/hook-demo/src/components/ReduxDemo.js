import React, { useContext } from "react";
import Context from "../Reduxx";

export default () => {
  const { state, dispatch } = useContext(Context);

  return (
    <div>
      <h3>useReducer+useContext≈Redux</h3>
      <div>{JSON.stringify(state)}</div>
      <button
        onClick={() => {
          dispatch({ type: "setState", payload: { time: Date.now() } });
        }}
      >
        set Time
      </button>
      <button
        onClick={() => {
          dispatch({ type: "setState", payload: { random: Math.random() } });
        }}
      >
        set Random
      </button>
    </div>
  );
};
