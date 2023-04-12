import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-primary shadow-xl rounded-md w-full font-sans sticky top-0 z-20">
      <div className="navbar-start ml-3 flex-1">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => navigate("/userRegister")}>FInd a Store</a>
            </li>
            <li>
              <a onClick={() => navigate("/nearby")}>Nearby Partners</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Get Involved
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
              <ul className="p-2 bg-base-100 shadow menu menu-compact ring-[0.5px] ring-[rgba(0,0,0,0.2)]">
                <li>
                  <a onClick={() => navigate("/volunteerPromotion")}>
                    How to Volunteer?
                  </a>
                </li>
                <li>
                  <a>How to become a partner?</a>
                </li>
              </ul>
            </li>
            <li>
              <a onClick={() => navigate("/aboutUs")}>About Us</a>
            </li>
            <li>
              <a onClick={() => navigate("/contactUs")}>Contact Us</a>
            </li>
          </ul>
        </div>
        <div>
          <a
            className="flex items-center cursor-pointer hover:text-primary normal-case text-xl"
            onClick={() => linkHandler("/")}
          >
            {/* <img src={MainLogo} alt="Logo" className="w-28 h-16 mr-2" /> */}
            Meals On Wheels
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
