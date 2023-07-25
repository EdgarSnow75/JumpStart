import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import ToastProps from "../UI/Notification/ToastProps";
import { useEffect, useReducer, useState } from "react";

const customerReducer = (state, action) => {
  if (action.type === "NAME_INPUT") {
    console.log(
      "Before",
      state.nameIsValid,
      state.emailIsValid,
      state.passwordIsValid,
      state.locationIsValid,
      state.contactIsValid
    );
    const containsNumbers = /\d/.test(action.val); // Check if value contains numbers
    return {
      customerName: action.val,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: action.val.trim().length > 0 && !containsNumbers,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        action.val.trim().length > 0 &&
        !containsNumbers &&
        state.emailIsValid &&
        state.passwordIsValid &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "NAME_BLUR") {
    const containsNumbers = /\d/.test(state.customerName); // Check if value contains numbers
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.customerName.trim().length > 0 && !containsNumbers,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        state.customerName.trim().length > 0 &&
        !containsNumbers &&
        state.emailIsValid &&
        state.passwordIsValid &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "EMAIL_INPUT") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match email pattern
    const isValidEmail = emailPattern.test(action.val);
    return {
      customerName: state.customerName,
      emailAddress: action.val,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: isValidEmail,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        isValidEmail &&
        state.passwordIsValid &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match email pattern
    const isValidEmail = emailPattern.test(state.emailAddress);
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: isValidEmail,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        isValidEmail &&
        state.passwordIsValid &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "PASSWORD_INPUT") {
    const hasMinimumLength = action.val.trim().length >= 8;
    const hasUpperCaseLetter = /[A-Z]/.test(action.val);
    const hasLowerCaseLetter = /[a-z]/.test(action.val);

    const isValidPassword =
      hasMinimumLength && hasUpperCaseLetter && hasLowerCaseLetter;
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: action.val,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: isValidPassword,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        state.emailIsValid &&
        isValidPassword &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "PASSWORD_BLUR") {
    const hasMinimumLength = state.password.trim().length >= 8;
    const hasUpperCaseLetter = /[A-Z]/.test(state.password);
    const hasLowerCaseLetter = /[a-z]/.test(state.password);

    const isValidPassword =
      hasMinimumLength && hasUpperCaseLetter && hasLowerCaseLetter;
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: isValidPassword,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        state.emailIsValid &&
        isValidPassword &&
        state.locationIsValid &&
        state.contactIsValid,
    };
  }
  if (action.type === "LOCATION_INPUT") {
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: action.val,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: action.val.trim().length > 4,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        state.emailIsValid &&
        state.passwordIsValid &&
        action.val.trim().length > 4 &&
        state.contactIsValid,
    };
  }
  if (action.type === "LOCATION_BLUR") {
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.customerLocation.trim().length > 4,
      contactIsValid: state.contactIsValid,
      isValid:
        state.nameIsValid &&
        state.emailIsValid &&
        state.passwordIsValid &&
        state.customerLocation.trim().length > 4 &&
        state.contactIsValid,
    };
  }
  if (action.type === "CONTACT_INPUT") {
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: action.val,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: action.val.trim().length > 4,
      isValid:
        state.customerName &&
        state.emailIsValid &&
        state.passwordIsValid &&
        state.locationIsValid &&
        action.val.trim().length > 4,
    };
  }
  if (action.type === "CONTACT_BLUR") {
    return {
      customerName: state.customerName,
      emailAddress: state.emailAddress,
      password: state.password,
      customerLocation: state.customerLocation,
      customerContact: state.customerContact,
      nameIsValid: state.nameIsValid,
      emailIsValid: state.emailIsValid,
      passwordIsValid: state.passwordIsValid,
      locationIsValid: state.locationIsValid,
      contactIsValid: state.customerContact.trim().length > 4,
      isValid:
        state.customerName &&
        state.emailIsValid &&
        state.passwordIsValid &&
        state.locationIsValid &&
        state.customerContact.trim().length > 4,
    };
  }
  return {
    customerName: "",
    emailAddress: "",
    password: "",
    customerLocation: "",
    customerContact: "",
    nameIsValid: null,
    emailIsValid: null,
    passwordIsValid: null,
    locationIsValid: null,
    contactIsValid: null,
    isValid: null,
  };
};

