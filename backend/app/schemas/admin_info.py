from pydantic import BaseModel, EmailStr, constr
from typing import Optional

class AdminCreate(BaseModel):
    admin_id: constr(min_length=5, max_length=5, pattern=r'^\d+$')
    name: str
    email: EmailStr
    phone: constr(min_length=10, max_length=10, pattern=r'^\d+$')

class AdminUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[constr(min_length=10, max_length=10, pattern=r'^\d+$')] = None

class AdminOut(BaseModel):
    admin_id: str
    name: str
    email: EmailStr
    phone: str

    class Config:
        orm_mode = True  # Enables automatic ORM parsing from SQLAlchemy
