/**
 * All API/Data functions
 */

const baseUrl = "http://localhost:3001/api/bucketlist";

export async function getBucketListFromApi() {
  console.log("Loading full BucketList from API");
  const response = await fetch(baseUrl);
  const data = await response.json();

  console.log("Bucket List Data From API = ", data);

  const bucketList = data && data.length > 0 ? data : [];
  const errorMessage = data && data.message ? data.message : "";

  return { bucketList, errorMessage };
}

export async function updateBucketListItem(itemToUpdate) {
  console.log("Updating BucketList Item: ", itemToUpdate);
  const id = itemToUpdate.id;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemToUpdate),
  };

  try {
    const response = await fetch(
        `${baseUrl}/${id}`,
      options
    );
    const data = await response.json();
    console.log(`Bucket List Item (id: ${id}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Bucket List Item (id: ${id}): `, error);
    return error;
  }
}

export async function deleteBucketListItem(id) {
  console.log("Deleting BucketList Item with ID: ", id);
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  };

  try {
    const response = await fetch(
      `${baseUrl}/${id}`,
      options
    );
    const data = await response.json();
    console.log("BucketList Item Delete Response: ", data);

  } catch (error) {
    console.log(`Error deleting Bucket List Item (id: ${id}): `, error);
  }
}

export async function createNewBucketListItem(newItem) {
    console.log("Creating new BucketList Item: ", newItem);
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    };

    try {
        const response = await fetch(`${baseUrl}`, options);
        const data = await response.json();
        console.log("BucketList Item Create Response: ", data);

    } catch(error) {
        console.log(`Error creating new BucketList Item with Title: ${newItem.title}`, error);
    }
}