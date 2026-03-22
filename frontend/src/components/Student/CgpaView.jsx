// src/components/Student/CgpaView.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CgpaView() {
  const [cgpa, setCgpa] = useState(null);

  useEffect(() => {
    api.get("/marks/my/cgpa")
      .then(res => setCgpa(res.data.cgpa))
      .catch(() => alert("Failed to fetch CGPA."));
  }, []);

  return (
    <div className="student-container">
      <h2>My CGPA</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Current Academic Score</span>
          <div className="stat-value">{cgpa !== null ? cgpa : "--"}</div>
          <p>{cgpa !== null ? "Your cumulative grade point average is up to date." : "Loading your latest CGPA..."}</p>
        </div>
      </div>
    </div>
  );
}
