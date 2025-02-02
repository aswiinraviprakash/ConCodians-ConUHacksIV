# ConCodians-ConUHacksIV
# Wildfire Management System

Welcome to the **Wildfire Management System**! 🚒 This platform streamlines wildfire response by deploying firefighters and predicting possible future occurences of wildfire.

## 🚀 Features
- 🚒 **Firefighter Deployment** – Efficiently allocate resources to affected areas.
- 🔥 **Predictive Wildfire Detection** – Forecast future wildfire affected areas using past history.


## 🛠️ Tech Stack
- **Frontend:** React, Material UI, Chart.js
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **Machine Learning:** Python, Pandas, Scikit-learn

## 📦 Installation
To set up the project locally:
```sh
# Clone the repository
git clone https://github.com/aswiinraviprakash/ConCodians-ConUHacksIV.git
cd ConCodians-ConUHacksIV

# Front End
npm install / Yarn install
npm start / Yarn start

# Back End
intall python
setup PostgreSQL
run python -m uvicorn backend.main:app
```

## 📜 API Endpoints
| Method | Endpoint           | Description                      |
|--------|-------------------|----------------------------------|
| GET    | `/history`      | List all hsitory of previous uploaded firefighter deployements       |
| POST   | `/resourse/calculate`         | Deploy firefighters to a location |
| POST    | `/model/predict`    | View future wildfire forecasts  |

## 🤝 Contributing
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push the branch: `git push origin feature-name`
5. Open a Pull Request.

---
💡 *Together, we can combat wildfires!* 🔥

