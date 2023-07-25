import StoreService from "../../../services/StoreService";
import { useEffect, useState } from "react";
import SingleProduct from "../SingleProduct";

const TrendingList = (props) => {
  const { cartDetails, setCartDetails } = props;
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
      console.log(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewItems();
  }, []);

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
          visibleItems
            .filter((item) => item.itemRestockCount > 0)
            .map((item) => (
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
    </div>
  );
};

export default TrendingList;
