import {Link} from "react-router-dom";
export default function BucketList({
  bucketList,
  errorMessage
}) {
  console.log("BucketList:: bucketList = ", bucketList);
  console.log("BucketList:: errorMessage = ", errorMessage);

  return (
    <>
      {/* <Filters handleFilterChange={handleFilterChange} /> */}
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
            <h2>Things to do:</h2>
            <ul>
            {bucketList.map((item) => (
                <li key={item.id}>
                    {item.title}
                    &nbsp;
                    <Link to={"/bucketlist/" + item.id}><em>View/Edit</em></Link>
                </li>
              ))}
            </ul>
        </>
      )}
    </>
  );
}

/* function Filters({ handleFilterChange }) {
  return (
    <div>
      <form name="filterForm" onSubmit={handleFilterChange}>
        <h4>Filters:</h4>
        <label htmlFor="title">
          Title{" "}
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Filter by Title"
          />
        </label>
        &nbsp;&nbsp;
        <label htmlFor="risklevel">
          Risk&nbsp;
          <select id="risklevel" name="risklevel">
            <option default value="">
              Any
            </option>
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
          </select>
        </label>
        &nbsp;&nbsp;
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
        &nbsp;&nbsp;
        <button type="reset">Reset</button>&nbsp;&nbsp;
        <button type="submit">Apply</button>
      </form>
    </div>
  );
} */
