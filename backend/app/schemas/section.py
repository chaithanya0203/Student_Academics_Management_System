from pydantic import BaseModel

class SectionCreate(BaseModel):
    section_name: str

class SectionUpdate(BaseModel):
    name: str

class SectionOut(BaseModel):
    section_id: int
    section_name: str

    class Config:
        orm_mode = True
