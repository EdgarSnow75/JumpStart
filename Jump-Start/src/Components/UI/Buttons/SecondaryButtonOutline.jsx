const SecondaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className={`btn btn-outline btn-secondary ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButtonOutline;
