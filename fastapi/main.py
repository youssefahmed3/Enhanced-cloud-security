from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import embed_router, extract_router

app = FastAPI()


app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/watermarks", StaticFiles(directory="watermarks"), name="watermarks")

app.include_router(embed_router.router, prefix="/api")
app.include_router(extract_router.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Watermarking API is Running!"}
