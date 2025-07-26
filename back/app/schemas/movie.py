from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from pathlib import Path


class MovieBase(BaseModel):
    """Base model to represent a film"""

    name: str = Field(..., min_length=1, max_length=255, example="Inception")
    year: Optional[int] = Field(None, ge=1888, le=date.today().year + 2, example=2018)
    description: Optional[str] = Field(
        None, max_length=2000, example="Un ladrón que roba secretos corporativos..."
    )
    duration_minutes: Optional[int] = Field(
        None, ge=1, le=300, example=148, description="movie length in minutes"
    )


class MovieCreate(BaseModel):
    """Template to create a new movie, including the file path."""

    file_path: Path = Field(
        ...,
        example="./movies/inception.mp4",
        description="Absolute or relative path to the movie file",
    )
