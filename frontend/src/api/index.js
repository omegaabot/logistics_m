import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090"
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 Handle errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      alert("Session expired. Login again.");
      localStorage.clear();
      window.location.href = "/";
    }

    if (err.response?.status === 403) {
      alert("Access Denied 🚫");
    }

    return Promise.reject(err);
  }
);

export default API;