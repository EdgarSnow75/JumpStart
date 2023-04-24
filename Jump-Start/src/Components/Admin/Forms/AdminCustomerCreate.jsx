import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../generic/BackButton";
import ToastProps from "../../UI/Notification/ToastProps";

const AdminCustomerCreate = (props) => {
  const { setToasts } = props;
  const [customer, setCustomer] = useState({
    customerName: "",
    emailAddress: "",
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

  const submitHandler = (e) => {
    e.preventDefault();
    setToasts((toasts) => [
      ...toasts,
      new ToastProps({ message: "Customer User Created Successfully!" }),
    ]);
  };

  const handleLink = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="text-white flex flex-col items-center">
        <h2 className="font-bold text-4xl text-black my-4">
          Create a new customer user
        </h2>
        <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-accent">
          <form
            onSubmit={submitHandler}
            className="mt-8 max-w-md grid grid-cols-1 gap-6"
          >
            <div className="flex flex-col">
              <label className="mr-4">First Name</label>
              <input
                type="text"
                name="customerName"
                className="w-[30rem] input"
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
                className="w-[30rem] input"
                placeholder="Email"
                value={customer.emailAddress}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Full Address</label>
              <input
                type="text"
                name="usercustomerLocation"
                className="w-[30rem] input"
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
                className="w-[30rem] input"
                placeholder="Contact"
                value={customer.customerContact}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div>
              <label className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 checkbox-secondary"
                  required
                />
                By signing up, you agree to our
                <a
                  onClick={() => handleLink("/privacyPolicy")}
                  className="link link-primary ml-1"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>
            <div className="flex justify-center items-center">
              <BackButton />
              <button type="submit" className="btn ml-10 w-40 btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminCustomerCreate;
