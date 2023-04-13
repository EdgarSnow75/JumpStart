const PrimaryButton = (props) => {
  return (
    <button type={props.type} className="btn-primary" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
