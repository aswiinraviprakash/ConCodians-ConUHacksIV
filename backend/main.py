from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from backend import deployment_calculator, wildfire_predictor

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080"
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoint to calculate the deployment characteristics from CSV
# Input csv file
# Output JSON response with result of calculation
@app.post("/resource/calculate")
async def calculate_from_csv(file: UploadFile):
    try:
        df = pd.read_csv(file.file)
        response = deployment_calculator.calculate_and_store(df, file.filename)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


# Endpoint to get history of all calculations
@app.get("/history")
async def get_all_history():
    try:
        return deployment_calculator.get_history()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while fetching from the DB: {str(e)}")

# Endpoint to predict future wildfires
@app.post("/model/predict")
async def calculate_from_csv(file: UploadFile):
    try:
        df = pd.read_csv(file.file)
        response = wildfire_predictor.predict_wildfire(df)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
