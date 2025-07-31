from pathlib import Path
from typing import Optional
import base64


def encode_image_to_base64(image_path: str) -> Optional[str]:
    path = Path(image_path)
    if not path.exists():
        return None
    with open(path, "rb") as image_file:
        encoded = base64.b64encode(image_file.read()).decode("utf-8")
        mime_type = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        }.get(path.suffix.lower(), "application/octet-stream")
        return f"data:{mime_type};base64,{encoded}"
