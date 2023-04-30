import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";
import StoreService from "../../../services/StoreService";

const AdminStoreProfileUpdate = (props) => {
  const { id } = useParams();
  const { setToasts } = props;
  const [store, setStore] = useState({
    _id: "",
    storeName: "",
    storeLocation: "",
  });

  useEffect(() => {
    async function fetchStore() {
      const storeData = await StoreService.getStore(id);

      setStore(storeData);
    }
    fetchStore();
  }, [id]);

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // For other input types, update the store with the new value
    setStore({
      ...store,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await StoreService.updateStore(store, id);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: response.msg }),
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
          Update the store details
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-info">
          <form
            id="updateProfileForm"
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">Store Name: </label>
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
              <label className="mr-4">Store Address: </label>
              <input
                type="text"
                name="storeLocation"
                className="w-[30rem] input text-black"
                placeholder="storeLocation"
                value={store.storeLocation}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="flex justify-center items-center">
              <BackButton />
              <button type="submit" className="btn ml-10 w-40 btn-secondary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminStoreProfileUpdate;
