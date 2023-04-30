import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import StoreService from "../../../services/StoreService";

const AdminStoreCreate = (props) => {
  const { setToasts } = props;
  const [store, setStore] = useState({
    storeName: "",
    storeLocation: "",
    inventory: [],
  });
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setStore({
      ...store,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await StoreService.create(store);
      console.log(response);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: "store Created Successfully!" }),
        setTimeout(() => {
          navigate("/admin/adminDashboard");
        }, 3000),
      ]);
    } catch (error) {
      const err = error.response.data.msg;
      setToasts((toasts) => [...toasts, new ToastProps({ message: err })]);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-white flex flex-col items-center">
        <h2 className="font-bold text-4xl text-black my-4">
          Create a new store
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary">
          <form
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">Store Name</label>
              <input
                type="text"
                name="storeName"
                className="w-[30rem] input text-black"
                placeholder="Store Name"
                value={store.storeName}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mr-4">Store Location</label>
              <input
                type="text"
                name="storeLocation"
                className="w-[30rem] input text-black"
                placeholder="Store Location"
                value={store.storeLocation}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <BackButton />
              <SecondaryButton type="submit" className="ml-4">
                Create
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminStoreCreate;
