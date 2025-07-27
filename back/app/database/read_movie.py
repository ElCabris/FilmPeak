from typing import Optional, Dict, Any
from app.database.connection import get_db_connection
from sqlite3 import Connection, Cursor, Error
import sqlite3


def search_movie_id(name: str, year: Optional[int] = None) -> int:
    try:
        conn = get_db_connection()
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                           SELECT id FROM movies
                           WHERE title = ? AND (year = ? OR ? IS NULL)
                           """,
                (name, year, year),
            )
            result = cursor.fetchall()

            if len(result) == 0:
                raise ValueError(f"Movie not found: {name} (year: {year})")
            if len(result) > 1:
                raise ValueError(f"Multiple movies found with the name: {name}")

            return int(result[0][0])
    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error buscando película: {e}")
    finally:
        if "conn" in locals():
            conn.close()


def read_movie(movie_id: int) -> Optional[Dict[str, Any]]:
    try:
        conn = get_db_connection()
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                """
            SELECT title, year, description, file_path, duration_minutes
            FROM movies
            WHERE id = ?
            """,
                (movie_id,),
            )
            result = cursor.fetchone()

            if result is None:
                return None

            return dict(result)

    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error reading movie with ID {movie_id}: {e}")
    finally:
        if "conn" in locals():
            conn.close()
