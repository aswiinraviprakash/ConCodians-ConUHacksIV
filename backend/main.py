from fastapi import FastAPI, UploadFile, HTTPException
import pandas as pd

from backend import deployment_calculator

app = FastAPI()


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