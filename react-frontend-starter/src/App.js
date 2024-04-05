import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import {
  createNewBucketListItem,
  getBucketListFromApi,
  updateBucketListItem,
  deleteBucketListItem,
} from "./bucketlist_api";
import Home from "./Home";
import About from "./About";
import BucketList from "./BucketList";
import BucketItemDetail from "./BucketItemDetail";
import AddBucketItem from "./AddBucketItem";

export default function App() {
  const [bucketList, setBucketList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // GET BucketList from API
  async function getBucketList() {
    const bucketListData = await getBucketListFromApi();
    setBucketList(bucketListData.bucketList);
    setErrorMessage(bucketListData.errorMessage);
  }

  useEffect(() => {
    getBucketList();
  }, []);

  // When BucketList Item is Updated, make PUT call then make GET call to refresh data.
  async function handleEditItem(event, itemToUpdate) {
    event.preventDefault();
    console.log("item for update = ", itemToUpdate);

    const response = await updateBucketListItem(itemToUpdate);
    console.log("Update response = ", response);

    getBucketList();
  }

  // When New Item is added, make POST call then make GET call to refresh data.
  async function handleAddItem(event, itemToAdd) {
    event.preventDefault();
    console.log("item for add = ", itemToAdd);

    const response = await createNewBucketListItem({ ...itemToAdd, userid: 1 });
    console.log("POST Call response = ", response);

    getBucketList();
    navigate("/bucketlist");
  }

  // Delete Item Handler
  async function handleDeleteItem(event, itemToDelete) {
    event.preventDefault();
    console.log("item to delete = ", itemToDelete);

    const response = await deleteBucketListItem(itemToDelete.id);
    console.log("DELETE Call response = ", response);

    getBucketList();
    navigate("/bucketlist");
  }

  return (
    <>
      <div>
        <h1>BucketList</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/bucketlist">View BucketList</Link>
            </li>
            <li>
              <Link to="/bucketlist/new">Add New BucketList Item</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/bucketlist"
          element={
            <BucketList bucketList={bucketList} errorMessage={errorMessage} />
          }
        />
        <Route
          path="/bucketlist/:id"
          element={
            <BucketItemDetail
              bucketList={bucketList}
              errorMessage={errorMessage}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
            />
          }
        />
        <Route
          path="/bucketlist/new"
          element={<AddBucketItem handleAddItem={handleAddItem} />}
        />
      </Routes>
    </>
  );
}
