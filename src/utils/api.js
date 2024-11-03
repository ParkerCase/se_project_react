const baseUrl = "http://localhost:3001";

// Function to check response status
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Function to handle fetch requests with response checking
export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// Function to get items
export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (!res.ok) {
        // Log the response if it's not OK to see the exact error
        return res.text().then((text) => {
          console.error("Failed to fetch items:", text);
          throw new Error(`Failed to fetch items: ${res.status}`);
        });
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
    });
}

// Function to add a like to an item
export function addCardLike(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Function to remove a like from an item
export function removeCardLike(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Function to add a new item
export function addItem(newItem) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
}

// Function to delete a clothing item by ID
export function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
