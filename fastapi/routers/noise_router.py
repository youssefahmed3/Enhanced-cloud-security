from urllib.parse import urlparse
import os
from fastapi import HTTPException, APIRouter
import cv2
from models.evaluate_image import EvaluateImage 
from pydantic import BaseModel


import numpy as np
import aiohttp
from models.embed_image import Embed_image
import watermarking_Scheme
from Evaluation_parameters import calculate_ber, calculate_nc, calculate_psnr, calculate_ssim

router = APIRouter()

class NoiseImage(BaseModel):
    base_img: str

@router.post("/v1/addnoise/saltandpepper")
async def nc(image: NoiseImage):
    # Load the base image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.base_img) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_base_img = await resp.read()

    arr = np.asarray(bytearray(data_base_img), dtype=np.uint8)
    base_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Add salt and pepper noise
    row, col, ch = base_img.shape
    s_vs_p = 0.5
    amount = 0.04
    out = np.copy(base_img)
    # Salt mode
    num_salt = np.ceil(amount * base_img.size * s_vs_p)
    coords = [np.random.randint(0, i - 1, int(num_salt)) for i in base_img.shape]
    out[coords] = 1

    # Pepper mode
    num_pepper = np.ceil(amount * base_img.size * (1. - s_vs_p))
    coords = [np.random.randint(0, i - 1, int(num_pepper)) for i in base_img.shape]
    out[coords] = 0

    image_name = os.path.basename(urlparse(image.base_url).path)

    # Extract the base image's name from its URL
    image_name = os.path.basename(urlparse(image.base_url).path)

    # Ensure the base image name has a supported extension
    image_name = image_name if image_name.lower().endswith(('.png', '.jpg', '.jpeg')) else image_name + '.png'

    # Generate a unique name for the watermarked image
    noise_image_name = f"saltandpepper_{image_name}"
    
    
    cv2.imwrite(f'addnoise/{noise_image_name}', out)

    return {"status": f"addnoise/{noise_image_name}"}
