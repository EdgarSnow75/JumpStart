import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../UI/Buttons/BackButton";
import CustomerService from "../../services/CustomerService";
import ToastProps from "../UI/Notification/ToastProps";
import { useSelector } from "react-redux";

const CustomerProfileUpdate = ({ setToasts }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.user.userDetails);

  const [customer, setCustomer] = useState({
    customerName: "",
    emailAddress: "",
    customerLocation: "",
    customerContact: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user/login");
    } else {
      setCustomer({
        customerName: userDetails.customerName,
        emailAddress: userDetails.emailAddress,
        customerLocation: userDetails.customerLocation,
        customerContact: userDetails.customerContact,
      });
    }
  }, [isLoggedIn, userDetails]);

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
    console.log("Trying to update!");
    try {
      const response = await CustomerService.update(customer);
      console.log("Updated :", response);
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: "Updated Successfully" }),
      ]);
      navigate(-1);
    } catch (error) {
      // const err = error.response.data.msg;
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ type: "error", message: error }),
      ]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
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
                placeholder="Full Name"
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
              <label className="mr-4">Full Address</label>
              <input
                type="text"
                name="customerLocation"
                className="w-[30rem] input text-black"
                placeholder="Your Full Address"
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
                placeholder="Your contact info"
                value={customer.customerContact}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <BackButton />
              <button type="submit" className="btn ml-10 w-40 btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomerProfileUpdate;
