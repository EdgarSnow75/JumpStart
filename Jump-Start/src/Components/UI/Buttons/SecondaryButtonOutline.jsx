const SecondaryButtonOutline = (props) => {
  return (
    <button
      type={props.type}
      className="btn-outline btn-secondary"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButtonOutline;
