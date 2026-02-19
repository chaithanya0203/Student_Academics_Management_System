from pydantic import BaseModel

class StudentCourseMapCreate(BaseModel):
    student_id: str
    course_id: int

class StudentCourseMapUpdate(BaseModel):
    student_id: str
    course_id: str

class StudentCourseMapOut(BaseModel):
    id: int
    student_id: str
    course_id: int

    class Config:
        orm_mode = True
