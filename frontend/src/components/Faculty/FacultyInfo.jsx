// src/components/Faculty/FacultyInfo.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function FacultyInfo() {
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/faculty/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile. " + (err.response?.data?.detail || "Server error."));
      }
    }
    fetchProfile();
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="faculty-container">
      <h2>My Profile</h2>
      <ul className="faculty-profile">
        <li><strong>ID:</strong> {profile.faculty_id}</li>
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Email:</strong> {profile.email}</li>
        <li><strong>Phone:</strong> {profile.phone}</li>
        <li><strong>Joining Year:</strong> {profile.joining_year}</li>
      </ul>
    </div>
  );
}
