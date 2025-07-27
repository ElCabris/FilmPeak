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
