import { useNavigate } from "react-router-dom";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import SecondaryButtonOutline from "../UI/Buttons/SecondaryButtonOutline";
import JumpStart from "/src/Images/HeaderAndFooter/JumpStart.png";
import ToastProps from "../UI/Notification/ToastProps";
import { useContext, useEffect, useRef, useState } from "react";
import UserService from "../../services/UserService";
import ProfilePic from "../../images/user.png";
import StoreService from "../../services/StoreService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartService from "../../services/CartService";
import ItemContext from "../Contexts/ItemContext";

const Header = (props) => {
  const ItemCtx = useContext(ItemContext);
  const [keyword, setKeyword] = useState("");

  const {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    userType,
    setToasts,
    cartDetails,
    setCartDetails,
  } = props;
  const [profileLink, setProfileLink] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const [isCartMenuHovered, setIsCartMenuHovered] = useState(false);
  const cartMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      switch (userType) {
        case "customer":
          setProfileLink("/customer/customerProfile");
          break;
        case "admin":
          setProfileLink("/admin/adminDashboard");
          break;
      }
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const response = await UserService.logout();

    setIsLoggedIn(false);
    setToasts((prev) => [...prev, new ToastProps({ message: response.msg })]);
    navigate("/user/login");
  };

  useEffect(() => {
    if (Object.keys(userDetails).length !== 0) {
      const fetchItemDetails = async () => {
        const itemDetailsPromises = cartDetails.items.map(async (item) => {
          const itemDetails = await StoreService.getItem(item.item);
          return {
            ...itemDetails,
            quantity: item.quantity, // Add quantity to the itemDetails object
          };
        });

        const resolvedItemDetails = await Promise.all(itemDetailsPromises);
        setItemDetails(resolvedItemDetails);
      };
      fetchItemDetails();
    }
  }, [userDetails, cartDetails.items]);

  const onKeywordChangeHanlder = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  const onClickSearchHanlder = async (e) => {
    try {
      await ItemCtx.keywordSetHandler(keyword);
      setKeyword("");
      navigate("/items/filter");
    } catch (error) {
      console.log(error);
    }
  };

  const linkHandler = (path) => {
    navigate(path);
  };

  const onClickItemIncrease = async (itemID) => {
    await CartService.addItemToCart(cartDetails._id, itemID);
    const updatedCartDetails = await CartService.getCart(cartDetails._id);
    setCartDetails(updatedCartDetails);

    const updatedItemDetails = await Promise.all(
      updatedCartDetails.items.map(async (item) => {
        const itemDetails = await StoreService.getItem(item.item);
        return {
          ...itemDetails,
          quantity: item.quantity,
        };
      })
    );
    setItemDetails(updatedItemDetails);
  };

  const onClickItemDelete = async (itemID) => {
    await CartService.deleteItemFromCart(cartDetails._id, itemID);
    const updatedCartDetails = await CartService.getCart(cartDetails._id);
    setCartDetails(updatedCartDetails);

    const updatedItemDetails = await Promise.all(
      updatedCartDetails.items.map(async (item) => {
        const itemDetails = await StoreService.getItem(item.item);
        return {
          ...itemDetails,
          quantity: item.quantity,
        };
      })
    );
    setItemDetails(updatedItemDetails);
  };

  const onClickItemDecrease = async (itemID) => {
    await CartService.decreaseItemFromCart(cartDetails._id, itemID);
    const updatedCartDetails = await CartService.getCart(cartDetails._id);
    setCartDetails(updatedCartDetails);

    const updatedItemDetails = await Promise.all(
      updatedCartDetails.items.map(async (item) => {
        const itemDetails = await StoreService.getItem(item.item);
        return {
          ...itemDetails,
          quantity: item.quantity,
        };
      })
    );
    setItemDetails(updatedItemDetails);
  };

  return (
    <div className="navbar w-screen bg-primary px-4 sticky top-0 z-20 text-white">
      <div className="flex-1">
        <a
          className="flex items-center cursor-pointer hover:text-primary normal-case w-40 mt-4"
          onClick={() => linkHandler("/")}
        >
          <img src={JumpStart} />
        </a>
      </div>

      <div className="form-control start-2 m-2 flex flex-row mr-10">
        <input
          type="text"
          onChange={onKeywordChangeHanlder}
          value={keyword}
          placeholder="Search"
          className="input text-black w-[18rem] focus:ring-1 ring-secondary mr-2"
        />
        <SecondaryButton onClick={onClickSearchHanlder}>Search</SecondaryButton>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-1">
          <li>
            <a onClick={() => navigate("/storeMap")}>Find a Store</a>
          </li>
          <li tabIndex={0}>
            <a>
              Categories
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100 z-0 ring-1 ring-[rgba(0,0,0,0.2)]">
              <li>
                <a
                  className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                  onClick={() => navigate("/Category/MostPopular")}
                >
                  Most Popular
                </a>
              </li>
              <li>
                <a
                  className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                  onClick={() => navigate("/Category/Kitchen")}
                >
                  Kitchen
                </a>
              </li>
              <li>
                <a
                  className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                  onClick={() => navigate("/Category/DIY")}
                >
                  DIY
                </a>
              </li>
              <li>
                <a
                  className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                  onClick={() => navigate("/Category/HomeCare")}
                >
                  Home Care
                </a>
              </li>
              <li>
                <a
                  className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                  onClick={() => navigate("/Category/Gift")}
                >
                  Gift
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a>Orders</a>
          </li>
          <li>
            <a>Customer Service</a>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        {!isLoggedIn ? (
          <div className="pr-2">
            <SecondaryButtonOutline
              className="mx-2"
              onClick={() => linkHandler("/user/login")}
            >
              Login
            </SecondaryButtonOutline>
            <SecondaryButton onClick={() => linkHandler("/user/signup")}>
              Register
            </SecondaryButton>
          </div>
        ) : (
          <div className="flex flex-row h-16 ml-10 mr-24">
            <div className="mr-4">
              <div className="dropdown mr-2 pt-2">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cartDetails.totalItems}
                    </span>
                  </div>
                </label>

                <div
                  tabIndex={0}
                  className="card-body dropdown-content menu w-[30rem] max-h-[44rem] bg-base-100 shadow rounded-box ring-[0.5px] ring-secondary -left-[21rem] top-16 flex-row"
                >
                  <div
                    onMouseEnter={() => setIsCartMenuHovered(true)}
                    onMouseLeave={() => setIsCartMenuHovered(false)}
                    className={`m-2 ${
                      isCartMenuHovered
                        ? "max-h-[34rem] overflow-y-auto"
                        : "overflow-hidden max-h-[34rem]"
                    }`}
                  >
                    {cartDetails.totalItems !== 0 ? (
                      itemDetails.map((item) => (
                        <div
                          className="card card-side bg-base-100 shadow-md p-1 m-1 ring-[0.2px]"
                          key={item._id}
                        >
                          <figure className="w-36 p-1">
                            <img
                              src={item.itemImg}
                              className="w-[8rem] h-[10rem] rounded ring-[0.4px] ring-black ml-1"
                              alt="Item Image"
                            />
                          </figure>
                          <div className="card-body text-black px-2">
                            <h2 className="card-title text-xs max-w-[20rem]">
                              {item.itemName}
                            </h2>
                            <p className="text-secondary font-bold text-xs">
                              Item Price:
                              <span className="text-black font-normal ml-2">
                                ${item.itemPrice}
                              </span>
                            </p>
                            <div className="card-actions justify-between mx-4">
                              <div className="flex flex-row space-x-2">
                                <button
                                  onClick={() => onClickItemDecrease(item._id)}
                                >
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-minus"
                                    style={{ color: "#e65000" }}
                                  />
                                </button>
                                <div>
                                  <p className="text-black">{item.quantity}</p>
                                </div>

                                <button
                                  onClick={() => onClickItemIncrease(item._id)}
                                >
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-plus"
                                    style={{ color: "#e65000" }}
                                  />
                                </button>
                              </div>
                              <button
                                onClick={() => onClickItemDelete(item._id)}
                              >
                                <FontAwesomeIcon
                                  icon="fa-solid fa-trash-can"
                                  style={{ color: "#c1331a" }}
                                  className=""
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="m-2">
                        <p className="text-center text-black text-xl">
                          There are no items in the cart yet! <br />
                          <br />
                          Please add some items to the cart.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="my-2">
                    <p className="text-secondary text-xl text-bold">
                      Total Price:
                      <span className="text-black ml-2">
                        ${cartDetails.totalCost}
                      </span>
                    </p>
                    <div className="card-actions">
                      <button className="btn btn-secondary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="dropdown pt-1">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={ProfilePic} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box -left-20"
                >
                  <li className="pointer-events-none rounded-xl px-4 py-1.5 mb-2 text-white bg-primary drop-shadow-sm">
                    <span className="m-0 p-0">Logged in as:</span>
                    <span className="italic font-bold m-0 p-0">
                      {userDetails.emailAddress}
                    </span>
                  </li>
                  <li>
                    <a
                      className="justify-between text-black my-1"
                      onClick={() => navigate(profileLink)}
                    >
                      {userType === "admin" ? "Admin dashboard" : "Profile"}
                    </a>
                  </li>
                  {userType === "admin" ? (
                    ""
                  ) : (
                    <li>
                      <a
                        className="justify-between text-black my-1"
                        onClick={() => navigate("/orders")}
                      >
                        Orders
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      className="text-white bg-error my-1 hover:bg-red-800"
                      onClick={handleLogout}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
