import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SingleProduct from "../SingleProduct";
import ItemService from "../../../services/ItemService";
import StoreService from "../../../services/StoreService";
import ItemContext from "../../Contexts/ItemContext";

const FilterResults = (props) => {
  const ItemCtx = useContext(ItemContext);
  const { cartDetails, setCartDetails } = props;

  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const filteredItems = await ItemService.filterItems(
          ItemCtx.filterKeyword
        );
        const updatedItems = await Promise.all(
          filteredItems.map(async (item) => {
            const store = await StoreService.getStore(item.storeID);
            return { ...item, storeName: store.storeName };
          })
        );
        setItems(updatedItems);
        setVisibleItems(updatedItems.slice(0, 15));
        console.log("Filtered Items", items);
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    };

    fetchItems();
  }, [ItemCtx.filterKeyword]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom) {
        const currentLength = visibleItems.length;
        const nextIndex = currentLength + 10;
        const nextItems = items.slice(currentLength, nextIndex);
        setVisibleItems([...visibleItems, ...nextItems]);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, visibleItems]);

  return (
    <div className="min-h-screen">
      <p className="text-2xl m-8 font-bold text-center">
        Search Results for: {ItemCtx.filterKeyword}
      </p>
      {visibleItems.length == 0 ? (
        <p className="text-center text-xl">
          There are no items with the name {ItemCtx.filterKeyword}
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-y-10 mt-5 ml-12">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <SingleProduct
                key={item._id}
                item={item}
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            ))
          ) : (
            <div className="col-span-4">
              <h3 className="text-2xl font-bold text-center">
                Items are loading! Thanks for your patience!
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterResults;
