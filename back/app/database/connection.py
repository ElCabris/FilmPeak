from pathlib import Path
import sqlite3
from app.core.logger import logger

DATABASE_PATH = Path("./db/movies.db")


def get_db_connection(database_path: Path = DATABASE_PATH) -> sqlite3.Connection:
    try:
        logger.info(f"Connecting to the database on the path: {database_path}")
        database_path.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(database_path))
        conn.row_factory = sqlite3.Row
        logger.info(f"successful connection to the database {database_path}")

        return conn
    except sqlite3.Error as e:
        raise sqlite3.Error(f"Error connecting to database: {e}")
