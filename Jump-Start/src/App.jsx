import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import AboutUs from "./Components/Common/AboutUs";
import UserLogin from "./Components/Login&SignUp/UserLogin";
import Privacy from "./Components/Privacy";
import Return from "./Components/Return";
import Contact from "./Components/Contact";
import Map from "./Components/Location/Map";
import ThankYou from "./Components/Login&SignUp/ThankYou";
import UserSignUp from "./Components/Login&SignUp/UserSignUp";
import { useEffect, useState } from "react";
import UserService from "./services/UserService";
import CustomerProfile from "./Components/Profile/CustomerProfile";
import CustomerProfileUpdate from "./Components/Profile/CustomerProfileUpdate";
import TestButton from "./Components/UI/Buttons/TestButton";
import ToastContainer from "./Components/UI/Notification/ToastContainer";
import AdminDashBoard from "./Components/Admin/AdminDashboard";
import AdminCustomerProfileUpdate from "./Components/Admin/Forms/AdminCustomerProfileUpdate";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    UserService.getUserDetails().then((response) => {
      if (response) {
        setIsLoggedIn(true);
        setUserDetails(response);
        setUserType(response.userType);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserType("");
      setUserDetails({});
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userDetails={userDetails}
          userType={userType}
          setToasts={setToasts}
        />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/admin/customerUpdate/:id"
            element={<AdminCustomerProfileUpdate setToasts={setToasts} />}
          ></Route>
          <Route path="/user/thankyou" element={<ThankYou />}></Route>
          <Route
            path="/user/signup"
            element={
              <UserSignUp
                isLoggedIn={isLoggedIn}
                userType={userType}
                setToasts={setToasts}
              />
            }
          ></Route>
          <Route
            path="/admin/adminDashboard"
            element={
              <AdminDashBoard
                userDetails={userDetails}
                isLoggedIn={isLoggedIn}
                userType={userType}
                setToasts={setToasts}
              />
            }
          ></Route>
          <Route path="/tester/button" element={<TestButton />}></Route>
          <Route
            path="/user/login"
            element={
              <UserLogin
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserType={setUserType}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                userType={userType}
                setToasts={setToasts}
              />
            }
          ></Route>
          <Route
            path="/customer/customerProfile"
            element={
              <CustomerProfile
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userDetails={userDetails}
                setToasts={setToasts}
              />
            }
          ></Route>
          <Route
            path="/customer/profileUpdate"
            element={
              <CustomerProfileUpdate
                isLoggedIn={isLoggedIn}
                userDetails={userDetails}
                setToasts={setToasts}
              />
            }
          ></Route>
          <Route path="/About" element={<AboutUs />}></Route>
          <Route path="/Privacy" element={<Privacy />}></Route>
          <Route path="/Return" element={<Return />}></Route>
        </Routes>
        <ToastContainer toasts={toasts} />
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
