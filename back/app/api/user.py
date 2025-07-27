import sqlite3
from fastapi import APIRouter, HTTPException
from app.schemas.user import UserRegister, UserResponse, TokenResponse, UserLogin
from app.database.read_user import get_user_by_email
from app.services.passwords import verify_password
from app.services.auth import create_access_token
from app.database.create_user import create_user

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegister):
    try:
        user_id = create_user(user)
        return UserResponse(id=user_id, username=user.username, email=user.email)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):
    print("search user with email: {user.email}")
    db_user = get_user_by_email(user.email)
    print(db_user)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="invalid credentials")

    token = create_access_token(data={"sub": db_user["email"]})

    return TokenResponse(access_token=token)
