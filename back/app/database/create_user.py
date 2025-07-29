from app.core.logger import logger
from typing import Optional
from app.services.passwords import hash_password
from .connection import get_db_connection
from app.schemas.user import UserRegister
from sqlite3 import IntegrityError
import sqlite3


def create_user(user: UserRegister) -> int:
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        hashed_pw = hash_password(user.password)
        cursor.execute(
            """
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
        """,
            (user.username, user.email, hashed_pw),
        )

        conn.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        raise ValueError()
    finally:
        conn.close()


def create_user_profile(email: str, profile_name: str, image: Optional[str]) -> bool:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        logger.info(f"creando un nuevo perfil para {email}")
        # Verificar que el usuario existe
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()

        if not row:
            logger.info(f"[ERROR] Usuario con email '{email}' no existe.")
            raise ValueError("User with that email does not exist")

        user_id = row["id"]
        cursor.execute(
            "INSERT INTO profiles (user_id, profile, image) VALUES (?, ?, ?)",
            (user_id, profile_name, image),
        )
        conn.commit()

        affected = cursor.rowcount
        logger.info(f"[INFO] Perfil creado correctamente. Filas afectadas: {affected}")
        return affected > 0

    except sqlite3.Error as e:
        logger.info(f"[ERROR] Error al crear perfil: {str(e)}")
        return False

    except Exception as e:
        logger.info(f"[ERROR] Excepción inesperada: {str(e)}")
        return False

    finally:
        if "conn" in locals():
            conn.close()
