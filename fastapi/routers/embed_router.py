
from fastapi import HTTPException, APIRouter
import cv2
import numpy as np
import aiohttp
from models.embed_image import Embed_image
import watermarking_Scheme
from Evaluation_parameters import calculate_nc, calculate_psnr

router = APIRouter()

@router.post("/v1/embed")
async def embed(image: Embed_image):
    # Load the base image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.base_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_base_img = await resp.read()
    
    arr = np.asarray(bytearray(data_base_img), dtype=np.uint8)
    base_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Load the watermark image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.watermark_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_watermark_img = await resp.read()
    
    arr = np.asarray(bytearray(data_watermark_img), dtype=np.uint8)
    watermark_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Embed the watermark
    model = watermarking_Scheme.watermarking_Scheme(base_img, watermark_img)
    watermarked_image = model.embed_watermark()
    psnr = calculate_psnr(base_img, watermarked_image)
    nc = calculate_nc(base_img, watermarked_image)
    # nc_watermark = calculate_nc(watermark_img, watermark_img)

    cv2.imwrite('images/watermarked_image.png', watermarked_image)

    return {
        "image": "http://localhost:8000/images/watermarked_image.png",
        "PSNR": psnr,
        "NC": nc,
        
    }
    

@router.post("/v1/embed_sift")
async def embed_SIFT(image: Embed_image):
    # Load the base image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.base_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_base_img = await resp.read()
    
    arr = np.asarray(bytearray(data_base_img), dtype=np.uint8)
    base_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Load the watermark image
    async with aiohttp.ClientSession() as session:
        async with session.get(image.watermark_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_watermark_img = await resp.read()
    
    arr = np.asarray(bytearray(data_watermark_img), dtype=np.uint8)
    watermark_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Embed the watermark
    model = watermarking_Scheme.watermarking_Scheme(base_img, watermark_img)
    watermarked_image = model.embed_with_SIFT()
    psnr = calculate_psnr(base_img, watermarked_image[0])
    nc = calculate_nc(base_img, watermarked_image[0])
    # nc_watermark = calculate_nc(watermark_img, watermark_img)

    cv2.imwrite('images/watermarked_image_SIFT.png', watermarked_image[0])

    return {
        "image": "http://localhost:8000/images/watermarked_image_SIFT.png",
        "PSNR_between_base_watermarked": psnr,
        "NC_between_base_watermarked": nc,
        "NC_between_basewatermark_extractedwatermark": "0.0",
        
    }


