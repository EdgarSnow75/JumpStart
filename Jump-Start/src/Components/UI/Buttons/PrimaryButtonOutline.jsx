const PrimaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className="btn-outline btn-primary"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButtonOutline;
