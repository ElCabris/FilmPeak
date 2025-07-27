import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path


def setup_logging():
    # Configuración básica
    logs_dir = Path("logs")
    logs_dir.mkdir(exist_ok=True)

    # Formato del log
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s [in %(pathname)s:%(lineno)d]"
    formatter = logging.Formatter(log_format)

    # Logger principal
    logger = logging.getLogger("myapp")
    logger.setLevel(logging.INFO)

    # Handlers
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)

    file_handler = RotatingFileHandler(
        logs_dir / "app.log", maxBytes=1024 * 1024 * 5, backupCount=3  # 5 MB
    )
    file_handler.setFormatter(formatter)

    # Añadir handlers
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    if not logger.hasHandlers():
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)

    return logger


logger = setup_logging()
