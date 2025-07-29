import sqlite3
from app.core.logger import logger
from app.database.connection import get_db_connection


def delete_profile(email: str, profile: str) -> int:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Verificar si el usuario existe
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        user_id = cursor.fetchone()
        if not user_id:
            raise ValueError(f"Usuario con email '{email}' no encontrado.")

        user_id = user_id[0]

        # Verificar si el perfil existe para ese usuario
        cursor.execute(
            """
            DELETE FROM profiles
            WHERE user_id = ? AND profile = ?
            """,
            (user_id, profile),
        )
        conn.commit()

        affected_rows = cursor.rowcount
        logger.info(f"{affected_rows} fila(s) eliminada(s).")
        return affected_rows

    except (sqlite3.Error, ValueError) as e:
        logger.info(f"Error al eliminar perfil: {str(e)}")
        return 0

    finally:
        if "conn" in locals():
            conn.close()
