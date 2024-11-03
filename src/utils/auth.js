export function signup({ name, avatar, email, password }) {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export function signin({ email, password }) {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export function checkToken(token) {
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export function updateProfile(token, { name, avatar }) {
  return fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
