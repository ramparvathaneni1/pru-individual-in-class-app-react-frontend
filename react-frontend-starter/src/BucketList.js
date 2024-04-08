import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BucketList({
  bucketList,
  errorMessage,
  markAllDoneBtnClick,
  markAllPendingBtnClick
}) {
  console.log("BucketList:: bucketList = ", bucketList);
  console.log("BucketList:: errorMessage = ", errorMessage);

  const [filteredList, setFilteredList] = useState(bucketList);

  console.log("BucketList:: filteredList = ", filteredList);

  // Apply filters
  const applyFilters = (event) => {
    event.preventDefault();
    const title = event.target.form.title.value;
    const risklevel = event.target.form.risklevel.value;
    const status = event.target.form.status.value;

    console.log(
      `BucketList::Applying Filters: `, {title, risklevel, status}
    );

    // Filter all the Bucket List items based on filter form values
    setFilteredList(
      bucketList.filter(
        (item) =>
          (!title || item.title.toLowerCase().includes(title.toLowerCase())) &&
          (!risklevel ||
            item.risklevel.toUpperCase() === risklevel.toUpperCase()) &&
          (!status ||
            item.done.toLocaleString().toLowerCase() === status.toLowerCase())
      )
    );
  };

  // Reset Filters
  const onResetBtnClick = (event) => {
    console.log("Filters Reset Button Clicked");
    setFilteredList(bucketList);
  };

  useEffect(() => {
    setFilteredList(bucketList);
  }, [bucketList]);

  return (
    <>
      <Filters applyFilters={applyFilters} onResetBtnClick={onResetBtnClick} />
      {errorMessage ? <p>{errorMessage}</p> : <ItemList items={filteredList} />}
      <br />
      <button name="all-pending-btn" onClick={markAllPendingBtnClick}>
        Mark All Pending!
      </button>
      &nbsp;&nbsp;
      <button name="all-done-btn" onClick={markAllDoneBtnClick}>
        Mark All Done!
      </button>
    </>
  );
}

function Filters({ applyFilters, onResetBtnClick }) {
  return (
    <div>
      <form name="filterForm">
        <h4>Filters:</h4>
        <label htmlFor="title">
          Title &nbsp;
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Filter by Title"
            onChange={applyFilters}
          />
        </label>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="risklevel">
          Risk &nbsp;
          <select id="risklevel" name="risklevel" onChange={applyFilters}>
            <option default value="">
              Any
            </option>
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="status">
          Status?&nbsp;
          <select id="status" name="status" onChange={applyFilters}>
            <option default value="">
              All
            </option>
            <option value="true">Done</option>
            <option value="false">Not Yet</option>
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;
        <button type="reset" onClick={onResetBtnClick}>Reset</button>
      </form>
    </div>
  );
}

function ItemList({ items }) {
  return (
    <>
      <h2>Things to do:</h2>
      {items.length <= 0 ? (
        <p>No Items Found Matching Filter Criteria</p>
      ) : (
        <>
        <table>
          <thead>
            <tr>
              <th>&nbsp;&nbsp;Title&nbsp;&nbsp;</th>
              <th>&nbsp;&nbsp;Risk Level&nbsp;&nbsp;</th>
              <th>&nbsp;&nbsp;Done?&nbsp;&nbsp;</th>
              <th>&nbsp;&nbsp;View / Edit&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td><center>{item.risklevel}</center></td>
                <td><center>{item.done ? "Done!" : "Not Yet!"}</center></td>
                <td><center>
                  <Link to={"/bucketlist/" + item.id}>
                    <em>View/Edit</em>
                  </Link></center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </>
  );
}
