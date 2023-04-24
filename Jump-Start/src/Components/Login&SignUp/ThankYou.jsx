import SecondaryButton from "../UI/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleLink = (path) => {
    navigate(path);
  };
  return (
    <div className="text-center flex flex-col items-center align-middle justify-center h-[80vh]">
      <div className="ring-[0.5px] ring-[rgba(0,0,0,0.2) bg-primary p-10 rounded-md text-white">
        <h2 className="text-4xl font-bold my-5">
          Thank you for creating an account on our website!
        </h2>
        <p className="text-lg my-5">
          You can now login to your newly created account
        </p>
        <div className="my-4">
          <SecondaryButton onClick={() => handleLink("/user/login")}>
            Login
          </SecondaryButton>
        </div>
        <div className="divider">OR</div>
        <div className="my-4">
          <SecondaryButton onClick={() => handleLink("/")}>
            Continue Browsing
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
export default ThankYou;
