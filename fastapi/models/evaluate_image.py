from pydantic import BaseModel


class EvaluateImage(BaseModel):
    base_img: str
    watermarked_img: str


