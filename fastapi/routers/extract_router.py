
from fastapi import HTTPException, APIRouter
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np
import aiohttp
from models.extract_image import Extract_Image
import watermarking_Scheme
from Evaluation_parameters import calculate_nc, calculate_psnr

router = APIRouter()


@router.post("/v1/extract_watermark")
async def extract_watermark(image: Extract_Image):
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
        async with session.get(image.watermarked_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_watermark_img = await resp.read()
    
    arr = np.asarray(bytearray(data_watermark_img), dtype=np.uint8)
    watermarked_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Embed the watermark
    model = watermarking_Scheme.watermarking_Scheme(base_img, watermarked_img)

    extracted_watermark = model.extract_watermark(watermarked_img, base_img)
    cv2.imwrite('images/extracted_watermark.png', extracted_watermark)
    

    return {
        "extracted_watermark": "http://localhost:8000/images/extracted_watermark.png",
    }
    


@router.post("/v1/extract_watermark_sift")
async def extract_watermark_sift(image: Extract_Image):
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
        async with session.get(image.watermarked_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Image not found")
            data_watermark_img = await resp.read()
    
    arr = np.asarray(bytearray(data_watermark_img), dtype=np.uint8)
    watermark_img = cv2.imdecode(arr, -1) # Load image from bytes

    # Embed the watermark
    model = watermarking_Scheme.watermarking_Scheme(base_img, watermark_img)
    watermark_image = model.extract_with_SIFT(base_img, watermark_img)
    og_watermark = cv2.imread('watermarks/watermark.jpg')
    nc = calculate_nc(og_watermark, watermark_image)
    # nc_watermark = calculate_nc(watermark_img, watermark_img)

    cv2.imwrite('images/extracted_watermark_sift.png', watermark_image)
    

    return {
        "extracted_watermark": "http://localhost:8000/images/extracted_watermark_sift.png",
        "nc": nc
    }