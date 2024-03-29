import StoreService from "../../services/StoreService";
import { useContext, useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import ItemContext from "../Contexts/ItemContext";
import ItemService from "../../services/ItemService";

const ProductList = ({ cartDetails, setCartDetails, setToasts }) => {
  const ItemCtx = useContext(ItemContext);

  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  const viewItems = async () => {
    try {
      const items = await StoreService.getItems();

      // Fetch the store name for each item
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const store = await StoreService.getStore(item.storeID);
          return { ...item, storeName: store.storeName };
        })
      );
      setItems(updatedItems);
      setVisibleItems(updatedItems.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const filteredItems = await ItemService.filterItems(
          ItemCtx.filterKeyword
        );
        setItems(filteredItems);
        setVisibleItems(filteredItems.slice(0, 15));
        console.log(items);
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
    <div>
      <div className="grid grid-cols-4 gap-y-10 mt-5 ml-12">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <SingleProduct
              key={item._id}
              item={item}
              cartDetails={cartDetails}
              setCartDetails={setCartDetails}
              setToasts={setToasts}
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
    </div>
  );
};

export default ProductList;
