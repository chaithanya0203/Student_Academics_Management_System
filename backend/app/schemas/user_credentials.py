from pydantic import BaseModel

class UserCredentialsBase(BaseModel):
    user_id: str
    password: str
    role: str  # student, faculty, admin

class UserCredentialsCreate(UserCredentialsBase):
    pass

class UserCredentialsOut(BaseModel):
    user_id: str
    role: str

    class Config:
        orm_mode = True
