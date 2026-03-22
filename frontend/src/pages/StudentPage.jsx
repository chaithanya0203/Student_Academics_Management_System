// src/pages/StudentPage.jsx
import { useState } from "react";
import SidebarStudent from "../components/Student/SidebarStudent";
import AttendanceView from "../components/Student/AttendanceView";
import MarksView from "../components/Student/MarksView";
import CgpaView from "../components/Student/CgpaView";
import "../styles/dashboard-student.css";
import DashboardLayout from "../components/common/DashboardLayout";

export default function StudentPage() {
  const [view, setView] = useState("attendance");

  const views = {
    attendance: <AttendanceView />,
    marks: <MarksView />,
    cgpa: <CgpaView />,
  };

  return (
    <DashboardLayout
      title="Student Dashboard"
      subtitle="Track your attendance, results, and academic performance with a cleaner portal experience."
      sidebar={({ isSidebarOpen, closeSidebar }) => (
        <SidebarStudent
          activeItem={view}
          setComponent={setView}
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
      )}
    >
      <div className="student-content">{views[view]}</div>
    </DashboardLayout>
  );
}
