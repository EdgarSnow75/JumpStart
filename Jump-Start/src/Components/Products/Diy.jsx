import Fetchdata from "../components/Fetchdata";
import SingleProduct from "./SingleProduct";

const Diy = () => {
  const Item = Fetchdata();

  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        DIY
      </h2>
      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {Item &&
          Item
            .filter((Item) => Item.Category % === Diy)
            .map((Item) => {
              return <SingleProduct key={Item.id} Item={Item} />;
            })}
      </div>
    </section>
  );
};

export default Diy;