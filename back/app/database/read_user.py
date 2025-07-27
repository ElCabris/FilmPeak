from app.database.connection import get_db_connection
import sqlite3


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
