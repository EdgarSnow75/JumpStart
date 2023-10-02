import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import AboutUs from "./Components/Common/AboutUs";
import UserLogin from "./Components/Login&SignUp/UserLogin";
import Privacy from "./Components/Common/Privacy";
import Return from "./Components/Common/Return";
import Contact from "./Components/Common/Contact";
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
import {
  fas,
  faTrashCan,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import FilterResults from "./Components/Products/Filter/FilterResults";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import { userActions } from "./store/userSlice";
import StoreMap from "./Components/Location/StoreMap";
import OnConstruct from "./Components/Common/Error/OnConstruct";

library.add(faTrashCan, faMinus, faPlus);

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const [toasts, setToasts] = useState([]);
  const [cartDetails, setCartDetails] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (Object.keys(userDetails).length !== 0) {
          const response = await UserService.getUserDetails();
          if (response) {
            dispatch(authActions.login());
            dispatch(userActions.setUserDetails(response));
            dispatch(userActions.setUserType(response.userType));
          }
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
        if (userDetails !== null && Object.keys(userDetails).length !== 0) {
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [userDetails, setCartDetails]);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(userActions.clearUserType());
      dispatch(userActions.clearUserDetails());
    }
  }, [isLoggedIn]);

  console.log("Cart Details:", cartDetails);
  console.log("User Details:", userDetails);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          setToasts={setToasts}
          cartDetails={cartDetails}
          setCartDetails={setCartDetails}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                setToasts={setToasts}
                cartDetails={cartDetails}
                setCartDetails={setCartDetails}
              />
            }
          ></Route>
          <Route path="/items/filter" element={<FilterResults />}></Route>
          <Route
            path="/admin/adminDashboard"
            element={
              <AdminDashBoard
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
            element={<UserSignUp setToasts={setToasts} />}
          ></Route>
          <Route
            path="/user/login"
            element={<UserLogin setToasts={setToasts} />}
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
            path="/customer/customerProfile"
            element={<CustomerProfile />}
          ></Route>
          <Route
            path="/customer/profileUpdate"
            element={<CustomerProfileUpdate setToasts={setToasts} />}
          ></Route>
          <Route
            path="/ProductList"
            element={<ProductList setToasts={setToasts} />}
          />
          <Route
            path="/itemDetails/:id"
            element={
              <ProductDetails
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
          <Route path="/StoreMap" element={<StoreMap />}></Route>
          <Route path="/Orders" element={<OnConstruct />}></Route>
          <Route path="/Distributor" element={<OnConstruct />}></Route>
          <Route path="/CustomerService" element={<OnConstruct />}></Route>
        </Routes>
        <ToastContainer toasts={toasts} />
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
