from pathlib import Path
from typing import Optional
from sqlite3 import Error
from pydantic import ValidationError
from app.schemas.movie import MovieBase, MovieCreate
from app.database.read_movie import read_movie


def get_movie(movie_id: int) -> Optional[MovieBase]:
    try:
        result = read_movie(movie_id)
        if not result:
            return None

        return MovieBase(
            name=result.get("title"),
            year=result.get("year"),
            description=result.get("description"),
            duration_minutes=result.get("duration_minutes"),
        )
    except ValidationError as e:
        raise ValueError(f"Invalid movie data: {e}")
    except Error as e:
        raise Error(f"Database error getting movie: {e}")

def get_movie_path(movie_id: int) -> MovieCreate:
    try:
        result = read_movie(movie_id)
        if not result:
            raise ValueError(f"No se encontró película con ID {movie_id}")
        
        if 'file_path' not in result or not result['file_path']:
            raise ValueError("La película no tiene una ruta de archivo válida")
        file_path = Path(result['file_path'])
        if not file_path.exists():
            raise ValueError(f"El archivo no existe en la ruta especificada: {file_path}")
        return MovieCreate(
            name=result.get('title'),
            year=result.get('year'),
            description=result.get('description'),
            duration_minutes=result.get('duration_minutes'),
            file_path=file_path
        )
    
    except ValidationError as e:
        raise ValueError(f"Datos inválidos de película: {e}")
    except Error as e:
        raise Error(f"Error de base de datos: {e}")
    except Exception as e:
        raise ValueError(f"Error inesperado al obtener ruta de película: {e}")

if __name__ == "__main__":
    id = 1
    print(get_movie(id))
    print(get_movie_path(id).file_path)

