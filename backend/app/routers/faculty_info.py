from fastapi import APIRouter, Depends, HTTPException  # type: ignore
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.schemas.faculty_info import FacultyCreate, FacultyOut, FacultyUpdate
from app.models.faculty_info import FacultyInfo
from app.models.attendance_records import AttendanceRecords
from app.models.marks_records import MarksRecords
from app.models.faculty_course_map import FacultyCourseMap
from app.models.user_credentials import UserCredentials
from app.database import get_db
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/faculty", tags=["Faculty"])

# GET: Current Faculty Profile
@router.get("/me", response_model=FacultyOut)
def read_users_me(current_user: dict = Depends(get_current_active_user("faculty")), db: Session = Depends(get_db)):
    faculty = db.query(FacultyInfo).filter_by(faculty_id=current_user["sub"]).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty profile not found")
    return faculty

# POST: Create Faculty (Admin only)
@router.post("/", response_model=FacultyOut, dependencies=[Depends(get_current_active_user("admin"))])
def create_faculty(faculty: FacultyCreate, db: Session = Depends(get_db)):
    if not faculty.faculty_id:
        # Auto-generate ID
        last_faculty = db.query(FacultyInfo).order_by(FacultyInfo.faculty_id.desc()).first()
        if last_faculty and last_faculty.faculty_id.isdigit():
            new_id = int(last_faculty.faculty_id) + 1
        else:
            new_id = 101
        faculty.faculty_id = str(new_id)

    existing_faculty = db.query(FacultyInfo).filter_by(faculty_id=faculty.faculty_id).first()
    if existing_faculty:
        raise HTTPException(status_code=400, detail="Faculty ID already exists")

    new_faculty = FacultyInfo(**faculty.dict())
    db.add(new_faculty)
    
    # NOTE: We DO NOT create UserCredentials here anymore.
    # The faculty must sign up themselves.

    db.commit()
    db.refresh(new_faculty)
    return new_faculty

# GET: All faculty (Admin only)
@router.get("/", response_model=list[FacultyOut], dependencies=[Depends(get_current_active_user("admin"))])
def get_all_faculty(db: Session = Depends(get_db)):
    return db.query(FacultyInfo).all()

# GET: Single faculty (Admin only)
@router.get("/{faculty_id}", response_model=FacultyOut, dependencies=[Depends(get_current_active_user("admin"))])
def get_faculty(faculty_id: str, db: Session = Depends(get_db)):
    faculty = db.query(FacultyInfo).filter_by(faculty_id=faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty

# PUT: Update faculty (Admin only)
@router.put("/{faculty_id}", response_model=FacultyOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_faculty(faculty_id: str, updated_data: FacultyUpdate, db: Session = Depends(get_db)):
    faculty = db.query(FacultyInfo).filter_by(faculty_id=faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(faculty, field, value)

    db.commit()
    db.refresh(faculty)
    return faculty

# DELETE: Faculty + credentials (Admin only)
@router.delete("/{faculty_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_faculty(faculty_id: str, db: Session = Depends(get_db)):
    faculty = db.query(FacultyInfo).filter_by(faculty_id=faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    try:
        db.query(AttendanceRecords).filter_by(faculty_id=faculty_id).delete(synchronize_session=False)
        db.query(MarksRecords).filter_by(faculty_id=faculty_id).delete(synchronize_session=False)
        db.query(FacultyCourseMap).filter_by(faculty_id=faculty_id).delete(synchronize_session=False)
        db.query(UserCredentials).filter_by(user_id=faculty_id).delete(synchronize_session=False)
        db.delete(faculty)
        db.commit()
        return {"detail": "Faculty deleted successfully"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Cannot delete faculty because related academic records still exist."
        )
