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
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {cgpa !== null ? `CGPA: ${cgpa}` : "Loading..."}
      </p>
    </div>
  );
}
