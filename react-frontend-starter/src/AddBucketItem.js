export default function AddItem({ handleAddItem }) {
  const itemToAdd = { title: "", risklevel: "L", done: false };

  // Update itemToAdd when title changes
  const onTitleChange = (event) => {
    event.preventDefault();
    itemToAdd.title = event.target.value;
  };

  // Update itemToAdd when risklevel changes
  const onRiskChange = (event) => {
    event.preventDefault();
    itemToAdd.risklevel = event.target.value;
  };

  // Update itemToAdd when done-status changes
  const onStatusChange = (event) => {
    itemToAdd.done = event.target.checked;
  };

  // Navigate to /bucketlist, after sending the form data for Add API.
  const handleFormSubmit = (event, itemToUpdate) => {
    event.preventDefault();
    handleAddItem(event, itemToUpdate);
  };

  return (
    <>
      <h2>Add New BucketList Item</h2>
      <form onSubmit={(e) => handleFormSubmit(e, itemToAdd)}>
        <dl>
          <dt>
            <label htmlFor="title">Title:</label>
          </dt>
          <dd>
            <input
              type="text"
              name="title"
              placeholder="What do you want to do?"
              required
              onChange={onTitleChange}
            />
          </dd>
          <br />
          <dt>
            <label htmlFor="risklevel">Risk Level:</label>
          </dt>
          <dd>
            <select
              id="risklevel"
              name="risklevel"
              onChange={onRiskChange}
              defaultValue="L"
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="H">High</option>
            </select>
          </dd>
          <br />
          <dt>
            <label htmlFor="status">Done?</label>
          </dt>
          <dd>
            <input
              type="checkbox"
              id="status"
              name="status"
              onChange={onStatusChange}
            />
          </dd>
          <br />
        </dl>
        <button type="submit">Add</button>&nbsp;
        <button type="reset">Reset</button>&nbsp;
        <a href="/bucketlist">Cancel</a>
      </form>
    </>
  );
}
