import ConstructionImg from "../../../images/VectorImgs/under-maintainence.jpg";

const OnConstruct = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-10">
      <h1 className="text-2xl font-bold text-center px-4">
        Sorry! This page is still on contruction!
      </h1>
      <img src={ConstructionImg} className="lg:w-[40%] md:w-[50%] sm:w-[70%]" />
    </div>
  );
};

export default OnConstruct;
