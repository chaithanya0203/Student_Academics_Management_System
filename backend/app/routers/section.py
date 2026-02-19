from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.section import Section
from app.schemas.section import SectionCreate, SectionOut, SectionUpdate
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/section", tags=["Section"])

# Create section (Admin only)
@router.post("/", response_model=SectionOut, dependencies=[Depends(get_current_active_user("admin"))])
def add_section(section: SectionCreate, db: Session = Depends(get_db)):
    db_section = Section(**section.dict())
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section

# Read all sections (open to all)
@router.get("/", response_model=list[SectionOut])
def get_sections(db: Session = Depends(get_db)):
    return db.query(Section).all()

# Update section (Admin only)
@router.put("/{section_id}", response_model=SectionOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_section(section_id: str, updates: SectionUpdate, db: Session = Depends(get_db)):
    section = db.query(Section).filter_by(section_id=section_id).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    for key, value in updates.dict(exclude_unset=True).items():
        setattr(section, key, value)

    db.commit()
    db.refresh(section)
    return section

# Delete section (Admin only)
@router.delete("/{section_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_section(section_id: str, db: Session = Depends(get_db)):
    section = db.query(Section).filter_by(section_id=section_id).first()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")

    db.delete(section)
    db.commit()
    return {"detail": "Section deleted"}
