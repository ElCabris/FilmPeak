from pydantic import Base64Bytes, BaseModel, EmailStr

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

class TokenResponse (BaseModel):
    access_token: str
    token_type: str = "bearer"
