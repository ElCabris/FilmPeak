from app.core.logger import logger
from app.database.connection import get_db_connection
import sqlite3
from typing import Any


def get_user_by_email(email: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
                SELECT * FROM users WHERE email = ?
                """,
            (email,),
        )
        result = cursor.fetchone()

        if result is None:
            return None

        return dict(result)

    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error reading user with email {email}: {e}")
    finally:
        if "conn" in locals():
            conn.close()


def get_profiles_by_email(email: str) -> list[dict[str, Any]]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        logger.info(f"serch profiles with email {email}")
        cursor.execute(
            """
                SELECT profile, image FROM profiles 
                WHERE user_id = (
                    SELECT id FROM users WHERE email = ?
                )
                """,
            (email,),
        )
        rows = cursor.fetchall()
        result = [dict(row) for row in rows]
        logger.info(f"{len(result)} profiles have been foud")
        return result
    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error reading profiles the user with email {email}: {e}")
    finally:
        if "conn" in locals():
            conn.close()
