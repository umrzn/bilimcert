from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    auth: Optional[bool] = False
    recaptcha_token: str

class LoginSchema(BaseModel):
    username: str
    password: str
    recaptcha_token: str
