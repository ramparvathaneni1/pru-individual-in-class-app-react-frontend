import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BucketList({ bucketList, errorMessage }) {
  console.log("BucketList:: bucketList = ", bucketList);
  console.log("BucketList:: errorMessage = ", errorMessage);

  const [filteredList, setFilteredList] = useState(bucketList);

  console.log("BucketList:: filteredList = ", filteredList);

  const applyFilters = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const risklevel = event.target.elements.risklevel.value;
    const status = event.target.elements.status.value;

    console.log(
      `Filters: title = ${title}, risklevel = ${risklevel}, status = ${status}`
    );

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

  useEffect(() => {
    setFilteredList(bucketList);
  }, [bucketList]);

  return (
    <>
      <Filters applyFilters={applyFilters} />
      {errorMessage ? <p>{errorMessage}</p> : <ItemList items={filteredList} />}
    </>
  );
}

function Filters({ applyFilters }) {
  return (
    <div>
      <form name="filterForm" onSubmit={applyFilters}>
        <h4>Filters:</h4>
        <label htmlFor="title">
          Title &nbsp;
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Filter by Title"
          />
        </label>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="risklevel">
          Risk &nbsp;
          <select id="risklevel" name="risklevel">
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
          <select id="status" name="status">
            <option default value="">
              All
            </option>
            <option value="true">Done</option>
            <option value="false">Not Yet</option>
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;
        <button type="reset">Reset</button>&nbsp;&nbsp;
        <button type="submit">Apply</button>
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
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title}
              &nbsp;
              <Link to={"/bucketlist/" + item.id}>
                <em>View/Edit</em>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
