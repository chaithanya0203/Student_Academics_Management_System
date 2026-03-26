// src/components/admin/UserCredentials.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserCredentials() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    role: "student",
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = async () => {
    try {
      setError("");
      const res = await api.get("/user_credentials/");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load credentials.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      if (editMode) {
        await api.put(`/user_credentials/${formData.user_id}`, formData);
      } else {
        await api.post("/user_credentials/", formData);
      }
      setFormData({ user_id: "", password: "", role: "student" });
      setEditMode(false);
      setSuccess(`Credentials ${editMode ? "updated" : "created"} successfully.`);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save credentials.");
    }
  };

  const handleEdit = (u) => {
    setFormData({ user_id: u.user_id, password: "", role: u.role });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        setError("");
        setSuccess("");
        await api.delete(`/user_credentials/${id}`);
        setSuccess("Credentials deleted successfully.");
        loadUsers();
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to delete credentials.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">User Credentials</h2>
      <p>
        Create credentials only after the matching student, faculty, or admin profile already exists.
      </p>
      {error ? <div className="error-message">{error}</div> : null}
      {success ? <div className="success-message">{success}</div> : null}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
          disabled={editMode}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn-primary">
          {editMode ? "Update" : "Create"}
        </button>
        {editMode && (
          <button type="button" className="btn-cancel" onClick={() => {
            setEditMode(false);
            setFormData({ user_id: "", password: "", role: "student" });
          }}>
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn-secondary" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(u.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
