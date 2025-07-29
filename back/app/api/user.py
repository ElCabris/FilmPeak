from app.database.delete_user import delete_profile
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


@router.get("/user/profiles/{email}", response_model=UserProfiles)
async def get_user_profiles(email: str):
    profiles = get_profiles_by_email(email)
    logger.info(profiles)
    return create_user_profile_response(email, profiles)


@router.delete("/user/profiles")
async def point_delete_profile(email: str, profile: str):
    try:
        affected_rows = delete_profile(email, profile)

        if affected_rows == 0:
            raise HTTPException(
                status_code=404, detail="Perfil no encontrado o ya eliminado"
            )

        return {"message": f"Perfil eliminado correctamente ({affected_rows} fila(s))."}

    except ValueError as ve:
        # Errores de validación de la función delete_profile
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        # Errores inesperados
        raise HTTPException(
            status_code=500, detail="Error interno al eliminar el perfil"
        )


@router.post("/user/profiles/create")
async def create_profile(data: ProfileCreateRequest):
    try:
        logger.info(data)
        created = create_user_profile(data.email, data.profile_name, data.image)
        return {"message": "Profile created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception:
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
