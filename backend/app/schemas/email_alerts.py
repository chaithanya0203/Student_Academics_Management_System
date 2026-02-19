from pydantic import BaseModel

class StudentNotifyRequest(BaseModel):
    student_id: str
