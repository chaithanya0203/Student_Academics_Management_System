from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.student_info import StudentCreate, StudentOut, StudentUpdate
from app.models.student_info import StudentInfo
from app.models.user_credentials import UserCredentials
from app.database import get_db
from app.database import get_db
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/student", tags=["Student"])

# POST: Create Student (Admin only)
@router.post("/", response_model=StudentOut, dependencies=[Depends(get_current_active_user("admin"))])
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    if not student.student_id:
        # Auto-generate ID
        last_student = db.query(StudentInfo).order_by(StudentInfo.student_id.desc()).first()
        if last_student and last_student.student_id.isdigit():
            new_id = int(last_student.student_id) + 1
        else:
            new_id = 100101
        student.student_id = str(new_id)

    existing_student = db.query(StudentInfo).filter_by(student_id=student.student_id).first()
    if existing_student:
        raise HTTPException(status_code=400, detail="Student ID already exists")

    new_student = StudentInfo(**student.dict())
    db.add(new_student)
    
    # NOTE: We DO NOT create UserCredentials here anymore.
    # The student must sign up themselves.

    db.commit()
    db.refresh(new_student)
    return new_student

# GET all students (Admin only)
@router.get("/", response_model=list[StudentOut], dependencies=[Depends(get_current_active_user("admin"))])
def get_all_students(db: Session = Depends(get_db)):
    return db.query(StudentInfo).all()

# GET single student by ID (Admin only)
@router.get("/{student_id}", response_model=StudentOut, dependencies=[Depends(get_current_active_user("admin"))])
def get_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(StudentInfo).filter_by(student_id=student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# PUT update student info (Admin only)
@router.put("/{student_id}", response_model=StudentOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_student(student_id: str, updated_data: StudentUpdate, db: Session = Depends(get_db)):
    student = db.query(StudentInfo).filter_by(student_id=student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(student, field, value)

    db.commit()
    db.refresh(student)
    return student

# DELETE student (Admin only)
@router.delete("/{student_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(StudentInfo).filter_by(student_id=student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Remove credentials too
    db.query(UserCredentials).filter_by(user_id=student_id).delete()
    db.delete(student)
    db.commit()
    return {"detail": "Student deleted successfully"}
