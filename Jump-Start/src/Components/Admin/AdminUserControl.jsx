import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService";

const AdminUserControl = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const response = await AdminService.deleteUser(userId);
      console.log(response);

      viewCustomers();
    }
  };

  const viewCustomers = async () => {
    try {
      const users = await AdminService.getUsers();

      setCustomers(users.customers);
      console.log(users.customers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewCustomers();
  }, []);

  if (customers.length === 0) {
    return <p>No customers found.</p>;
  }
  const handleLink = (path) => {
    navigate(path);
  };
  return (
    <div className="my-8">
      <div className="flex flex-col items-center">
        <button
          className="btn btn-primary my-6"
          onClick={() => handleLink("/admin/customerCreate")}
        >
          Create new customer
        </button>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full shadow-lg">
            <thead>
              <tr>
                <th className="z-0">Customer ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Full Address</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="hover">
                  <th className="z-0">{customer._id}</th>
                  <td>{customer.customerName}</td>
                  <td>{customer.emailAddress}</td>
                  <td>{customer.customerLocation}</td>
                  <td>{customer.customerContact}</td>
                  <td>
                    <div className="flex flex-col items-center">
                      <button className="btn btn-secondary w-24 mb-2">
                        <Link to={`/admin/customerUpdate/${customer._id}`}>
                          Update
                        </Link>
                      </button>
                      <button
                        className="btn btn-error w-24"
                        onClick={() => handleDeleteUser(customer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Customer ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Full Address</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserControl;
