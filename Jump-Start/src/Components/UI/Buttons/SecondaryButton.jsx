const SecondaryButton = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-secondary ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
