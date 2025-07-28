from app.services.passwords import hash_password
from .connection import get_db_connection
from app.schemas.user import UserRegister
from sqlite3 import IntegrityError


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
    finally:
        conn.close()


def create_user_profile(email: str, profile_name: str) -> bool:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Verificar que el usuario existe
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()

        if not row:
            raise ValueError("User with that email does not exist")

        user_id = row["id"]
        cursor.execute(
            "INSERT INTO profiles (user_id, profile) VALUES (?, ?)",
            (user_id, profile_name),
        )
        conn.commit()
        return True
    finally:
        if "conn" in locals():
            conn.close()
