const baseUrl = "http://localhost:3001";

// Function to check response status
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // Check if the response is 401 Unauthorized
  if (res.status === 401) {
    // Clear the token and redirect to login
    localStorage.removeItem("jwt");
    window.location.href = "/login"; // Redirect to login page
    return Promise.reject("Unauthorized access - please log in again.");
  }
  return res.text().then((text) => {
    console.error("Error:", text);
    return Promise.reject(`Error: ${res.status}`);
  });
};

// Function to handle fetch requests with response checking
export const request = (url, options) => {
  return fetch(url, options)
    .then(checkResponse)
    .catch((error) => {
      console.error("Request failed:", error);
      throw error;
    });
};

// Function to add a like to an item
export function addCardLike(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

export function removeCardLike(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

export function getItems() {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
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
