from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.models.user_credentials import UserCredentials
from app.models.admin_info import AdminInfo
from app.models.faculty_info import FacultyInfo
from app.models.student_info import StudentInfo
from app.schemas import user_credentials as user_schema
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/user_credentials", tags=["User Credentials"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Create user (Admin only)
@router.post("/", response_model=user_schema.UserCredentialsOut, dependencies=[Depends(get_current_active_user("admin"))])
def create_user(user: user_schema.UserCredentialsCreate, db: Session = Depends(get_db)):
    if db.query(UserCredentials).filter_by(user_id=user.user_id).first():
        raise HTTPException(status_code=409, detail="User ID already exists")

    # Ensure user exists in appropriate table
    if user.role == "student":
        if not db.query(StudentInfo).filter_by(student_id=user.user_id).first():
            raise HTTPException(status_code=404, detail="Student not found")
    elif user.role == "faculty":
        if not db.query(FacultyInfo).filter_by(faculty_id=user.user_id).first():
            raise HTTPException(status_code=404, detail="Faculty not found")
    elif user.role == "admin":
        if not db.query(AdminInfo).filter_by(admin_id=user.user_id).first():
            raise HTTPException(status_code=404, detail="Admin not found")
    else:
        raise HTTPException(status_code=400, detail="Invalid role")

    hashed_password = pwd_context.hash(user.password)
    db_user = UserCredentials(
        user_id=user.user_id,
        password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Get all users (Admin only)
@router.get("/", response_model=list[user_schema.UserCredentialsOut], dependencies=[Depends(get_current_active_user("admin"))])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(UserCredentials).all()


# Update user credentials (Admin only)
@router.put("/{user_id}", response_model=user_schema.UserCredentialsOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_user(user_id: str, user: user_schema.UserCredentialsCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserCredentials).filter_by(user_id=user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.role = user.role
    db_user.password = pwd_context.hash(user.password)

    db.commit()
    db.refresh(db_user)
    return db_user


# Delete user (Admin only)
@router.delete("/{user_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(UserCredentials).filter_by(user_id=user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}
