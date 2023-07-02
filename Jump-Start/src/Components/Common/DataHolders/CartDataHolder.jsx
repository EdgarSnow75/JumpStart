const CartDataHolder = (props) => {
  const { cartDetails, setCartDetails, userDetails } = props;
  console.log("CDH CD :", cartDetails);
  console.log("CDH SCD:", setCartDetails);
  console.log("CDH UD:", userDetails);
  return (
    <div>
      <div></div>
    </div>
  );
};

export default CartDataHolder;
