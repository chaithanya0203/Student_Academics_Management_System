from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.admin_info import AdminCreate, AdminUpdate, AdminOut
from app.models.admin_info import AdminInfo
from app.models.user_credentials import UserCredentials
from app.database import get_db
from app.utils.hashing import pwd_context
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/admin", tags=["Admin"])

# POST: Create Admin (Admin only)
@router.post("/", response_model=AdminOut, dependencies=[Depends(get_current_active_user("admin"))])
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existing_admin = db.query(AdminInfo).filter_by(admin_id=admin.admin_id).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin ID already exists")

    new_admin = AdminInfo(**admin.dict())
    db.add(new_admin)

    default_password = "admin@123"
    hashed_password = pwd_context.hash(default_password)

    user = UserCredentials(
        user_id=new_admin.admin_id,
        role="admin",
        password=hashed_password
    )
    db.add(user)

    db.commit()
    db.refresh(new_admin)
    return new_admin

# GET: All admins (Admin only)
@router.get("/", response_model=list[AdminOut], dependencies=[Depends(get_current_active_user("admin"))])
def get_all_admins(db: Session = Depends(get_db)):
    return db.query(AdminInfo).all()

# GET: Single admin (Admin only)
@router.get("/{admin_id}", response_model=AdminOut, dependencies=[Depends(get_current_active_user("admin"))])
def get_admin(admin_id: str, db: Session = Depends(get_db)):
    admin = db.query(AdminInfo).filter_by(admin_id=admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

# PUT: Update admin (Admin only)
@router.put("/{admin_id}", response_model=AdminOut, dependencies=[Depends(get_current_active_user("admin"))])
def update_admin(admin_id: str, updated_data: AdminUpdate, db: Session = Depends(get_db)):
    admin = db.query(AdminInfo).filter_by(admin_id=admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(admin, field, value)

    db.commit()
    db.refresh(admin)
    return admin

# DELETE: Delete admin + credentials (Admin only)
@router.delete("/{admin_id}", dependencies=[Depends(get_current_active_user("admin"))])
def delete_admin(admin_id: str, db: Session = Depends(get_db)):
    admin = db.query(AdminInfo).filter_by(admin_id=admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    db.query(UserCredentials).filter_by(user_id=admin_id).delete()
    db.delete(admin)
    db.commit()
    return {"detail": "Admin deleted successfully"}
