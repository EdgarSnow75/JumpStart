import ProfilePic from "images/user.png";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const CustomerProfile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user/login");
    }

    if (userDetails === null && Object.keys(userDetails).length === 0) {
      dispatch(authActions.logout());
    }
  }, [isLoggedIn, userDetails]);

  const handleEditProfileButton = () => {
    navigate("/customer/profileUpdate");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mt-10 mb-6">
            <img src={ProfilePic} />
          </div>
        </div>
        <div className="bg-accent shadow-md rounded-lg p-10 flex flex-col items-center text-white">
          <div className="bg-primary rounded-md p-6 mb-6">
            <h2 className="text-center mb-4 text-2xl">
              Customer's Information
            </h2>
            <h3 className="mb-2">Full Name: </h3>
            <div className="rounded-box w-[40rem] bg-base-100 ring-4 ring-black text-black p-2 mb-5">
              <h3 className="pl-5 text-xl">{userDetails?.customerName}</h3>
            </div>
            <h3 className="mb-2">Email Address: </h3>
            <div className="rounded-box w-[40rem] bg-base-100 ring-4 ring-black text-black p-2 mb-5">
              <h3 className="pl-5 text-xl">{userDetails?.emailAddress}</h3>
            </div>
            <h3 className="mb-2">Address:</h3>
            <div className="rounded-box w-[40rem] bg-base-100 ring-4 ring-black text-black p-2 mb-5">
              <h3 className="pl-5 text-xl">{userDetails?.customerLocation}</h3>
            </div>
            <h3 className="mb-2">Contact number:</h3>
            <div className="rounded-box w-[40rem] bg-base-100 ring-4 ring-black text-black p-2 mb-5">
              <h3 className="pl-5 text-xl">{userDetails?.customerContact}</h3>
            </div>
            <div>
              <SecondaryButton onClick={handleEditProfileButton}>
                Edit Profile
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerProfile;
