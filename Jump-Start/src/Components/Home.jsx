import ProductList from "./Products/ProductList";
import SecondaryButton from "./UI/Buttons/SecondaryButton";
import Hero1 from "images/hero1.jpg";
const Home = () => {
  return (
    <div className="pb-2 px-6">
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
            src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
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
            src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
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
            src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
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
      <div className="m-4">
        <h2 className="text-3xl font-bold">Products Featured</h2>
        ~<ProductList />
      </div>
    </div>
  );
};
export default Home;
