from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.user_credentials import UserCredentials
from app.core import security

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    user_id: str
    password: str

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(UserCredentials).filter(UserCredentials.user_id == request.user_id).first()

    if not user or not security.verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )

    access_token = security.create_access_token(
        data={"sub": user.user_id, "role": user.role}
    )
    return {"access_token": access_token, "token_type": "bearer"}

class ForgotPasswordRequest(BaseModel):
    user_id: str
    new_password: str

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(UserCredentials).filter(UserCredentials.user_id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    hashed_password = security.hash_password(request.new_password)
    user.password = hashed_password
    db.commit()
    
    return {"message": "Password updated successfully"}

class SignupRequest(BaseModel):
    user_id: str
    email: str
    password: str
    role: str # student or faculty

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    # 1. Check if UserCredentials already exists
    existing_user = db.query(UserCredentials).filter(UserCredentials.user_id == request.user_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User ID already registered. Please login.")

    # 2. Verify against Profile Tables
    from app.models.student_info import StudentInfo
    from app.models.faculty_info import FacultyInfo

    if request.role == "student":
        student = db.query(StudentInfo).filter_by(student_id=request.user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student ID not found in records. Contact Admin.")
        if student.email != request.email:
             # Check if email matches records (optional security measure, good to have)
             # But if student email is null in record, maybe allow? 
             # For now, let's enforce email match if record has email.
             if student.email and student.email != request.email:
                 raise HTTPException(status_code=400, detail="Email does not match our records.")
    
    elif request.role == "faculty":
        faculty = db.query(FacultyInfo).filter_by(faculty_id=request.user_id).first()
        if not faculty:
            raise HTTPException(status_code=404, detail="Faculty ID not found in records. Contact Admin.")
        if faculty.email != request.email:
            if faculty.email and faculty.email != request.email:
                raise HTTPException(status_code=400, detail="Email does not match our records.")
    
    else:
        raise HTTPException(status_code=400, detail="Invalid role for signup.")

    # 3. Create Credentials
    hashed_password = security.hash_password(request.password)
    new_user = UserCredentials(
        user_id=request.user_id,
        role=request.role,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()

    return {"message": "Signup successful. You can now login."}
