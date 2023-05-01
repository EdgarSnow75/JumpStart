import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";
import AdminService from "../../../services/AdminService";

const AdminCustomerProfileUpdate = (props) => {
  const { id } = useParams();
  const { setToasts } = props;
  const [customer, setCustomer] = useState({
    _id: "",
    customerName: "",
    emailAddress: "",
    customerLocation: "",
    customerContact: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const userData = await AdminService.getUser(id);

      setCustomer(userData);
    }
    fetchUser();
  }, [id]);

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // For other input types, update the customer with the new value
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await AdminService.updateUser(customer, id);
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
          Update your profile
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-info">
          <form
            id="updateProfileForm"
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">Full Name: </label>
              <input
                type="text"
                name="customerName"
                className="w-[30rem] input text-black"
                placeholder="First Name"
                value={customer.customerName}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Email Address: </label>
              <input
                type="email"
                name="emailAddress"
                className="w-[30rem] input text-black"
                placeholder="Email"
                value={customer.emailAddress}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Full Address: </label>
              <input
                type="text"
                name="customerLocation"
                className="w-[30rem] input text-black"
                placeholder="customerLocation:"
                value={customer.customerLocation}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Contact Number</label>
              <input
                type="text"
                name="customerContact"
                className="w-[30rem] input text-black"
                placeholder="Contact"
                value={customer.customerContact}
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
export default AdminCustomerProfileUpdate;
