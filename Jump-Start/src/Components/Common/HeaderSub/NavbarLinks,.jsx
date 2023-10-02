const NavbarLinks = ({ navigator }) => {
  return (
    <div className="flex-none hidden lg:flex">
      <ul className="menu menu-horizontal p-1">
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
          <a onClick={() => navigator("/Orders")}>Orders</a>
        </li>
        <li>
          <a onClick={() => navigator("/CustomerService")}>Customer Service</a>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLinks;
