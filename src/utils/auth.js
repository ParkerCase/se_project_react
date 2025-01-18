import { baseUrl } from "./constants";

export function signup({ name, avatar, email, password }) {
  const payload = { name, avatar, email, password };
  console.log("Sending signup payload:", payload);

  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Signup error:", error);

      // Handle specific errors, such as conflict (409)
      if (error?.message === "Email already exists") {
        alert("An account with this email already exists. Please log in.");
      }
      throw error; // Re-throw the error for upstream handling
    });
}

export function signin({ email, password }) {
  console.log("Attempting signin with:", { email, password });
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("Signin response:", data);
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    })
    .catch((error) => {
      console.error("Signin error:", error);
      throw error;
    });
}

export function checkToken(token) {
  if (!token) {
    return Promise.reject(new Error("Token is missing"));
  }

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const error = await res.json();
      return Promise.reject(error);
    })
    .catch((error) => {
      console.error("Token validation error:", error);
      throw error;
    });
}

export function updateProfile(token, { name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
