import { useContext, useState } from "react";
import ItemContext from "../../Contexts/ItemContext";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";

const SearchBar = ({ navigator }) => {
  const [keyword, setKeyword] = useState("");
  const ItemCtx = useContext(ItemContext);

  const onKeywordChangeHanlder = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  const onClickSearchHanlder = async (e) => {
    try {
      await ItemCtx.keywordSetHandler(keyword);
      setKeyword("");
      navigator("/items/filter");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-control start-2 m-2 flex flex-row mr-10">
      <input
        type="text"
        onChange={onKeywordChangeHanlder}
        value={keyword}
        placeholder="Search"
        className="input text-black w-[18rem] focus:ring-1 ring-secondary mr-2"
      />
      <SecondaryButton onClick={onClickSearchHanlder}>Search</SecondaryButton>
    </div>
  );
};

export default SearchBar;
