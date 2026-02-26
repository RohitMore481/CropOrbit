import ee
import numpy as np
import math

# 🔥 Initialize Earth Engine with project ID
PROJECT_ID = "croporbit-ee"   # ← your project ID

try:
    ee.Initialize(project=PROJECT_ID)
except Exception:
    ee.Authenticate()
    ee.Initialize(project=PROJECT_ID)


import ee
import math

PROJECT_ID = "croporbit-ee"

try:
    ee.Initialize(project=PROJECT_ID)
except Exception:
    ee.Authenticate()
    ee.Initialize(project=PROJECT_ID)


def process_polygon(geojson_polygon):

    region = ee.Geometry(geojson_polygon)

    collection = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(region)
        .filterDate("2023-01-01", "2023-12-31")
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
        .select(["B4", "B8"])
    )

    image = collection.median()

    red = image.select("B4")
    nir = image.select("B8")

    ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI")

    samples = ndvi.sample(
        region=region,
        scale=20,
        numPixels=400,
        geometries=False
    )

    values = samples.aggregate_array("NDVI").getInfo()

    # 🔥 Apply Vegetation Mask (NDVI > 0.2)
    vegetation_values = [v for v in values if v is not None and v > 0.2]

    if len(vegetation_values) == 0:
        return {
            "summary": {
                "health_score": 0,
                "stress_percentage": 0,
                "area_under_stress": 0,
                "confidence_score": 0
            },
            "stress_matrix": []
        }

    # Convert to stress only for vegetation
    stress_values = [1 - v for v in vegetation_values]

    size = int(math.sqrt(len(stress_values)))
    matrix = [
        stress_values[i * size:(i + 1) * size]
        for i in range(size)
    ]

    total_cells = len(stress_values)
    severe_cells = len([v for v in stress_values if v > 0.6])

    area_under_stress = (severe_cells / total_cells) * 100
    health_score = (sum(vegetation_values) / len(vegetation_values)) * 100
    stress_percentage = (sum(stress_values) / len(stress_values)) * 100
    confidence_score = max(0, 100 - stress_percentage)

    return {
        "summary": {
            "health_score": round(health_score, 2),
            "stress_percentage": round(stress_percentage, 2),
            "area_under_stress": round(area_under_stress, 2),
            "confidence_score": round(confidence_score, 2)
        },
        "stress_matrix": matrix
    }