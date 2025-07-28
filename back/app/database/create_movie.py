from typing import Optional
from app.database.connection import get_db_connection
import sqlite3


def create_movie(
    name: str,
    file_path: str,
    year: Optional[int] = None,
    description: Optional[str] = None,
    duration_minutes: Optional[int] = None,
    score: Optional[float] = None,
    genre: Optional[str] = None,
) -> int:
    try:
        conn = get_db_connection()
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                    INSERT INTO movies (title, year, description, file_path, duration_minutes, score, genre) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                (name, year, description, file_path, duration_minutes, score, genre),
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
    from random import random, randint
    from moviepy.video.io.VideoFileClip import VideoFileClip
    from app.schemas.movie import movie_genre

    def get_duration_minutes(file_path: str) -> float:

        with VideoFileClip(file_path) as video:
            duration_seconds = video.duration
        return round(duration_seconds / 60, 2)

    folder_path = "./movies/"

    all_items = os.listdir(folder_path)

    for movie in all_items:
        movie_path = folder_path + movie
        rand_score = randint(0, 5)
        rand_score += round(random(), 1)
        rand_genre = movie_genre[randint(0, len(movie_genre) - 1)]
        movie_duration_minutes = int(get_duration_minutes(movie_path))
        create_movie(
            movie,
            movie_path,
            duration_minutes=movie_duration_minutes,
            score=rand_score,
            genre=rand_genre
        )
