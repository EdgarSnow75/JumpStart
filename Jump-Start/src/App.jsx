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
import ToastContainer from "./Components/UI/Notification/ToastContainer";
import AdminDashBoard from "./Components/Admin/AdminDashboard";
import AdminCustomerProfileUpdate from "./Components/Admin/Forms/AdminCustomerProfileUpdate";
import AdminCustomerCreate from "./Components/Admin/Forms/AdminCustomerCreate";
import AdminStoreCreate from "./Components/Admin/Forms/AdminStoreCreate";
import AdminStoreProfileUpdate from "./Components/Admin/Forms/AdminStoreProfileUpdate";
import AdminStoreInventory from "./Components/Admin/AdminStoreInvetory";
import AdminStoreItemCreate from "./Components/Admin/Forms/AdminStoreItemCreate";
import AdminItemCreate from "./Components/Admin/Forms/AdminItemCreate";
import AdminItemProfileUpdate from "./Components/Admin/Forms/AdminItemProfileUpdate";
import ProductList from "./Components/Products/ProductList";
import ProductDetails from "./Components/Products/ProductDetails";
import KitchenFullList from "./Components/Products/Category/FullLists/KitchenFullList";
import DIYFullList from "./Components/Products/Category/FullLists/DIYFullList";
import HomeCareFullList from "./Components/Products/Category/FullLists/HomeCareFullList";
import GiftFullList from "./Components/Products/Category/FullLists/GiftFullList";
import MostPopularFullList from "./Components/Products/Category/FullLists/MostPopularFullList";

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
          <Route
            path="/admin/customerUpdate/:id"
            element={<AdminCustomerProfileUpdate setToasts={setToasts} />}
          ></Route>

          <Route
            path="/admin/customerCreate"
            element={<AdminCustomerCreate setToasts={setToasts} />}
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
            path="/store/newStore"
            element={<AdminStoreCreate setToasts={setToasts} />}
          ></Route>
          <Route
            path="/store/update/:id"
            element={<AdminStoreProfileUpdate setToasts={setToasts} />}
          ></Route>
          <Route
            path="/store/inventory/:id"
            element={<AdminStoreInventory setToasts={setToasts} />}
          ></Route>
          <Route
            path="/:id/items/newItem"
            element={<AdminStoreItemCreate setToasts={setToasts} />}
          ></Route>
          <Route
            path="/items/newItem"
            element={<AdminItemCreate setToasts={setToasts} />}
          ></Route>
          <Route
            path="/item/itemUpdate/:id"
            element={<AdminItemProfileUpdate setToasts={setToasts} />}
          ></Route>

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

          <Route path="/ProductList" element={<ProductList />}></Route>

          <Route path="/itemDetails/:id" element={<ProductDetails />}></Route>

          <Route path="/Category/Kitchen" element={<KitchenFullList />}></Route>
          <Route path="/Category/DIY" element={<DIYFullList />}></Route>
          <Route
            path="/Category/HomeCare"
            element={<HomeCareFullList />}
          ></Route>
          <Route path="/Category/Gift" element={<GiftFullList />}></Route>
          <Route
            path="/Category/MostPopular"
            element={<MostPopularFullList />}
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
