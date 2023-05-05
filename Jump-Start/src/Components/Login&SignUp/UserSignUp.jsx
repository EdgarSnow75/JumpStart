import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import ToastProps from "../UI/Notification/ToastProps";
import { useEffect } from "react";

const UserSignUp = (props) => {
  const { isLoggedIn, userType, setToasts } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      switch (userType) {
        case "customer":
          navigate("/customer/customerProfile");
          break;
        case "admin":
          navigate("/admin/adminProfile");
      }
    }
  }, [isLoggedIn]);
  const submitHandler = async (e) => {
    e.preventDefault();

    const customerName = e.target.customerName?.value;
    const emailAddress = e.target.emailAddress?.value;
    const password = e.target.password?.value;
    const customerLocation = e.target.customerLocation?.value;
    const customerContact = e.target.customerContact?.value;

    try {
      const response = await CustomerService.signup({
        customerName,
        emailAddress,
        password,
        customerLocation,
        customerContact,
      });
      console.log(response);

      setToasts((prev) => [...prev, new ToastProps({ message: response.msg })]);

      navigate("/user/thankyou");
    } catch (error) {
      const err = error.response.data.msg;
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ type: "error", message: err }),
      ]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-6xl my-4">Sign Up</h2>
        <div className="text-white">
          <div className="rounded-md w-[35rem] shadow-md p-10 pt-2 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary">
            <form
              onSubmit={submitHandler}
              className="mt-8 max-w-md grid grid-cols-1 gap-6"
            >
              <div className="flex flex-col">
                <label className="mr-4">Your Name</label>
                <input
                  type="text"
                  name="customerName"
                  className="w-[30rem] input text-black"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mr-4">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  className="w-[30rem] input text-black"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mr0-4">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-[30rem] input text-black"
                  placeholder="At least 8 characters with at least one capital and one small letters, and one number"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mr0-4">Address</label>
                <input
                  type="text"
                  name="customerLocation"
                  className="w-[30rem] input text-black"
                  placeholder="Your address"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mr0-4">Contact Info</label>
                <input
                  type="text"
                  name="customerContact"
                  className="w-[30rem] input text-black"
                  placeholder="Your contact information"
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
                    onClick={() => handleLink("/user/privacyPolicy")}
                    className="link link-secondary ml-1"
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <SecondaryButton type="submit"> Sign Up </SecondaryButton>
                {/* <button type="submit" className="btn ml-10 w-40 btn-secondary">
                  Sign Up
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignUp;
