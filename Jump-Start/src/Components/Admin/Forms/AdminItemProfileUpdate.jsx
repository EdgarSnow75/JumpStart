import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import ToastProps from "../../UI/Notification/ToastProps";
import StoreService from "../../../services/StoreService";

const AdminItemProfileUpdate = (props) => {
  const { id } = useParams();
  const { setToasts } = props;
  const [item, setItem] = useState({
    itemName: "",
    itemImg: "",
    itemDesc: "",
    itemCategory: "",
    itemPrice: "",
    itemStock: "",
    itemRestockCount: "",
    restockStatus: false,
    storeID: "",
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

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // For other input types, update the item with the new value
    setItem({
      ...item,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await StoreService.updateItem(item, id);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: response.msg }),
        setTimeout(() => {
          navigate("/admin/adminDashboard");
        }, 2000),
      ]);
    } catch (error) {
      const err = error.response.data.msg;
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ type: "error", message: err }),
      ]);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-white flex flex-col items-center">
        <h2 className="font-bold text-4xl text-black my-4">
          Update the item details
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-info">
          <form
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">Item Name</label>
              <input
                type="text"
                name="itemName"
                className="w-[30rem] input text-black"
                placeholder="Item Name"
                value={item.itemName}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mr-4">Item Image URL</label>
              <input
                type="text"
                name="itemImg"
                className="w-[30rem] input text-black"
                placeholder="Link to image"
                value={item.itemImg}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Description</label>
              <input
                type="text"
                name="itemDesc"
                className="w-[30rem] input text-black"
                placeholder="Item Description"
                value={item.itemDesc}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Category</label>
              <input
                type="text"
                name="itemCategory"
                className="w-[30rem] input text-black"
                placeholder="Write at least one category"
                value={item.itemCategory}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Price in USD</label>
              <input
                type="text"
                name="itemPrice"
                className="w-[30rem] input text-black"
                placeholder="Item Price"
                value={item.itemPrice}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Stock</label>
              <input
                type="text"
                name="itemStock"
                className="w-[30rem] input text-black"
                placeholder="Item Stock"
                value={item.itemStock}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Restock Count</label>
              <input
                type="number"
                name="itemRestockCount"
                className="w-[30rem] input text-black"
                placeholder="Set this to 0"
                value={item.itemRestockCount}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Item Restock Status</label>
              <input
                type="text"
                name="itemImage"
                className="w-[30rem] input text-black"
                placeholder="Set this to false if itemStock is over 10"
                value={item.restockStatus}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <BackButton />
              <SecondaryButton type="submit" className="ml-4">
                Update
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminItemProfileUpdate;
