import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import AdminService from "../../../services/AdminService";

const AdminCustomerCreate = (props) => {
  const { setToasts } = props;
  const [customer, setCustomer] = useState({
    customerName: "",
    emailAddress: "",
    password: "",
    customerLocation: "",
    customerContact: "",
  });
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.newUser(customer, "customer");
      console.log(response);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: "Customer User Created Successfully!" }),
        setTimeout(() => {
          navigate("/admin/adminDashboard");
        }, 2000),
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
          Create a new customer user
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary">
          <form
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">First Name</label>
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
              <label className="mr-4">Email Address</label>
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
              <label className="mr-4">Password</label>
              <input
                type="password"
                name="password"
                className="w-[30rem] input text-black"
                placeholder="Password must be between 4-13 letters"
                value={customer.password}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Full Address</label>
              <input
                type="text"
                name="customerLocation"
                className="w-[30rem] input text-black"
                placeholder="Location"
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
export default AdminCustomerCreate;
