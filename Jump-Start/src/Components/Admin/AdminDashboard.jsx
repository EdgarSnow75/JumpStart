import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastProps from "../UI/Notification/ToastProps";
import AdminUserControl from "./AdminUserControl";
import AdminStoreControl from "./AdminStoreControl";
import AdminInventoryControl from "./AdminInventoryControl";

const AdminDashBoard = (props) => {
  const { isLoggedIn, userDetails, setToasts } = props;
  const navigate = useNavigate();
  const [tab, setTab] = useState("Users");

  useEffect(() => {
    if (!isLoggedIn || userDetails.userType !== "admin") {
      navigate("/user/login");
    }
  }, [isLoggedIn, userDetails]);

  const onChangeHandler = (event) => {
    const target = event.target;
    setTab(target.value);
  };

  return (
    <div>
      <div className="flex flex-col justify-center align-middle items-center">
        <h2 className="text-6xl font-bold my-4">Admin Dashboard</h2>
        {/* <p>Authority Level - {currentAdmin.data.permissions} </p> */}
        <p className="text-xl my-2">Authority Level - Admin </p>
        <p className="text-xl font-semibold text-warning  my-2">
          All changes made will be recorded along with your admin ID
        </p>
        {/* <h3>Welcome {currentAdmin.data.firstName}</h3> */}
        <h3 className="text-3xl my-4">Welcome Admin</h3>
        <div className="flex flex-col mb-6">
          <label className="mb-2 text-lg">Choose management system</label>
          <select onChange={onChangeHandler} className="select-md ring-2">
            <option value="" disabled>
              -Select an opinion-
            </option>
            <option value="Users">Users</option>
            <option value="Stores">Stores</option>
            <option value="Inventories">Inventories</option>
            <option value="Reports">Reports</option>
          </select>
        </div>
        {tab === "Users" && <AdminUserControl />}
        {tab === "Stores" && <AdminStoreControl setToasts={setToasts} />}
        {tab === "Inventories" && (
          <AdminInventoryControl setToasts={setToasts} />
        )}
      </div>
    </div>
  );
};
export default AdminDashBoard;
