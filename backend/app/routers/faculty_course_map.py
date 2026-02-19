from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.faculty_course_map import FacultyCourseMap
from app.schemas.faculty_course_map import FacultyCourseMapCreate, FacultyCourseMapOut
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/faculty-course-map", tags=["Faculty-Course Mapping"])

# Create a new faculty-course-section assignment (Admin only)
@router.post("/", response_model=FacultyCourseMapOut, dependencies=[Depends(get_current_active_user("admin"))])
def assign_course(mapping: FacultyCourseMapCreate, db: Session = Depends(get_db)):
    db_map = FacultyCourseMap(**mapping.dict())
    db.add(db_map)
    db.commit()
    db.refresh(db_map)
    return db_map

# Get all mappings (Admin only)
@router.get("/", response_model=list[FacultyCourseMapOut], dependencies=[Depends(get_current_active_user("admin"))])
def get_all_mappings(db: Session = Depends(get_db)):
    return db.query(FacultyCourseMap).all()

# Get mappings by faculty ID (Admin + Faculty)
@router.get("/{faculty_id}", response_model=list[FacultyCourseMapOut], dependencies=[Depends(get_current_active_user("faculty"))])
def get_mappings_by_faculty(faculty_id: str, db: Session = Depends(get_db)):
    mappings = db.query(FacultyCourseMap).filter(FacultyCourseMap.faculty_id == faculty_id).all()
    return mappings

# Delete a specific mapping (Admin only)
@router.delete("/{mapping_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_mapping(mapping_id: int, db: Session = Depends(get_db)):
    mapping = db.query(FacultyCourseMap).filter(FacultyCourseMap.id == mapping_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    db.delete(mapping)
    db.commit()
    return {"detail": "Mapping deleted"}
