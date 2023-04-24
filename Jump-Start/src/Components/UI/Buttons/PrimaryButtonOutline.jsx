const PrimaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-outline btn-primary rounded-md hover:rounded-none ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButtonOutline;
