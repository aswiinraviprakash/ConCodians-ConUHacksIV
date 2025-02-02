from datetime import datetime

from backend import resource_calculator, database
from backend.resource_calculator import deploy_resources


def write_to_db(response):
    db = database.get_db()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    history = database.Item(stamp=current_time, filename=response.get("filename"), fire_count=response.get("fire_count"),
                            delayed_fire_count=response.get("delayed_fire_count"), op_cost=response.get("op_cost"),
                            damage_cost=response.get("damage_cost"), low_severity=response.get("low_severity"),
                            med_severity=response.get("med_severity"), high_severity=response.get("high_severity"), d_low_severity=response.get("d_low_severity"),
                            d_med_severity=response.get("d_med_severity"), d_high_severity=response.get("d_high_severity"))
    db.add(history)
    db.commit()
    db.refresh(history)
    db.close()
    return history



def calculate_and_store(df, filename):
    wildfire_data = resource_calculator.parse_wildfire_data(df)
    stats, costs = deploy_resources(wildfire_data)

    response = {
        "filename": filename,
        "fire_count": stats.get("addressed").get("low") + stats.get("addressed").get("medium") + stats.get("addressed").get("high"),
        "delayed_fire_count": stats.get("missed").get("low") + stats.get("missed").get("medium") + stats.get("missed").get("high"),
        "op_cost": costs.get("operational"),
        "damage_cost": costs.get("damage"),
        "low_severity": stats.get("addressed").get("low"),
        "med_severity": stats.get("addressed").get("medium"),
        "high_severity": stats.get("addressed").get("high"),
        "d_low_severity": stats.get("missed").get("low"),
        "d_med_severity": stats.get("missed").get("medium"),
        "d_high_severity": stats.get("missed").get("high")
    }

    write_to_db(response)

    return response


def get_history():
    db = database.get_db()
    response = db.query(database.Item).all()
    db.close()
    return response
