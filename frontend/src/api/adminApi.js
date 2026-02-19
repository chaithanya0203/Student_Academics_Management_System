import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchAdmins = () => API.get("/admin");
export const getAdmin = (id) => API.get(`/admin/${id}`);
export const createAdmin = (data) => API.post("/admin", data);
export const updateAdmin = (id, data) => API.put(`/admin/${id}`, data);
export const deleteAdmin = (id) => API.delete(`/admin/${id}`);
