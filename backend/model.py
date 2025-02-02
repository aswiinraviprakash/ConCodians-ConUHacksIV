import pandas as pd
from prophet import Prophet
import joblib

# Step 1: Load the CSV files
file1 = pd.read_csv("/Users/aswiinraviprakash/Desktop/HACKATHON/ConCodians-ConUHacksIV/backend/historical_environmental_data.csv")  # First file (larger one with all rows)
file2 = pd.read_csv("/Users/aswiinraviprakash/Desktop/HACKATHON/ConCodians-ConUHacksIV/backend/historical_wildfiredata.csv")  # Second file (with fewer rows)

# Step 2: Merge the two dataframes on the timestamp column
# Assume the common timestamp column is named 'timestamp'. Modify it if needed.
merged_df = pd.merge(file1, file2, on=["timestamp", "latitude", "longitude"], how='left')

merged_df.fillna(0, inplace=True)

# Step 3: Add a new column for match indicator (1 for matched, 0 for unmatched)
merged_df['wildfire_occurred'] = merged_df['fire_start_time'].apply(lambda x: 1 if x != 0 else 0)

# Step 4: Fill any NaN values (rows from file1 without a match in file2) with 0

# Step 5: Save the resulting dataframe to a new CSV file
merged_df.to_csv("combined_file_with_match.csv", index=False)

print("Files combined successfully and saved as 'combined_file_with_match.csv'.")

train_data = merged_df
train_data['timestamp'] = pd.to_datetime(train_data['timestamp'])
train_data['wildfire_occurred'] = train_data['wildfire_occurred'].astype(int)
train_prophet = train_data[['timestamp', 'wildfire_occurred']].rename(columns={'timestamp': 'ds', 'wildfire_occurred': 'y'})

# Initialize the Prophet model
model = Prophet()

# Add external regressors
model.add_regressor('temperature')
model.add_regressor('humidity')
model.add_regressor('wind_speed')
model.add_regressor('vegetation_index')
model.add_regressor('human_activity_index')
model.add_regressor('latitude')
model.add_regressor('longitude')

# Train the model
model.fit(train_data)

# Save the model
joblib.dump(model, 'trained_wildfire_model.pkl')

predict_data = pd.read_csv('future_environmental_data.csv')
predict_data['ds'] = pd.to_datetime(predict_data['timestamp'])
predict_data = predict_data[['ds', 'temperature', 'humidity', 'wind_speed', 'vegetation_index', 'human_activity_index', 'latitude', 'longitude']]

# Make predictions on future data
forecast = model.predict(predict_data)
forecast['wildfire_predicted'] = (forecast['yhat'] >= 0.5).astype(int)

# Display predictions
print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper', 'wildfire_predicted']])
