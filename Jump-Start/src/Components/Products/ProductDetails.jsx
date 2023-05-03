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
      <div className="container mx-auto flex justify-around  items-center w-[100]">
        <div className="w-100 flex justify-end pe-10">
          <img src={item.itemImg}  alt="Image" className="w-full select-none" />
        </div>
        
        <div className="flex flex-col gap-3 px-2">
          <p className="text-gray-500">
            {<Link to={`/`}>Home/</Link>}
            {<Link to={"itemCategory"}>{item.itemCategory}/</Link>}
            {item.itemName}
          </p>
          <h2 className="text-4xl">{item.itemName}</h2>
          

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Details: </h1>
            <p className="">{item.itemDesc}</p>
            <span className="text-primary">Category: {item.itemCategory}</span>
          </div>
          <span className="font-semibold">
            <span className="text-3xl">$ {item.itemPrice}</span>
          </span>
          <h3 className="flex justify-between text-gray-700 text-lg">
            
            <span className="font-semibold">
              Remaing Stock: {item.itemStock}
            </span>
          </h3>
          <button
            onClick={() => console.log("")}
            className="bg-primary text-sky-50 px-2 py-1 mt-4 w-60 "
          >
            Add to cart
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Home
      </Link>
    </section>
  );
};

export default ProductDetails;
