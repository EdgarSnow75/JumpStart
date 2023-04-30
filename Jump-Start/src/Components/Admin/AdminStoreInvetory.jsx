import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoreService from "../../services/StoreService";

const AdminInventoryControl = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleDeleteItem = async (itemID) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const response = await StoreService.deleteItem(itemID);
      console.log(response);

      viewItems();
    }
  };

  const viewItems = async () => {
    try {
      const items = await StoreService.getItems();

      setItems(items);
      console.log(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewItems();
  }, []);

  if (items.length === 0) {
    return <p>No items found.</p>;
  }

  const handleLink = (path) => {
    navigate(path);
  };

  return (
    <div className="my-8">
      <div className="flex flex-col items-center">
        <button
          className="btn btn-primary my-6"
          onClick={() => handleLink("/items/newItem")}
        >
          Add a new item
        </button>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full shadow-lg whitespace-pre-wrap">
            <thead>
              <tr>
                <th className="z-0">Item ID</th>
                <th>Store ID</th>
                <th>Item Name</th>
                <th>Item Image</th>
                <th>Item Description</th>
                <th>Item Category</th>
                <th>Item Price</th>
                <th>Item Stock</th>
                <th>Item Restock Count</th>
                <th>Item Restock Status</th>
                <th>Last Restocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="hover">
                  <th className="z-0">{item._id}</th>
                  <td>{item.storeID}</td>
                  <td className="whitespace-pre-wrap">{item.itemName}</td>
                  <td>
                    <img src={item.itemImg} />
                  </td>
                  <td className="whitespace-pre-wrap">{item.itemDesc}</td>
                  <td>{item.itemCategory}</td>
                  <td>$ {item.itemPrice}</td>
                  <td>{item.itemStock}</td>
                  <td>{item.itemRestockCount}</td>
                  <td>
                    {item.restockStatus
                      ? "Need to Restock"
                      : "No Need to Restock"}
                  </td>

                  <td>{item.updatedAt}</td>
                  <td>
                    <div className="flex flex-col items-center">
                      <button className="btn btn-secondary w-24 mb-2">
                        <Link to={`/item/itemUpdate/${item._id}`}>Update</Link>
                      </button>
                      <button
                        className="btn btn-error w-24"
                        onClick={() => handleDeleteItem(item._id)}
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
                <th>Item ID</th>
                <th>Store ID</th>
                <th>Item Name</th>
                <th>Item Image</th>
                <th>Item Description</th>
                <th>Item Category</th>
                <th>Item Price</th>
                <th>Item Stock</th>
                <th>Item Restock Count</th>
                <th>Item Restock Status</th>
                <th>Last Restocked</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryControl;
