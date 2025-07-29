from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from pathlib import Path

movie_genre = [
    "Acción",
    "Aventura",
    "Animación",
    "Comedia",
    "Crimen",
    "Documental",
    "Drama",
    "Familiar",
    "Fantasía",
    "Histórico",
    "Terror",
    "Ciencia ficción",
    "Misterio",
    "Romance",
    "Thriller",
    "Bélico",
    "Western",
    "Musical",
    "Biográfico",
    "Deportivo",
    "Policíaco",
    "Suspense",
    "Superhéroes",
    "Gore",
    "Fantástico",
    "Cine negro",
    "Paranormal",
    "Zombies",
    "Apocalíptico",
    "Distopía",
    "Erótico",
    "Arte marcial",
    "Espionaje",
    "Catástrofe",
    "Coming-of-age",
    "Buddy movie",
    "Road movie",
    "Psicológico",
    "Experimental",
    "Found footage",
]


class MovieBase(BaseModel):
    """Base model to represent a film"""

    id: int = Field(
        None, ge=1, example=42, description="Unique identifier of the movie"
    )
    name: str = Field(..., min_length=1, max_length=255, example="Inception")
    year: Optional[int] = Field(None, ge=1888, le=date.today().year + 2, example=2018)
    description: Optional[str] = Field(
        None, max_length=2000, example="Un ladrón que roba secretos corporativos..."
    )
    duration_minutes: Optional[int] = Field(
        None, ge=0, le=300, example=148, description="movie length in minutes"
    )
    score: Optional[float] = Field(
        ..., ge=0, le=5, example=4.7, description="Movie rating score from 0 to 10"
    )
    genre: Optional[str] = Field(
        ...,
        min_length=1,
        max_length=100,
        example="Science Fiction",
        description="Main genre of the movie",
    )


class MovieCreate(BaseModel):
    """Template to create a new movie, including the file path."""

    file_path: Path = Field(
        ...,
        example="./movies/inception.mp4",
        description="Absolute or relative path to the movie file",
    )
