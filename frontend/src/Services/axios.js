import axios from 'axios';


const BACKEND_URL ="http://localhost:8000/";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.withCredentials = true;

//gets the history of the fires
export const getHistory  = async() => {
    //TEMP
    try {
        const res = await axios.get(BACKEND_URL + "history");
        // console.log(response?.data);
        // let res =  [
        //     {
        //         "fire_count": 28,
        //         "history_id": 5,
        //         "op_cost": "123000",
        //         "low_severity": 13,
        //         "high_severity": 5,
        //         "d_med_severity": 1,
        //         "delayed_fire_count": 4,
        //         "stamp": "2025-02-01T21:35:26",
        //         "filename": null,
        //         "damage_cost": "550000",
        //         "med_severity": 10,
        //         "d_low_severity": 1,
        //         "d_high_severity": 2
        //     },
        //     {
        //         "fire_count": 28,
        //         "history_id": 6,
        //         "op_cost": "123000",
        //         "low_severity": 13,
        //         "high_severity": 5,
        //         "d_med_severity": 1,
        //         "delayed_fire_count": 4,
        //         "stamp": "2025-02-01T21:36:43",
        //         "filename": "current_wildfiredata.csv",
        //         "damage_cost": "550000",
        //         "med_severity": 10,
        //         "d_low_severity": 1,
        //         "d_high_severity": 2
        //     },
        //     {
        //         "fire_count": 28,
        //         "history_id": 7,
        //         "op_cost": "123000",
        //         "low_severity": 13,
        //         "high_severity": 5,
        //         "d_med_severity": 1,
        //         "delayed_fire_count": 4,
        //         "stamp": "2025-02-01T21:51:11",
        //         "filename": "current_wildfiredata.csv",
        //         "damage_cost": "550000",
        //         "med_severity": 10,
        //         "d_low_severity": 1,
        //         "d_high_severity": 2
        //     },
        //     {
        //         "fire_count": 28,
        //         "history_id": 8,
        //         "op_cost": "123000",
        //         "low_severity": 13,
        //         "high_severity": 5,
        //         "d_med_severity": 1,
        //         "delayed_fire_count": 4,
        //         "stamp": "2025-02-01T21:51:58",
        //         "filename": "current_wildfiredata.csv",
        //         "damage_cost": "550000",
        //         "med_severity": 10,
        //         "d_low_severity": 1,
        //         "d_high_severity": 2
        //     }
        // ]
        return  res?.data.map(item => ({
            ...item,
            id: item.history_id,
            history_id: undefined
        }));
    } catch (err){
        console.log(err);
    }

}

//uploading the file to calculate the current fire report results
export const submitFile = async(file) => {
    console.log("File",file);
    const form = new FormData();
    form.append('file', file);
    const res = await axios.post(BACKEND_URL + "resource/calculate", form, {
        headers: {
            "Content-Type": 'multipart/form-data',
        }
    });

    return res;
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
    }
}

//uploading file to predict the future fires 
export const trainModel = async(file) => {
    console.log("File",file);
    const form = new FormData();
    form.append('file', file);
    return await axios.post(BACKEND_URL + "model/predict", form, {
        
        headers: {
            "Content-Type": 'multipart/form-data',
        }
    })
    // return  Object.keys(dummyData.latitude).map(key => ({
    //     id: key,
    //     latitude: dummyData.latitude[key],
    //     longitude: dummyData.longitude[key]
    // }));
}