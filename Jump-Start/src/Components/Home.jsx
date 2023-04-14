import SecondaryButton from "./UI/Buttons/SecondaryButton";
import Hero1 from "images/hero1.jpg";
const Home = () => {
  return (
    <div className="p-2">
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
      <div className="my-4">
        <h2>Products Featured</h2>
      </div>
    </div>
  );
};
export default Home;
