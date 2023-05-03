import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StoreService from "../../services/StoreService";

const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    itemName: "",
    itemImg: "",
    itemDesc: "",
    itemCategory: "",
    itemPrice: "",
    itemStock: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      const itemData = await StoreService.getItem(id);

      setItem(itemData);
      console.log(item);
    }
    fetchItem();
  }, [id]);

  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      <div className="container mx-auto flex justify-around  items-center w-[80%]">
        <div className="w-96 flex justify-end">
          <img src={item.itemImg} alt="Image" className="w-full select-none" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-500">
            {"Home/"}
            {<Link to="/ProductList">product</Link>}
            {`${item.itemName}`}
          </p>
          <h2 className="text-4xl">{item.itemName}</h2>
          <span className="font-semibold">
            Price: <span className="text-2xl">$ {item.itemPrice}</span>
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Key features: </h1>
            <p>{item.itemDesc}</p>
          </div>
          <h3 className="flex justify-between text-gray-700 text-lg">
            <span>Category: {item.itemCategory}</span>
            <span className="font-semibold">
              Remaing Stock: {item.itemStock}
            </span>
          </h3>
          <button
            onClick={() => console.log("ksk")}
            className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
          >
            Add to cart
          </button>
        </div>
      </div>
      <Link
        to="/Item"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Item
      </Link>
    </section>
  );
};

export default ProductDetails;
