from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import (
    admin_info,
    auth,
    faculty_info,
    student_info,
    section,
    email_alerts,
    course_catalog,
    faculty_course_map,
    student_course_map,
    marks_records,
    attendance_records,
    section_course_map,
    user_credentials,
    section_course_map,
    user_credentials,
    stats,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Academics Management System")

origins = ["*"]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

app.include_router(admin_info.router)
app.include_router(auth.router)
app.include_router(faculty_info.router)
app.include_router(student_info.router)
app.include_router(section.router)
app.include_router(course_catalog.router)
app.include_router(faculty_course_map.router)
app.include_router(student_course_map.router)
app.include_router(marks_records.router)
app.include_router(attendance_records.router)
app.include_router(user_credentials.router)
app.include_router(section_course_map.router)
app.include_router(email_alerts.router)
app.include_router(stats.router)