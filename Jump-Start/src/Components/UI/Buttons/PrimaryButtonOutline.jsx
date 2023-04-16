const PrimaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-outline btn-primary ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButtonOutline;
