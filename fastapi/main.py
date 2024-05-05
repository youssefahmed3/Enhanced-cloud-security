from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import embed_router, extract_router, evaluate_router, noise_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/testimages", StaticFiles(directory="testimages"), name="testimages")
app.mount("/watermarks", StaticFiles(directory="watermarks"), name="watermarks")
app.mount("/noise_image", StaticFiles(directory="noise_image"), name="noise_image")

app.include_router(embed_router.router, prefix="/api")
app.include_router(extract_router.router, prefix="/api")
app.include_router(evaluate_router.router, prefix="/api")
app.include_router(noise_router.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Watermarking API is Running!"}
