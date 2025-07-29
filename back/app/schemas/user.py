from pydantic import Base64Bytes, BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class Profile(BaseModel):
    profile_name: str
    image: Optional[str]

class UserProfiles(BaseModel):
    email: EmailStr
    profiles: list[Profile]

class ProfileCreateRequest(BaseModel):
    email: EmailStr
    profile_name: str
    image: str
