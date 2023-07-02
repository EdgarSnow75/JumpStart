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
import CartService from "./services/CartService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan, faMinus, faPlus);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [toasts, setToasts] = useState([]);
  const [cartDetails, setCartDetails] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserService.getUserDetails();
        if (response) {
          setIsLoggedIn(true);
          setUserDetails(response);
          setUserType(response.userType);
        }
      } catch (error) {
        // Handle any errors that occur during the asynchronous operations
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await CartService.getCartByCustomer(userDetails._id);
        if (response) {
          const fetchedCart = await CartService.getCart(response._id);
          setCartDetails(fetchedCart);
          console.log("Cart already exists");
        } else {
          const cart = await CartService.createCart(userDetails._id);
          console.log("Cart created");
          const fetchedCart = await CartService.getCart(cart.cartData._id);
          setCartDetails(fetchedCart);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [userDetails, setCartDetails]);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserType("");
      setUserDetails({});
    }
  }, [isLoggedIn]);

  console.log("Cart Details:", cartDetails);
  console.log("User Details:", userDetails);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userDetails={userDetails}
          userType={userType}
          setToasts={setToasts}
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                userDetails={userDetails}
                isLoggedIn={isLoggedIn}
                userType={userType}
                setToasts={setToasts}
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
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
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
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
          <Route
            path="/ProductList"
            element={
              <ProductList
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/itemDetails/:id"
            element={
              <ProductDetails
                userDetails={userDetails}
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route
            path="/Category/Kitchen"
            element={
              <KitchenFullList
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route
            path="/Category/DIY"
            element={
              <DIYFullList
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route
            path="/Category/HomeCare"
            element={
              <HomeCareFullList
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route
            path="/Category/Gift"
            element={
              <GiftFullList
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route
            path="/Category/MostPopular"
            element={
              <MostPopularFullList
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="/ContactUs" element={<Contact />}></Route>
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
