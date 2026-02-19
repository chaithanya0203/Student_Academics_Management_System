from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.course_catalog import CourseCatalog
from app.schemas.course_catalog import CourseCreate, CourseOut, CourseUpdate
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/courses", tags=["Courses"])

# Create Course (Admin only)
@router.post("/", response_model=CourseOut, dependencies=[Depends(get_current_active_user("admin"))])
def add_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = CourseCatalog(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

# Read all Courses (Open to all roles)
@router.get("/", response_model=list[CourseOut])
def get_courses(db: Session = Depends(get_db)):
    return db.query(CourseCatalog).all()

# Update Course (Admin only)
@router.put("/{course_id}", response_model=CourseOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_course(course_id: str, update_data: CourseUpdate, db: Session = Depends(get_db)):
    course = db.query(CourseCatalog).filter_by(course_id=course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(course, key, value)

    db.commit()
    db.refresh(course)
    return course

# Delete Course (Admin only)
@router.delete("/{course_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_course(course_id: str, db: Session = Depends(get_db)):
    course = db.query(CourseCatalog).filter_by(course_id=course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    db.delete(course)
    db.commit()
    return {"detail": "Course deleted"}
