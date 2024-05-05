from urllib.parse import urlparse
import os
from fastapi import HTTPException, APIRouter
import cv2
from models.evaluate_image import EvaluateImage 

import numpy as np
import aiohttp
from models.embed_image import Embed_image
import watermarking_Scheme
from Evaluation_parameters import calculate_ber, calculate_nc, calculate_psnr, calculate_ssim

router = APIRouter()


@router.post("/v1/calc_parameters")
async def nc(image: EvaluateImage):
    # Load the base image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.base_img) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_base_img = await resp.read()
    
    arr = np.asarray(bytearray(data_base_img), dtype=np.uint8)
    base_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Load the watermarked image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.watermarked_img) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_watermark_img = await resp.read()
    
    arr = np.asarray(bytearray(data_watermark_img), dtype=np.uint8)
    watermarked_img = cv2.imdecode(arr, -1) # Load image from bytes
    
    psnr = calculate_psnr(base_img, watermarked_img)
    nc = calculate_nc(base_img, watermarked_img)
    ssim = calculate_ssim(base_img, watermarked_img)
    ber = calculate_ber(base_img, watermarked_img)
    
    return {
        "Peak Signal to Noise Ratio": psnr,
        "Normalized Correlation": nc,   
        "Structural Similarity Index": ssim,
        "Bit Error Rate": ber
    }
