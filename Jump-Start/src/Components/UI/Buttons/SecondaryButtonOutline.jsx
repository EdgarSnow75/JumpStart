const SecondaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-outline btn-secondary rounded-md hover:rounded-none ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButtonOutline;
