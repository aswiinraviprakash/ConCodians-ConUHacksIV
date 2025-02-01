from fastapi import FastAPI, File, UploadFile
import pandas as pd

import deployment_calculator

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/resource/calculate")
async def calculate_from_csv(file: UploadFile):
    df = pd.read_csv(file.file)
    response = deployment_calculator.calculate_and_store(df, file.filename)

    return response

@app.get("/history")
async def get_all_history():
    return deployment_calculator.get_history()
