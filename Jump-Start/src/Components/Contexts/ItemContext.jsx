import React, { useState } from "react";

const ItemContext = React.createContext({
  filterKeyword: "",
  keywordSetHandler: (keyword) => {},
});

export const ItemContextProvider = (props) => {
  const [filterKeyword, setfilterKeyword] = useState("");

  const keywordSetHandler = (keyword) => {
    setfilterKeyword(keyword);
  };

  return (
    <ItemContext.Provider
      value={{
        filterKeyword: filterKeyword,
        keywordSetHandler: keywordSetHandler,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
