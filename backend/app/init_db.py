from app.database import Base, engine

# Import all models so Base.metadata can register them
from app.models import (
    admin_info,
    faculty_info,
    student_info,
    section,
    course_catalog,
    faculty_course_map,
    student_course_map,
    marks_records,
    attendance_records
)

print("🔧 Creating all tables in the database...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")
