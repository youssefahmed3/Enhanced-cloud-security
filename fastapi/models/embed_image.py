from pydantic import BaseModel


class Embed_image(BaseModel):
    base_url: str
    watermark_url: str

