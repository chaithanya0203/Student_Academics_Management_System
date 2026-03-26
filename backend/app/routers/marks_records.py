from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.marks_records import MarksRecords
from app.models.student_info import StudentInfo
from app.schemas.marks_records import MarksCreate, MarksOut, MarksUpdate
from app.utils.cgpa_calculator import compute_cgpa
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/marks", tags=["Marks"])

# POST: Add Marks (Faculty only)
@router.post("/", response_model=MarksOut, dependencies=[Depends(get_current_active_user("faculty"))])
def add_marks(entry: MarksCreate, db: Session = Depends(get_db)):
    record = MarksRecords(**entry.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

# GET: Compute CGPA (Faculty only)
@router.get("/cgpa/{student_id}", dependencies=[Depends(get_current_active_user("faculty"))])
def get_cgpa(student_id: str, db: Session = Depends(get_db)):
    marks = db.query(MarksRecords).filter(MarksRecords.student_id == student_id).all()
    if not marks:
        raise HTTPException(status_code=404, detail="Student or marks not found")
    result = compute_cgpa(marks)
    return {"student_id": student_id, "cgpa": result}

from typing import Optional

# GET: Filter by section & course (Faculty) - Admin can view all
@router.get("/", response_model=list[MarksOut], dependencies=[Depends(get_current_active_user(["faculty", "admin"]))])
def get_marks_by_section_course(
    section_id: Optional[str] = None, 
    course_id: Optional[str] = None, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user(["faculty", "admin"]))
):
    query = db.query(MarksRecords)

    if current_user["role"] == "faculty":
        query = query.filter(MarksRecords.faculty_id == current_user["sub"])

    if section_id:
        query = query.join(StudentInfo, StudentInfo.student_id == MarksRecords.student_id)
        query = query.filter(StudentInfo.section_id == int(section_id))
    if course_id:
        query = query.filter(MarksRecords.course_id == int(course_id))
    return query.all()

# PUT: Update marks (Faculty only)
@router.put("/{record_id}", response_model=MarksOut, dependencies=[Depends(get_current_active_user("faculty"))])
def update_marks(record_id: int, updated_data: MarksUpdate, db: Session = Depends(get_db)):
    record = db.query(MarksRecords).filter_by(id=record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(record, key, value)

    db.commit()
    db.refresh(record)
    return record

# DELETE: Delete marks (Admin only)
@router.delete("/{record_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_marks(record_id: int, db: Session = Depends(get_db)):
    record = db.query(MarksRecords).filter_by(id=record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    db.delete(record)
    db.commit()
    return {"detail": "Marks record deleted"}

# NEW: Student views own marks
@router.get("/my", response_model=list[MarksOut])
def get_my_marks(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user("student"))
):
    student_id = current_user["sub"]
    return db.query(MarksRecords).filter(MarksRecords.student_id == student_id).all()

# NEW: Student views own CGPA
@router.get("/my/cgpa")
def get_my_cgpa(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user("student"))
):
    student_id = current_user["sub"]
    marks = db.query(MarksRecords).filter(MarksRecords.student_id == student_id).all()
    if not marks:
        raise HTTPException(status_code=404, detail="No marks found")
    cgpa = compute_cgpa(marks)
    return {"student_id": student_id, "cgpa": cgpa}
