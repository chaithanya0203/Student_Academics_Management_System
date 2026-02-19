from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.attendance_records import AttendanceRecords
from app.schemas.attendance_records import AttendanceCreate, AttendanceOut, AttendanceUpdate
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/attendance", tags=["Attendance"])

# POST: Mark attendance (Faculty only)
@router.post("/", response_model=AttendanceOut, dependencies=[Depends(get_current_active_user("faculty"))])
def mark_attendance(entry: AttendanceCreate, db: Session = Depends(get_db)):
    record = AttendanceRecords(**entry.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

# GET: Filter by section, course, date (Faculty only)
@router.get("/", response_model=list[AttendanceOut], dependencies=[Depends(get_current_active_user(["faculty", "admin"]))])
def get_attendance_records(
    section_id: Optional[str] = None,
    course_id: Optional[str] = None,
    date: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(AttendanceRecords)
    if section_id:
        query = query.filter(AttendanceRecords.section_id == section_id)
    if course_id:
        query = query.filter(AttendanceRecords.course_id == course_id)
    if date:
        query = query.filter(AttendanceRecords.date == date)
    return query.all()

# PUT: Update record (Faculty only)
@router.put("/{record_id}", response_model=AttendanceOut, dependencies=[Depends(get_current_active_user("faculty"))])
def update_attendance(record_id: int, update_data: AttendanceUpdate, db: Session = Depends(get_db)):
    record = db.query(AttendanceRecords).filter_by(id=record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(record, key, value)

    db.commit()
    db.refresh(record)
    return record

# DELETE: Delete record (Admin only)
@router.delete("/{record_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_attendance(record_id: int, db: Session = Depends(get_db)):
    record = db.query(AttendanceRecords).filter_by(id=record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(record)
    db.commit()
    return {"detail": "Attendance record deleted"}

# GET (new): Student views their own attendance
@router.get("/my", response_model=list[AttendanceOut])
def get_my_attendance(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user("student"))
):
    student_id = current_user["sub"]
    return db.query(AttendanceRecords).filter(AttendanceRecords.student_id == student_id).all()
