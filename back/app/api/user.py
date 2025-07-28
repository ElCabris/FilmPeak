import sqlite3
from app.database.create_user import create_user_profile
from fastapi import APIRouter, HTTPException
from app.schemas.user import (
    UserProfiles,
    UserRegister,
    UserResponse,
    TokenResponse,
    UserLogin,
    ProfileCreateRequest,
)
from app.database.read_user import get_user_by_email
from app.services.passwords import verify_password
from app.services.auth import create_access_token
from app.database.create_user import create_user
from app.database.read_user import get_profiles_by_email
from app.services.get_user import create_user_profile_response

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegister):
    try:
        user_id = create_user(user)
        return UserResponse(id=user_id, username=user.username, email=user.email)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")


@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin):
    print("search user with email: {user.email}")
    db_user = get_user_by_email(user.email)
    print(db_user)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="invalid credentials")

    token = create_access_token(data={"sub": db_user["email"]})

    return TokenResponse(access_token=token)


@router.get("/user/profiles/{email}", response_model=UserProfiles)
async def get_user_profiles(email: str):
    profiles = get_profiles_by_email(email)
    print(profiles)
    return create_user_profile_response(email, profiles)


@router.post("/user/profiles/create")
async def create_profile(data: ProfileCreateRequest):
    try:
        created = create_user_profile(data.email, data.profile_name)
        return {"message": "Profile created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")
