import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import (
    admin_info,
    attendance_records,
    auth,
    course_catalog,
    email_alerts,
    faculty_course_map,
    faculty_info,
    marks_records,
    section,
    section_course_map,
    stats,
    student_course_map,
    student_info,
    user_credentials,
)

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Academics Management System")

cors_origins_raw = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)
origins = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
