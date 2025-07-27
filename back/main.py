from app.api.movie import router as movie_router
from app.api.user import router as user_router
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.logger import logger

app = FastAPI()

app.include_router(movie_router)
app.include_router(user_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_request(request: Request, call_next):
    logger.info(f"Incomming request: {request.method} {request.url}")

    try:
        response = await call_next(request)
    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        raise

    logger.info(f"Request completed: {response.status_code}")
    return response
