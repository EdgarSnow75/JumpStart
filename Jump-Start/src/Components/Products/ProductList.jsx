import { useNavigate } from "react-router-dom";
import StoreService from "../../services/StoreService";
import { useEffect, useState } from "react";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import StarRating from "../Misc/StarRating";
import SecondaryButton from "../UI/Buttons/SecondaryButton";

const ProductList = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  const viewItems = async () => {
    try {
      const allItems = await StoreService.getItems();
      setItems(allItems);
      setVisibleItems(allItems.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewItems();
  }, []);

  const handleDeleteItem = async (itemID) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const response = await StoreService.deleteItem(itemID);
      console.log(response);

      viewItems();
    }
  };

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
      <div className="grid grid-cols-4 gap-3 gap-y-10 mt-5 ml-12">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div className="card w-96 bg-base-100 shadow-xl p-0 pb-6 ring-[1px] ring-[rgba(0,0,0,0.2)]">
              <figure className="p-0 m-0">
                <img
                  src={item.itemImg}
                  alt="Product Image"
                  className="max-h-[20rem] min-h-[20rem] mb-5 border-b-[0.5px] p-0 mx-0 w-full"
                />
              </figure>
              <div className="card-body p-0 px-4">
                <div className="card-actions flex flex-row justify-between items-center">
                  <div className="text-3xl text-secondary my-2">
                    $ {item.itemPrice}
                  </div>
                  <div>
                    <StarRating />
                  </div>
                </div>
                <h2 className="card-title">
                  {item.itemName}
                  <div className="badge badge-secondary">NEW</div>
                </h2>

                <p>{item.itemDesc}</p>

                <div className="card-actions flex flex-row justify-between items-center">
                  <div className="text-xl font-bold">Categories: </div>
                  <div className="badge badge-outline">{item.itemCategory}</div>
                </div>
                <div className="card-actions justify-center mt-4">
                  <PrimaryButton
                    onClick={() => navigate(`/itemDetails/${item._id}`)}
                    className="mr-4"
                  >
                    View Details
                  </PrimaryButton>
                  <SecondaryButton>Buy Now</SecondaryButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3 className="text-lg text-center">
              There are no items to display. Sorry for the inconvience!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
