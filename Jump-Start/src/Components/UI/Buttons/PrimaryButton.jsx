const PrimaryButton = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-primary rounded-md hover:rounded-none ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
