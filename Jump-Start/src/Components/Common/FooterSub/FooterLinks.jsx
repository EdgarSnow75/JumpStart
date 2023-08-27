import JumpStart from "/src/Images/HeaderAndFooter/JumpStart.png";

const FooterLinks = () => {
  return (
    <div className="grid-cols">
      <div className="w-40 items relative left-60 top-5">
        <img src={JumpStart} className="w-30 " />
      </div>
      <ul className="menu menu-horizontal  rounded-box">
        <li>
          <a>Customer Support</a>
        </li>
        <li>
          <a>Become a Distributor</a>
        </li>
        <li>
          <a href="/Return">Return Policy</a>
        </li>
        <li>
          <a href="/AboutUs">About Us</a>
        </li>
        <li>
          <a href="/ContactUs">Contact Us</a>
        </li>
      </ul>
    </div>
  );
};

export default FooterLinks;
