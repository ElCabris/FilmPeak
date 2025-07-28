from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse, Response
from app.schemas.movie import MovieBase
from app.services.get_movie import get_movie_path, create_movie_base
from app.database.read_movie import get_all_movies as read_all_movies

router = APIRouter()


@router.get("/movie/watch/{movie_id}")
async def watch_movie(movie_id: int, request: Request):
    """
    Endpoint para ver una película.

    Args:
        movie_id (int): ID de la película a reproducir.
        request (Request): Objeto de solicitud para acceder a los encabezados.

    Returns:
        StreamingResponse: Respuesta que transmite el video.

    Raises:
        HTTPException: Si la película no se encuentra o hay un error al abrir el archivo.
    """
    try:
        movie = get_movie_path(movie_id)
        file_path = movie.file_path

        if not file_path.exists():
            raise HTTPException(status_code=404, detail="La película no se encuentra.")

        file_size = file_path.stat().st_size
        range_header = request.headers.get("range")

        if range_header:
            byte1, byte2 = 0, None
            m = range_header.strip().split("=")[-1]
            if "-" in m:
                parts = m.split("-")
                byte1 = int(parts[0])
                if parts[1]:
                    byte2 = int(parts[1])

            chunk_size = 1024 * 1024  # 1 MB
            byte2 = byte2 if byte2 is not None else byte1 + chunk_size
            byte2 = min(byte2, file_size - 1)
            length = byte2 - byte1 + 1

            def stream():
                with open(file_path, "rb") as f:
                    f.seek(byte1)
                    yield f.read(length)

            return StreamingResponse(
                stream(),
                status_code=206,
                headers={
                    "Content-Range": f"bytes {byte1}-{byte2}/{file_size}",
                    "Accept-Ranges": "bytes",
                    "Content-Length": str(length),
                    "Content-Type": "video/mp4",  # Considerar hacer esto dinámico
                },
            )
        else:
            return Response(
                content=open(file_path, "rb").read(), media_type="video/mp4"
            )

    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail="El archivo de la película no se encuentra."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al procesar la solicitud: {str(e)}"
        )


@router.get("/movie/getall")
def get_all_movies():
    movies = read_all_movies()
    results = []
    for movie in movies:
        results.append(create_movie_base(movie))

    return results
