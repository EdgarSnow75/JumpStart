import { useNavigate } from "react-router-dom";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import { useEffect } from "react";
import UserService from "../../services/UserService";
import ToastProps from "../UI/Notification/ToastProps";

const UserLogin = (props) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserType,
    setUserDetails,
    userType,
    setToasts,
  } = props;

  useEffect(() => {
    if (isLoggedIn) {
      switch (userType) {
        case "customer":
          navigate("/customer/customerProfile");
          break;
        case "admin":
          navigate("/admin/adminDashboard");
          break;
      }
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const emailAddress = e.target.emailAddress?.value;
    const password = e.target.password?.value;

    const credentials = {
      emailAddress,
      password,
    };

    try {
      const { userType } = await UserService.login(credentials);
      setUserType(userType);

      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ message: "Login successful" }),
      ]);
    } catch (error) {
      console.log(error);
      const errorMessage = "Wrong Login Credentials"; // Extract the error message
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ type: "error", message: errorMessage }), // Pass the error message
      ]);
      return;
    }

    try {
      const userDetails = await UserService.getUserDetails();
      setUserDetails(userDetails);

      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || "An error occurred"; // Extract the error message
      setToasts((toasts) => [
        ...toasts,
        new ToastProps({ type: "error", message: errorMessage }), // Pass the error message
      ]);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-6xl my-4">Login</h2>
        </div>
        <div className="rounded-md w-[30rem] shadow-md p-10 pt-6 my-4 ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary text-white">
          <h3 className="text-center mb-4 text-xl">
            Login using your existing account
          </h3>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mb-4">
              <label className="mr-4">Your Email</label>
              <input
                type="email"
                name="emailAddress"
                className="w-90 input text-black"
                placeholder="Email address"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mr-4">Password</label>
              <input
                type="password"
                name="password"
                className="w-90 input text-black"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <SecondaryButton type="submit" className="my-4">
                Login
              </SecondaryButton>
            </div>
            <div>
              <a
                onClick={() => navigate("/forgetPassword")}
                className="link link-secondary ml-1 mt-3"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
