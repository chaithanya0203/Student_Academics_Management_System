// src/pages/FacultyPage.jsx
import { useState } from "react";
import SidebarFaculty from "../components/Faculty/SidebarFaculty";
import AttendanceRecords from "../components/Faculty/AttendanceRecords";
import MarksRecords from "../components/Faculty/MarksRecords";
import FacultyInfo from "../components/Faculty/FacultyInfo";
import "../styles/dashboard-faculty.css";
import DashboardLayout from "../components/common/DashboardLayout";

export default function FacultyPage() {
  const [view, setView] = useState("attendance");

  const components = {
    attendance: <AttendanceRecords />,
    marks: <MarksRecords />,
    profile: <FacultyInfo />,
  };

  return (
    <DashboardLayout
      title="Faculty Dashboard"
      subtitle="Review classroom attendance, update marks, and keep your academic data organized."
      sidebar={({ isSidebarOpen, closeSidebar }) => (
        <SidebarFaculty
          activeItem={view}
          setComponent={setView}
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
      )}
    >
      <div className="faculty-content">{components[view]}</div>
    </DashboardLayout>
  );
}
