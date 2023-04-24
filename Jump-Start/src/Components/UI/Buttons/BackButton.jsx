import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const classes = "btn btn-warning m-w-40 items-center" + props.className;
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <button className={classes} onClick={handleBackButtonClick}>
      Back
    </button>
  );
};

export default BackButton;
