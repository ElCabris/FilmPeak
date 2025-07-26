from typing import Optional
from app.database.connection import get_db_connection
import sqlite3


def create_movie(
    name: str,
    file_path: str,
    year: Optional[int] = None,
    description: Optional[str] = None,
    duration_minutes: Optional[int] = None,
) -> int:
    try:
        conn = get_db_connection()
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                    INSERT INTO movies (title, year, description, file_path, diration_minutes) VALUES (?, ?, ?, ?, ?)
                    """,
                (name, year, description, file_path, duration_minutes),
            )
            return cursor.lastrowid
    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error inserting movie: {e}")
    finally:
        conn.close()


if __name__ == "__main__":
    """
    read all movies in the project
    """
    import os

    folder_path = "./movies/"

    all_items = os.listdir(folder_path)

    for movie in all_items:
        create_movie(movie, folder_path + movie)
