import DiscountCounter from "./Misc/DiscountCounter";
import ProductList from "./Products/ProductList";
import KitchenList from "./Products/Category/KitchenList";
import Hero1 from "images/hero1.jpg";
import Sale1 from "images/FlashSale.jpg";
import newArrival from "images/newArrival.jpg";
import newArrival2 from "images/newArrival2.jpg";
import { useState } from "react";
import DIYList from "./Products/Category/DIYList";
import HomeCareList from "./Products/Category/HomeCareList";
import GiftList from "./Products/Category/GiftList";
import TrendingList from "./Products/Category/TrendingList";

const Home = (props) => {
  const [selectedTab, setSelectedTab] = useState("all");

  const { userDetails, cartDetails, setCartDetails } = props;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="pb-2 px-6">
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-3xl font-bold text-secondary mb-2">
          Time Left Till Promotion Ends:
        </h2>
        <DiscountCounter />
        <h2 className="text-6xl font-bold underline underline-offset-4 decoration-pink-500 my-4 hover:decoration-secondary hover:cursor-default">
          Promotional Items
        </h2>
      </div>

      <div className="carousel w-full h-[30rem] rounded-md ring-[0.5px] shadow">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={Hero1} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-secondary btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-secondary btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={Sale1} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-secondary btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-secondary btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={newArrival} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-secondary btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-secondary btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src={newArrival2} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-secondary btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-secondary btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="mb-6 mt-8">
        <div>
          <h2 className="font-bold text-4xl text-center">Product List</h2>
        </div>
        <div className="flex flex-row justify-center my-4">
          <div className="tabs tabs-boxed">
            <a
              className={`tab ${selectedTab === "all" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("all")}
            >
              All
            </a>
            <a
              className={`tab ${
                selectedTab === "trending" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("trending")}
            >
              Trending
            </a>
            <a
              className={`tab ${selectedTab === "diy" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("diy")}
            >
              DIY
            </a>
            <a
              className={`tab ${selectedTab === "gift" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("gift")}
            >
              Gift
            </a>
            <a
              className={`tab ${
                selectedTab === "home-care" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("home-care")}
            >
              Home Care
            </a>
            <a
              className={`tab ${selectedTab === "kitchen" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("kitchen")}
            >
              Kitchen
            </a>
          </div>
        </div>
        {selectedTab === "all" && (
          <ProductList
            userDetails={userDetails}
            cartDetails={cartDetails}
            setCartDetails={setCartDetails}
          />
        )}
        {selectedTab === "kitchen" && (
          <KitchenList userDetails={userDetails} cartDetails={cartDetails} setCartDetails={setCartDetails}/>
        )}
        {selectedTab === "diy" && (
          <DIYList userDetails={userDetails} cartDetails={cartDetails} setCartDetails={setCartDetails}/>
        )}
        {selectedTab === "gift" && (
          <GiftList userDetails={userDetails} cartDetails={cartDetails} setCartDetails={setCartDetails}/>
        )}
        {selectedTab === "home-care" && (
          <HomeCareList userDetails={userDetails} cartDetails={cartDetails} setCartDetails={setCartDetails}/>
        )}
        {selectedTab === "trending" && (
          <TrendingList userDetails={userDetails} cartDetails={cartDetails} setCartDetails={setCartDetails}/>
        )}
      </div>
    </div>
  );
};
export default Home;
