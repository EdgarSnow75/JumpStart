const SecondaryButton = (props) => {
  return (
    <button type={props.type} className="btn-secondary" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SecondaryButton;
