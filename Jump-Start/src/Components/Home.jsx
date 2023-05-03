import DiscountCounter from "./Misc/DiscountCounter";
import ProductList from "./Products/ProductList";
import SecondaryButton from "./UI/Buttons/SecondaryButton";
import Hero1 from "images/hero1.jpg";
import Sale1 from "images/FlashSale.jpg"
import newArrival from "images/newArrival.jpg"
import newArrival2 from "images/newArrival2.jpg"

const Home = () => {
  return (
    <div className="pb-2 px-6">
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-3xl font-bold text-secondary mb-2">
          Time Left Till Promotion Ends:
        </h2>
        <DiscountCounter />
        <h2 className="text-3xl font-bold text-secondary my-2">
          Promotional Items:
        </h2>
      </div>

      <div className="carousel w-full h-[30rem]">
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
          <img
            src={Sale1}
            className="w-full"
          />
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
          <img
            src={newArrival}
            className="w-full"
          />
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
          <img
            src={newArrival2}
            className="w-full"
          />
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
        <div className="flex flex-row justify-center">
          <div className="tabs tabs-boxed">
            <a className="tab">All</a>
            <a className="tab tab-active">Featured</a>
            <a className="tab tab-active">Trending</a>
            <a className="tab">DIY</a>
            <a className="tab">Gift</a>
            <a className="tab">Home Care</a>
            <a className="tab">Kitchen</a>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};
export default Home;
