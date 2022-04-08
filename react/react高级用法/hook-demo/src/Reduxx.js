import React, { useReducer, createContext } from "react";

const Context = createContext();

const initState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Context;

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
