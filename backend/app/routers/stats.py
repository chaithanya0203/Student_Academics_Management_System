from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student_info import StudentInfo
from app.models.faculty_info import FacultyInfo
from app.models.course_catalog import CourseCatalog
from app.models.section import Section
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/stats", tags=["Stats"])

@router.get("/", dependencies=[Depends(get_current_active_user("admin"))])
def get_stats(db: Session = Depends(get_db)):
    return {
        "total_students": db.query(StudentInfo).count(),
        "total_faculty": db.query(FacultyInfo).count(),
        "active_courses": db.query(CourseCatalog).count(),
        "total_sections": db.query(Section).count(),
    }
