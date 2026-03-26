import { useEffect, useState } from "react";
import { BriefcaseBusiness, CalendarClock, GraduationCap, Mail, Phone } from "lucide-react";
import api from "../../services/api";

export default function FacultyInfo() {
  const [profile, setProfile] = useState(null);
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
  if (!profile) {
    return (
      <div className="faculty-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  const profileItems = [
    { label: "Faculty ID", value: profile.faculty_id, icon: GraduationCap },
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Phone", value: profile.phone, icon: Phone },
    { label: "Joining Year", value: profile.joining_year || "Not available", icon: CalendarClock },
  ];

  return (
    <div className="faculty-profile-page">
      <section className="faculty-profile-hero">
        <div className="faculty-profile-hero__badge">
          <BriefcaseBusiness size={16} />
          <span>Faculty workspace</span>
        </div>

        <div className="faculty-profile-hero__identity">
          <div className="faculty-profile-hero__avatar">
            {profile.name?.charAt(0)?.toUpperCase() || "F"}
          </div>
          <div>
            <h2>{profile.name}</h2>
            <p>Faculty member profile and contact overview</p>
          </div>
        </div>

        <div className="faculty-profile-hero__meta">
          <div>
            <span>Department status</span>
            <strong>Active Faculty</strong>
          </div>
          <div>
            <span>Profile access</span>
            <strong>Verified</strong>
          </div>
        </div>
      </section>

      <section className="faculty-profile-grid">
        {profileItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="faculty-profile-card">
              <div className="faculty-profile-card__icon">
                <Icon size={18} />
              </div>
              <span className="faculty-profile-card__label">{item.label}</span>
              <strong className="faculty-profile-card__value">{item.value}</strong>
            </article>
          );
        })}
      </section>
    </div>
  );
}
