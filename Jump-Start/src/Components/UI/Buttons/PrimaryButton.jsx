const PrimaryButton = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-primary ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
