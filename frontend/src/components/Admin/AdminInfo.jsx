// src/components/admin/AdminInfo.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard-admin.css";

export default function AdminInfo() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    admin_id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/admin/");
      setAdmins(res.data);
    } catch {
      alert("Failed to load admins.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/admin/${editId}`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      } else {
        await api.post("/admin/", formData);
      }
      setFormData({ admin_id: "", name: "", email: "", phone: "" });
      setEditId(null);
      fetchAdmins();
    } catch {
      alert("Failed to save admin.");
    }
  };

  const startEdit = (admin) => {
    setEditId(admin.admin_id);
    setFormData(admin);
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ admin_id: "", name: "", email: "", phone: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await api.delete(`/admin/${id}`);
        fetchAdmins();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Admin Management</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        {!editId && (
          <input
            name="admin_id"
            placeholder="Admin ID (5 digits)"
            value={formData.admin_id}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary">
          {editId ? "Update" : "Create"}
        </button>
        {editId && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a.admin_id}>
              <td>{a.admin_id}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>
                <button className="btn-secondary" onClick={() => startEdit(a)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(a.admin_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
