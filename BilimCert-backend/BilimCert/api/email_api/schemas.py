from pydantic import BaseModel, EmailStr
from typing import List

class EmailSchema(BaseModel):
    subject: str
    message: str
    to: List[EmailStr]
    isFiles: bool = False