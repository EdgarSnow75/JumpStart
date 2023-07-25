import { useNavigate } from "react-router-dom";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import { useEffect, useReducer, useState } from "react";
import UserService from "../../services/UserService";
import ToastProps from "../UI/Notification/ToastProps";

const loginReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match email pattern
    const isValidEmail = emailPattern.test(action.val);
    return {
      emailAddress: action.val,
      password: state.password,
      emailIsValid: isValidEmail,
      passwordIsvalid: state.passwordIsValid,
      isValid: isValidEmail && state.passwordIsValid,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match email pattern
    const isValidEmail = emailPattern.test(state.emailAddress);
    return {
      emailAddress: state.emailAddress,
      password: state.password,
      emailIsValid: isValidEmail,
      passwordIsvalid: state.passwordIsValid,
      isValid: isValidEmail && state.passwordIsValid,
    };
  }
  if (action.type === "PASSWORD_INPUT") {
    const hasMinimumLength = action.val.trim().length >= 8;
    const hasUpperCaseLetter = /[A-Z]/.test(action.val);
    const hasLowerCaseLetter = /[a-z]/.test(action.val);

    const isValidPassword =
      hasMinimumLength && hasUpperCaseLetter && hasLowerCaseLetter;
    return {
      emailAddress: state.emailAddress,
      password: action.val,
      emailIsValid: state.emailIsValid,
      passwordIsValid: isValidPassword,
      isValid: state.emailIsValid && isValidPassword,
    };
  }
  if (action.type === "PASSWORD_BLUR") {
    const hasMinimumLength = state.password.trim().length >= 8;
    const hasUpperCaseLetter = /[A-Z]/.test(state.password);
    const hasLowerCaseLetter = /[a-z]/.test(state.password);

    const isValidPassword =
      hasMinimumLength && hasUpperCaseLetter && hasLowerCaseLetter;
    return {
      emailAddress: state.emailAddress,
      password: state.password,
      emailIsValid: state.emailIsValid,
      passwordIsValid: isValidPassword,
      isValid: state.emailIsValid && isValidPassword,
    };
  }
};

const UserLogin = (props) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserType,
    setUserDetails,
    userType,
    setToasts,
  } = props;

  const [loginCredentials, dispatchLogin] = useReducer(loginReducer, {
    emailAddress: "",
    password: "",
    emailIsValid: null,
    passwordIsValid: null,
    isValid: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setIsFormValid(
        loginCredentials.emailIsValid && loginCredentials.passwordIsValid
      );
    }, 500);

    return () => {
      console.log("Effect Cleanup!");
      clearTimeout(identifier);
    };
  }, [loginCredentials.emailIsValid, loginCredentials.passwordIsValid]);

  const emailAddressChangeHanlder = (e) => {
    dispatchLogin({
      type: "EMAIL_INPUT",
      val: e.target.value,
    });
  };
  const emailBlurHanlder = () => {
    dispatchLogin({
      type: "EMAIL_BLUR",
    });
  };
  const passwordChangeHanlder = (e) => {
    dispatchLogin({
      type: "PASSWORD_INPUT",
      val: e.target.value,
    });
  };
  const passwordBlurHanlder = () => {
    dispatchLogin({
      type: "PASSWORD_BLUR",
    });
  };

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const emailAddress = loginCredentials.emailAddress;
    const password = loginCredentials.password;

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
              <label
                className={`mr-4 ${
                  loginCredentials.emailIsValid === false ? "text-red-500" : ""
                }`}
              >
                Your Email
              </label>
              <input
                type="email"
                name="emailAddress"
                value={loginCredentials.emailAddress}
                onChange={emailAddressChangeHanlder}
                onBlur={emailBlurHanlder}
                className={`w-90 input text-black ${
                  loginCredentials.emailIsValid === false
                    ? "border-red-500 bg-[#f6dbfc] text-black"
                    : ""
                }`}
                placeholder="Email address"
              />
              {loginCredentials.emailIsValid === false ? (
                <div>
                  <p className="text-red-500 font-light">
                    Entered email is invalid! Please enter a valid email!
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`mr-4 ${
                  loginCredentials.passwordIsValid === false
                    ? "text-red-500"
                    : ""
                }`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginCredentials.password}
                onChange={passwordChangeHanlder}
                onBlur={passwordBlurHanlder}
                className={`w-90 input text-black ${
                  loginCredentials.passwordIsValid === false
                    ? "border-red-500 bg-[#f6dbfc] text-black"
                    : ""
                }`}
                placeholder="Password"
              />
              {loginCredentials.passwordIsValid === false ? (
                <div>
                  <p className="text-red-500 font-light">
                    At least 8 characters with at least one capital and one
                    small letters
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center items-center">
              <SecondaryButton
                type="submit"
                className={`my-4 ${
                  isFormValid === false
                    ? "btn-disabled bg-gray-500 text-gray-300"
                    : ""
                }`}
              >
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