const UserSignUp = (props) => {
  const { isLoggedIn, userType, setToasts } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [customerDetails, dispatchCustomerDetails] = useReducer(
    customerReducer,
    {
      customerName: "",
      emailAddress: "",
      password: "",
      customerLocation: "",
      customerContact: "",
      nameIsValid: null,
      emailIsValid: null,
      passwordIsValid: null,
      locationIsValid: null,
      contactIsValid: null,
      isValid: false,
    }
  );
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

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setIsFormValid(
        customerDetails.nameIsValid &&
          customerDetails.emailIsValid &&
          customerDetails.passwordIsValid &&
          customerDetails.locationIsValid &&
          customerDetails.contactIsValid
      );
    }, 500);

    return () => {
      console.log("Effect Cleanup");
      clearTimeout(identifier);
    };
  }, [
    customerDetails.nameIsValid,
    customerDetails.emailIsValid,
    customerDetails.passwordIsValid,
    customerDetails.locationIsValid,
    customerDetails.contactIsValid,
  ]);

  const customerNameChangeHanlder = (e) => {
    dispatchCustomerDetails({
      type: "NAME_INPUT",
      val: e.target.value,
    });
  };

  const nameBlurHanlder = () => {
    dispatchCustomerDetails({
      type: "NAME_BLUR",
    });
  };
  const emailAddressChangeHanlder = (e) => {
    dispatchCustomerDetails({
      type: "EMAIL_INPUT",
      val: e.target.value,
    });
  };
  const emailBlurHanlder = () => {
    dispatchCustomerDetails({
      type: "EMAIL_BLUR",
    });
  };
  const passwordChangeHanlder = (e) => {
    dispatchCustomerDetails({
      type: "PASSWORD_INPUT",
      val: e.target.value,
    });
  };
  const passwordBlurHanlder = () => {
    dispatchCustomerDetails({
      type: "PASSWORD_BLUR",
    });
  };
  const customerLocationChangeHanlder = (e) => {
    dispatchCustomerDetails({
      type: "LOCATION_INPUT",
      val: e.target.value,
    });
  };
  const locationBlurHanlder = () => {
    dispatchCustomerDetails({
      type: "LOCATION_BLUR",
    });
  };
  const customerContactChangeHanlder = (e) => {
    dispatchCustomerDetails({
      type: "CONTACT_INPUT",
      val: e.target.value,
    });
  };
  const contactBlurHanlder = () => {
    dispatchCustomerDetails({
      type: "CONTACT_BLUR",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const customerName = customerDetails.customerName;
    const emailAddress = customerDetails.emailAddress;
    const password = customerDetails.password;
    const customerLocation = customerDetails.customerLocation;
    const customerContact = customerDetails.customerContact;

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
                <label
                  className={`mr-4 ${
                    customerDetails.nameIsValid === false ? "text-red-500" : ""
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={customerDetails.customerName}
                  onChange={customerNameChangeHanlder}
                  onBlur={nameBlurHanlder}
                  className={`w-[30rem] input text-black ${
                    customerDetails.nameIsValid === false
                      ? "border-red-500 bg-[#f6dbfc] text-black border-b-2"
                      : ""
                  }`}
                  placeholder="Your Full Name"
                />
                {customerDetails.nameIsValid === false ? (
                  <div>
                    <p className="text-red-500 font-light">
                      Name cannot be empty! Please write your name!
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className={`mr-4 ${
                    customerDetails.emailIsValid === false ? "text-red-500" : ""
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={customerDetails.emailAddress}
                  onChange={emailAddressChangeHanlder}
                  onBlur={emailBlurHanlder}
                  className={`w-[30rem] input text-black ${
                    customerDetails.emailIsValid === false
                      ? "border-red-500 bg-[#f6dbfc] text-black"
                      : ""
                  }`}
                  placeholder="Your Email"
                  required
                />
                {customerDetails.emailIsValid === false ? (
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
                    customerDetails.passwordIsValid === false
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={customerDetails.password}
                  onChange={passwordChangeHanlder}
                  onBlur={passwordBlurHanlder}
                  className={`w-[30rem] input text-black ${
                    customerDetails.passwordIsValid === false
                      ? "border-red-500 bg-[#f6dbfc] text-black"
                      : ""
                  }`}
                  placeholder="At least 8 characters with at least one capital and one small letters"
                  required
                />
                {customerDetails.passwordIsValid === false ? (
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
              <div className="flex flex-col">
                <label
                  className={`mr-4 ${
                    customerDetails.locationIsValid === false
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Address
                </label>
                <input
                  type="text"
                  name="customerLocation"
                  value={customerDetails.customerLocation}
                  onChange={customerLocationChangeHanlder}
                  onBlur={locationBlurHanlder}
                  className={`w-[30rem] input text-black ${
                    customerDetails.locationIsValid === false
                      ? "border-red-500 bg-[#f6dbfc] text-black"
                      : ""
                  }`}
                  placeholder="Your address"
                  required
                />
                {customerDetails.locationIsValid === false ? (
                  <div>
                    <p className="text-red-500 font-light">
                      Your location must be a valid location and cannot be
                      shorter than 4 letters!
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className={`mr-4 ${
                    customerDetails.contactIsValid === false
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Contact Info
                </label>
                <input
                  type="number"
                  name="customerContact"
                  value={customerDetails.customerContact}
                  onChange={customerContactChangeHanlder}
                  onBlur={contactBlurHanlder}
                  className={`w-[30rem] input text-black ${
                    customerDetails.contactIsValid === false
                      ? "border-red-500 bg-[#f6dbfc] text-black"
                      : ""
                  }`}
                  placeholder="Your contact information"
                  required
                />
                {customerDetails.contactIsValid === false ? (
                  <div>
                    <p className="text-red-500 font-light">
                      Your contact infomation must be longr than 4 letters!
                    </p>
                  </div>
                ) : (
                  ""
                )}
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
                <SecondaryButton
                  type="submit"
                  className={`${
                    isFormValid === false
                      ? "btn-disabled bg-gray-500 text-gray-300"
                      : ""
                  }`}
                >
                  Sign Up
                </SecondaryButton>
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
