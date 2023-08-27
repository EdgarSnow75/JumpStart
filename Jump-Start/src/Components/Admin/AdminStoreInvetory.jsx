import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StoreService from "../../services/StoreService";

const AdminStoreInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState({
    _id: "",
    storeName: "",
    storeLocation: "",
    inventory: [],
  });

  useEffect(() => {
    async function fetchStore() {
      const storeData = await StoreService.getStore(id);

      setItems(storeData);
    }
    fetchStore();
  }, [id]);

  const handleDeleteItem = async (itemID) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const response = await StoreService.deleteItem(itemID);
      console.log(response);
    }
  };

  const handleRestock = async (itemId) => {
    const storeId = id;
    try {
      const response = await StoreService.restockItem(storeId, itemId);
      console.log(response);
      // handle success
    } catch (error) {
      console.log(error);
    }
  };
  // const inputChangeHandler = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;

  //   // For other input types, update the store with the new value
  //   setItems({
  //     ...items,
  //     [name]: value,
  //   });
  // };

  // const viewItems = async () => {
  //   try {
  //     const items = await StoreService.getItems();

  //     setItems(items);
  //     console.log(items);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   viewItems();
  // }, []);

  // if (items.length === 0) {
  //   return <p>No items found.</p>;
  // }

  return (
    <div className="my-8">
      <div className="mb-8 mx-40 pb-6 border-b-4">
        <h2 className="text-center text-4xl">
          Viewing the Inventory of
          <span className="font-bold"> {items.storeName}</span>
        </h2>
      </div>
      <div className="mb-4">
        <h2 className="text-center text-4xl text-warning my-6">
          Items in need of restocking:
        </h2>
        <table className="table table-compact w-full shadow-lg whitespace-pre-wrap">
          <thead>
            <tr>
              <th className="z-0">Item ID</th>
              <th>Item Name</th>
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
            {items.inventory
              .filter((item) => item.restockStatus)
              .map((item) => (
                <tr key={item._id} className="hover">
                  <th className="z-0">{item._id}</th>
                  <td className="whitespace-pre-wrap">{item.itemName}</td>
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
                      <button
                        className="btn btn-secondary w-24 mb-2"
                        onClick={() => handleRestock(item._id)}
                      >
                        Restock
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
        </table>
      </div>
      <div className="flex flex-col items-center mb-6 mt-40">
        <h2 className="text-4xl font-bold">Store Inventory</h2>
        <button
          className="btn btn-primary my-6"
          onClick={() => navigate(`/${items._id}/items/newItem`)}
        >
          Add a new item
        </button>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full shadow-lg whitespace-pre-wrap">
            <thead>
              <tr>
                <th className="z-0">Item ID</th>
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
              {items.inventory.map((item) => (
                <tr key={item._id} className="hover">
                  <th className="z-0">{item._id}</th>
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

export default AdminStoreInventory;
