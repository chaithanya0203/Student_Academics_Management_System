from pydantic import BaseModel, ConfigDict


class SectionCreate(BaseModel):
    section_name: str


class SectionUpdate(BaseModel):
    name: str


class SectionOut(BaseModel):
    section_id: int
    section_name: str

    model_config = ConfigDict(from_attributes=True)
