from pydantic import BaseModel, ConfigDict

class UserCredentialsBase(BaseModel):
    user_id: str
    password: str
    role: str  # student, faculty, admin

class UserCredentialsCreate(UserCredentialsBase):
    pass

class UserCredentialsOut(BaseModel):
    user_id: str
    role: str

    model_config = ConfigDict(from_attributes=True)
