import sqlite3
from fastapi import APIRouter, HTTPException
from app.schemas.user import UserRegister, UserResponse
from app.database.create_user import create_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegister):
    try:
        user_id = create_user(user)
        return UserResponse(id=user_id, username=user.username, email=user.email)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")
