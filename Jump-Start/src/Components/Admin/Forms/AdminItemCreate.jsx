import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import itemService from "../../../services/itemService";

const AdminItemCreate = (props) => {
  const { setToasts } = props;
  const [item, setItem] = useState({
    itemName: "",
    itemLocation: "",
    inventory: [],
  });
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setItem({
      ...item,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await itemService.create(item);
      console.log(response);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: "item Created Successfully!" }),
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
          Create a new item
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary">
          <form
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">item Name</label>
              <input
                type="text"
                name="itemName"
                className="w-[30rem] input text-black"
                placeholder="item Name"
                value={item.itemName}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mr-4">item Location</label>
              <input
                type="text"
                name="itemLocation"
                className="w-[30rem] input text-black"
                placeholder="item Location"
                value={item.itemLocation}
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
export default AdminItemCreate;
