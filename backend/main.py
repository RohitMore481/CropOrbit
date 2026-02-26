from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from satellite import process_polygon

app = FastAPI()

# Enable CORS (so frontend can call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CropOrbit Backend Running"}

@app.post("/analyze")
def analyze(data: dict):
    polygon = data.get("polygon")
    result = process_polygon(polygon)
    return result