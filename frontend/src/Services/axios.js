import axios from 'axios';

const BACKEND_URL = "https://975b-132-205-229-40.ngrok-free.app/";

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
    const res = await axios.post(BACKEND_URL + "resource/calculate", {
        file: file,
    });

    return res;
}