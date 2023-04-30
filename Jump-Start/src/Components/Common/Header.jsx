import { useNavigate } from "react-router-dom";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import SecondaryButtonOutline from "../UI/Buttons/SecondaryButtonOutline";
import JumpStart from "/src/Images/HeaderAndFooter/JumpStart.png";
import ToastProps from "../UI/Notification/ToastProps";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import ProfilePic from "../../images/user.png";

const Header = (props) => {
  const { isLoggedIn, setIsLoggedIn, userDetails, userType, setToasts } = props;
  const [profileLink, setProfileLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      switch (userType) {
        case "customer":
          setProfileLink("/customer/customerProfile");
          break;
        case "admin":
          setProfileLink("/admin/adminProfile");
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

  const linkHandler = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar w-full bg-primary px-4 sticky top-0 z-20 text-white">
      <div className="flex-1">
        <a
          className="flex items-center cursor-pointer hover:text-primary normal-case w-40 mt-4"
          onClick={() => linkHandler("/")}
        >
          <img src={JumpStart} />
        </a>
      </div>

      <div className="form-control start-2 m-2 ">
        <input
          type="text"
          placeholder="Search"
          className="input text-black w-[30rem] focus:ring-1 ring-secondary"
        />
      </div>
      <SecondaryButton>Search</SecondaryButton>
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
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Most Popular
                </a>
              </li>
              <li>
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Frozen Food
                </a>
              </li>
              <li>
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Dairy Products
                </a>
              </li>
              <li>
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Kitchenware
                </a>
              </li>
              <li>
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Beverages
                </a>
              </li>
              <li>
                <a className="bg-secondary hover:bg-secondary-focus mb-2">
                  Toys
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
        <div className="dropdown dropdown-end">
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>

          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow ring-1 ring-[rgba(0,0,0,0.2)] top-8 right-11"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-secondary btn-block">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {!isLoggedIn ? (
          <div>
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={ProfilePic} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
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
        )}
      </div>
    </div>
  );
};

export default Header;
