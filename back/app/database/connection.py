from pathlib import Path
import sqlite3

DATABASE_PATH = Path("./db/movies.db")


def get_db_connection(database_path: Path = DATABASE_PATH) -> sqlite3.Connection:
    try:
        database_path.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(database_path))

        return conn
    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error connecting to database: {e}")
