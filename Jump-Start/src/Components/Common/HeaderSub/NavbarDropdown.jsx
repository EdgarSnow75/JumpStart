const NavbarDropdown = ({ navigator }) => {
  return (
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
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-black shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => navigator("/storeMap")}>Find a Store</a>
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
                onClick={() => navigator("/Category/MostPopular")}
              >
                Most Popular
              </a>
            </li>
            <li>
              <a
                className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                onClick={() => navigator("/Category/Kitchen")}
              >
                Kitchen
              </a>
            </li>
            <li>
              <a
                className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                onClick={() => navigator("/Category/DIY")}
              >
                DIY
              </a>
            </li>
            <li>
              <a
                className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                onClick={() => navigator("/Category/HomeCare")}
              >
                Home Care
              </a>
            </li>
            <li>
              <a
                className="bg-secondary hover:bg-secondary-focus mb-2 flex flex-row justify-center"
                onClick={() => navigator("/Category/Gift")}
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
  );
};

export default NavbarDropdown;
