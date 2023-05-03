import { useNavigate } from "react-router-dom";
import StarRating from "../Misc/StarRating";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import SecondaryButton from "../UI/Buttons/SecondaryButton";

const SingleProduct = ({ item }) => {
  const navigate = useNavigate();

  return (
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
          <div className="text-3xl text-secondary my-2">$ {item.itemPrice}</div>
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
        <div className="card-actions flex flex-row justify-between items-center">
          <div className="text-xl font-bold">From Store: </div>
          <div className="badge badge-outline">{item.storeName}</div>
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
  );
};

export default SingleProduct;
