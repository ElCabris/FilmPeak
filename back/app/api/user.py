import sqlite3
from fastapi import APIRouter, HTTPException
from app.schemas.user import UserRegister, UserResponse, TokenResponse, UserLogin
from app.database.read_user import get_user_by_email
from app.services.passwords import verify_password
from app.services.auth import create_access_token
from app.database.create_user import create_user
import logging

router = APIRouter()
logger = logging.getLogger("myapp")

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegister):
    try:
        user_id = create_user(user)
        return UserResponse(id=user_id, username=user.username, email=user.email)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):
    try:
        logger.info(f"Searching user with email: {user.email}")
        db_user = get_user_by_email(user.email)
        
        if not db_user:
            logger.warning(f"User not found: {user.email}")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        if not verify_password(user.password, db_user["password"]):
            logger.warning(f"Invalid password for user: {user.email}")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_access_token(data={"sub": db_user["email"]})
        logger.info(f"Login successful for user: {user.email}")
        
        return TokenResponse(access_token=token)
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")