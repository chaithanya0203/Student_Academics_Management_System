from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.section_course_map import SectionCourseMap
from app.schemas.section_course_map import SectionCourseMapCreate, SectionCourseMapOut, SectionCourseMapUpdate
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/section-course-map", tags=["Section-Course Map"])

# Create (Admin only)
@router.post("/", response_model=SectionCourseMapOut, dependencies=[Depends(get_current_active_user("admin"))])
def create_map(mapping: SectionCourseMapCreate, db: Session = Depends(get_db)):
    db_map = SectionCourseMap(**mapping.dict())
    db.add(db_map)
    db.commit()
    db.refresh(db_map)
    return db_map

# Read all (Open to all roles)
@router.get("/", response_model=list[SectionCourseMapOut])
def list_all(db: Session = Depends(get_db)):
    return db.query(SectionCourseMap).all()

# Update (Admin only)
@router.put("/{map_id}", response_model=SectionCourseMapOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_mapping(map_id: int, update_data: SectionCourseMapUpdate, db: Session = Depends(get_db)):
    mapping = db.query(SectionCourseMap).filter_by(id=map_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")

    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(mapping, key, value)

    db.commit()
    db.refresh(mapping)
    return mapping

# Delete (Admin only)
@router.delete("/{map_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_mapping(map_id: int, db: Session = Depends(get_db)):
    mapping = db.query(SectionCourseMap).filter_by(id=map_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")

    db.delete(mapping)
    db.commit()
    return {"detail": "Mapping deleted"}
