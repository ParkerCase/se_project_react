const baseUrl = "http://localhost:3001";

// Function to check response status
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Function to handle fetch requests with response checking
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Function to get items
export function getItems() {
  return request(`${baseUrl}/items`);
}

// Function to add a new item
export function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

// Function to delete a clothing item by ID
export function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}
