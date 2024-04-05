import { useParams } from "react-router-dom";
import { useState } from "react";

export default function BucketItemDetail({
  bucketList,
  errorMessage,
  handleEditItem,
  handleDeleteItem
}) {
  const { id } = useParams();
  console.log("Bucket List Item ID = ", id);

  // Find the item matching the given id
  const bucketItem =
    bucketList && bucketList.length > 0
      ? bucketList.find((item) => item.id === parseInt(id))
      : null;

  // Edit Mode = Form to Update the Item
  const [isEditMode, setEditMode] = useState(false);
  
  // Used as object of the form and to send to API
  const itemToUpdate = { ...bucketItem };

  // Update itemToUpdate when title changes
  const onTitleChange = (event) => {
    event.preventDefault();
    itemToUpdate.title = event.target.value;
  };

  // Update itemToUpdate when risklevel changes
  const onRiskChange = (event) => {
    event.preventDefault();
    itemToUpdate.risklevel = event.target.value;
  };

  // Update itemToUpdate when done-status changes
  const onStatusChange = (event) => {
    console.log("onStatusChange: status = ", event.target.checked);
    itemToUpdate.done = event.target.checked;
  };

  // Toggle Edit Mode between Edit button and Cancel button
  const handleEditBtnToggle = (event) => {
    event.preventDefault();
    setEditMode(!isEditMode);
  };

  // Toggle the Edit Mode, before sending the form data for Update API.
  const handleFormSubmit = (event, itemToUpdate) => {
    event.preventDefault();
    handleEditBtnToggle(event);
    handleEditItem(event, itemToUpdate);
  }

  // Get item to delete and sent to API
  const handleDeleteBtnClick = (event) => {
    event.preventDefault();
    handleDeleteItem(event, itemToUpdate);
  }

  // If Item with matching ID is NOT found.
  if (!bucketItem) {
    return (
      <>
        <p>Details for Bucket Item with ID {id} Not Found.</p>
        <em>{errorMessage || ""}</em>
      </>
    );
  }

  // Edit Mode: Show the Form to Update the Item
  if (isEditMode) {
    return (
      <form onSubmit={(e) => handleFormSubmit(e, itemToUpdate)}>
        <dl>
          <dt>
            <label htmlFor="title">Title:</label>
          </dt>
          <dd>
            <input
              type="text"
              name="title"
              defaultValue={itemToUpdate.title}
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
              defaultValue={itemToUpdate.risklevel.toUpperCase()}
              onChange={onRiskChange}
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
              defaultChecked={itemToUpdate.done}
              onChange={onStatusChange}
            />
          </dd>
          <br />
        </dl>
        <button type="submit">Update</button>&nbsp;
        <button type="reset">Reset</button>&nbsp;
        <button onClick={handleEditBtnToggle}>Cancel</button>&nbsp;&nbsp;
        <button onClick={handleDeleteBtnClick}>Delete Item</button>
      </form>
    );

  } else {
    // When NOT in Edit Mode, Show the Details of the Item
    return (
      <div>
        <dl>
          <dt>Title:</dt>
          <dd>{bucketItem.title}</dd>
          <br />
          <dt>Risk Level:</dt>
          <dd>{bucketItem.risklevel}</dd>
          <br />
          <dt>Done?</dt>
          <dd>{bucketItem.done ? "Done" : "Not Yet!"}</dd>
          <br />
        </dl>
        <button onClick={handleEditBtnToggle}>Edit</button>&nbsp;&nbsp;
        <button onClick={handleDeleteBtnClick}>Delete Item</button>
      </div>
    );
  }
}
