import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoreService from "../../services/StoreService";

const AdminStoreControl = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const handleDeleteStore = async (storeID) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      const response = await StoreService.deleteStore(storeID);
      console.log(response);

      viewStores();
    }
  };

  const viewStores = async () => {
    try {
      const stores = await StoreService.getStores();

      setStores(stores);
      console.log(stores);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewStores();
  }, []);

  if (stores.length === 0) {
    return <p>No stores found.</p>;
  }

  const handleLink = (path) => {
    navigate(path);
  };

  return (
    <div className="my-8">
      <div className="flex flex-col items-center">
        <button
          className="btn btn-primary my-6"
          onClick={() => handleLink("/store/newStore")}
        >
          Create new store
        </button>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full shadow-lg">
            <thead>
              <tr>
                <th className="z-0">Store ID</th>
                <th>Store Name</th>
                <th>Store Location</th>
                <th>Inventory</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store._id} className="hover">
                  <th className="z-0">{store._id}</th>
                  <td>{store.storeName}</td>
                  <td>{store.storeLocation}</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.inventory.map((item) => (
                          <tr key={item._id}>
                            <td className="whitespace-pre-wrap">
                              {item.itemName}
                            </td>
                            <td>{item.itemStock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <div className="flex flex-col items-center">
                      <button className="btn btn-secondary w-40 mb-2">
                        <Link to={`/store/inventory/${store._id}`}>
                          Update Inventory
                        </Link>
                      </button>
                      <button className="btn btn-secondary w-30 mb-2">
                        <Link to={`/store/update/${store._id}`}>
                          Update Store
                        </Link>
                      </button>
                      <button
                        className="btn btn-error w-24"
                        onClick={() => handleDeleteStore(store._id)}
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
                <th>Store ID</th>
                <th>Store Name</th>
                <th>Store Location</th>
                <th>Inventory</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreControl;
