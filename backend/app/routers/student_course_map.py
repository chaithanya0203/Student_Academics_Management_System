from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student_course_map import StudentCourseMap
from app.schemas.student_course_map import StudentCourseMapCreate, StudentCourseMapOut, StudentCourseMapUpdate
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/student-course-map", tags=["Student-Course Mapping"])

# Enroll student (Admin only)
@router.post("/", response_model=StudentCourseMapOut, dependencies=[Depends(get_current_active_user("admin"))])
def enroll_course(mapping: StudentCourseMapCreate, db: Session = Depends(get_db)):
    db_map = StudentCourseMap(**mapping.dict())
    db.add(db_map)
    db.commit()
    db.refresh(db_map)
    return db_map

# Get all mappings (Open to all roles)
@router.get("/", response_model=list[StudentCourseMapOut])
def get_mappings(db: Session = Depends(get_db)):
    return db.query(StudentCourseMap).all()

# Update mapping (Admin only)
@router.put("/{map_id}", response_model=StudentCourseMapOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_mapping(map_id: int, updates: StudentCourseMapUpdate, db: Session = Depends(get_db)):
    mapping = db.query(StudentCourseMap).filter_by(id=map_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(mapping, key, value)

    db.commit()
    db.refresh(mapping)
    return mapping

# Delete mapping (Admin only)
@router.delete("/{map_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_mapping(map_id: int, db: Session = Depends(get_db)):
    mapping = db.query(StudentCourseMap).filter_by(id=map_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    
    db.delete(mapping)
    db.commit()
    return {"detail": "Mapping deleted successfully"}
