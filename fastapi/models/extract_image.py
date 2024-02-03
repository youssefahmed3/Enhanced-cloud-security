from pydantic import BaseModel


class Extract_Image(BaseModel):
    base_url: str
    watermarked_url: str


