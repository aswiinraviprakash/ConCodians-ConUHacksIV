import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib


def load_and_train_model():
    # Loading datasets
    historical_env_data = pd.read_csv('backend/datasets/historical_environmental_data.csv')
    historical_wildfire_data = pd.read_csv("backend/datasets/historical_wildfiredata.csv")

    # Convert timestamp columns to datetime
    historical_env_data["timestamp"] = pd.to_datetime(historical_env_data["timestamp"])
    historical_wildfire_data["timestamp"] = pd.to_datetime(historical_wildfire_data["timestamp"])
    historical_wildfire_data["fire_start_time"] = pd.to_datetime(historical_wildfire_data["fire_start_time"])

    historical_env_data["fire_occurred"] = 0
    for index, fire in historical_wildfire_data.iterrows():
        closest_match = historical_env_data.loc[
            (historical_env_data["timestamp"] == fire["timestamp"]) &
            (historical_env_data["latitude"] == fire["latitude"]) &
            (historical_env_data["longitude"] == fire["longitude"])
            ]
        if not closest_match.empty:
            historical_env_data.loc[closest_match.index, "fire_occurred"] = 1

    # preprocessing date information from timestamp
    historical_env_data["month"] = historical_env_data["timestamp"].dt.month
    historical_env_data["day"] = historical_env_data["timestamp"].dt.day
    historical_env_data["hour"] = historical_env_data["timestamp"].dt.hour

    # loading input and predicted output data
    X = historical_env_data.drop(columns=["timestamp", "fire_occurred"])
    y = historical_env_data["fire_occurred"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # Train Random Forest model
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight={0: 1, 1: 55})
    rf_model.fit(X_train, y_train)

    # Model evaluation
    y_pred = rf_model.predict(X_test)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    print("Accuracy:", accuracy_score(y_test, y_pred))

    joblib.dump(rf_model, 'backend/models/trained_wildfire_model.joblib')


def predict_wildfire(future_env_data):
    # preprocessing the dataset and extracting date information
    future_env_data["timestamp"] = pd.to_datetime(future_env_data["timestamp"])
    future_env_data["month"] = future_env_data["timestamp"].dt.month
    future_env_data["day"] = future_env_data["timestamp"].dt.day
    future_env_data["hour"] = future_env_data["timestamp"].dt.hour

    X_future = future_env_data.drop(columns=["timestamp"])

    # loading the saved model
    rf_model = joblib.load('backend/models/trained_wildfire_model.joblib')
    future_predictions = rf_model.predict(X_future)

    predicted_fire_locations = future_env_data.loc[future_predictions == 1, ["latitude", "longitude", "timestamp",
                                                                             "temperature","humidity","wind_speed",
                                                                             "precipitation","vegetation_index",
                                                                             "human_activity_index"]]

    predicted_fire_locations["latitude"] = predicted_fire_locations["latitude"].astype(float)
    predicted_fire_locations["longitude"] = predicted_fire_locations["longitude"].astype(float)
    predicted_fire_locations["temperature"] = predicted_fire_locations["temperature"].astype(float)
    predicted_fire_locations["humidity"] = predicted_fire_locations["humidity"].astype(float)
    predicted_fire_locations["wind_speed"] = predicted_fire_locations["wind_speed"].astype(float)
    predicted_fire_locations["precipitation"] = predicted_fire_locations["precipitation"].astype(float)
    predicted_fire_locations["vegetation_index"] = predicted_fire_locations["vegetation_index"].astype(float)
    predicted_fire_locations["human_activity_index"] = predicted_fire_locations["human_activity_index"].astype(float)

    # Ensure the timestamp column is serialized properly
    predicted_fire_locations["timestamp"] = predicted_fire_locations["timestamp"].dt.strftime('%Y-%m-%d %H:%M:%S')

    return predicted_fire_locations