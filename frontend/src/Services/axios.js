import axios from 'axios';


const BACKEND_URL ="http://127.0.0.1:8000/";

export const getHistory  = async() => {
    //TEMP
    try {
        // const response = await axios.get(BACKEND_URL + "history");
        // console.log(response?.data);
        let res =  [
            {
                "fire_count": 28,
                "history_id": 5,
                "op_cost": "123000",
                "low_severity": 13,
                "high_severity": 5,
                "d_med_severity": 1,
                "delayed_fire_count": 4,
                "stamp": "2025-02-01T21:35:26",
                "filename": null,
                "damage_cost": "550000",
                "med_severity": 10,
                "d_low_severity": 1,
                "d_high_severity": 2
            },
            {
                "fire_count": 28,
                "history_id": 6,
                "op_cost": "123000",
                "low_severity": 13,
                "high_severity": 5,
                "d_med_severity": 1,
                "delayed_fire_count": 4,
                "stamp": "2025-02-01T21:36:43",
                "filename": "current_wildfiredata.csv",
                "damage_cost": "550000",
                "med_severity": 10,
                "d_low_severity": 1,
                "d_high_severity": 2
            },
            {
                "fire_count": 28,
                "history_id": 7,
                "op_cost": "123000",
                "low_severity": 13,
                "high_severity": 5,
                "d_med_severity": 1,
                "delayed_fire_count": 4,
                "stamp": "2025-02-01T21:51:11",
                "filename": "current_wildfiredata.csv",
                "damage_cost": "550000",
                "med_severity": 10,
                "d_low_severity": 1,
                "d_high_severity": 2
            },
            {
                "fire_count": 28,
                "history_id": 8,
                "op_cost": "123000",
                "low_severity": 13,
                "high_severity": 5,
                "d_med_severity": 1,
                "delayed_fire_count": 4,
                "stamp": "2025-02-01T21:51:58",
                "filename": "current_wildfiredata.csv",
                "damage_cost": "550000",
                "med_severity": 10,
                "d_low_severity": 1,
                "d_high_severity": 2
            }
        ]
        return  res.map(item => ({
            ...item,
            id: item.history_id,
            history_id: undefined
        }));
    } catch (err){
        console.log(err);
    }

}

export const submitFile = async(file) => {
    return await axios.post(BACKEND_URL + "resource/calculate", {
        file: file,
    });
}

const dummyData = {
    "latitude": {
        "1027": 44.2365,
        "1653": 44.4744,
        "2345": 44.712,
        "2644": 44.6803,
        "3169": 45.3978,
        "3477": 44.6208,
        "3709": 45.5064,
        "4758": 44.4955
    },
    "longitude": {
        "1027": -72.1486,
        "1653": -72.3249,
        "2345": -73.4962,
        "2644": -73.7414,
        "3169": -73.619,
        "3477": -72.5141,
        "3709": -72.1042,
        "4758": -72.5017
    },
    "timestamp": {
        "1027": "2025-02-12 19:00:00",
        "1653": "2025-03-10 21:00:00",
        "2345": "2025-04-08 17:00:00",
        "2644": "2025-04-21 04:00:00",
        "3169": "2025-05-13 01:00:00",
        "3477": "2025-05-25 21:00:00",
        "3709": "2025-06-04 13:00:00",
        "4758": "2025-07-18 06:00:00"
    },
    "temperature": {
        "1027": 38.0,
        "1653": 40.0,
        "2345": 34.8,
        "2644": 38.9,
        "3169": 38.3,
        "3477": 35.7,
        "3709": 39.4,
        "4758": 35.4
    },
    "humidity": {
        "1027": 10.0,
        "1653": 10.0,
        "2345": 14.0,
        "2644": 26.0,
        "3169": 28.0,
        "3477": 13.0,
        "3709": 31.0,
        "4758": 28.0
    },
    "wind_speed": {
        "1027": 34.0,
        "1653": 33.0,
        "2345": 33.0,
        "2644": 38.0,
        "3169": 40.0,
        "3477": 40.0,
        "3709": 40.0,
        "4758": 29.0
    },
    "precipitation": {
        "1027": 0.1,
        "1653": 1.4,
        "2345": 0.3,
        "2644": 1.2,
        "3169": 0.7,
        "3477": 0.1,
        "3709": 0.7,
        "4758": 0.4
    },
    "vegetation_index": {
        "1027": 58.0,
        "1653": 71.0,
        "2345": 78.0,
        "2644": 68.0,
        "3169": 80.0,
        "3477": 60.0,
        "3709": 79.0,
        "4758": 76.0
    },
    "human_activity_index": {
        "1027": 97.0,
        "1653": 95.0,
        "2345": 76.0,
        "2644": 77.0,
        "3169": 98.0,
        "3477": 86.0,
        "3709": 99.0,
        "4758": 94.0
    }
}

export const trainModel = async() => {
    // return await axios.post(BACKEND_URL + "model/predict", {
    //     file: file
    // })
    return Object.keys(dummyData.latitude).map(key => ({
        id: key,
        latitude: dummyData.latitude[key],
        longitude: dummyData.longitude[key],
        timestamp: dummyData.timestamp[key],
        temperature: dummyData.temperature[key],
        humidity: dummyData.humidity[key],
        wind_speed: dummyData.wind_speed[key],
        precipitation: dummyData.precipitation[key],
        vegetation_index: dummyData.vegetation_index[key],
        human_activity_index: dummyData.human_activity_index[key],
    }));

}