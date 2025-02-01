import database
from datetime import datetime

def write_to_db(response):
    db = database.get_db()
    severity = response.get("severity")

    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    history = database.Item(stamp=current_time, filename=response.get("file_name"), fire_count=response.get("fire_count"),
                            delayed_fire_count=response.get("delayed_fire_count"), op_cost=response.get("op_cost"),
                            damage_cost=response.get("damage_cost"), low_severity=severity.get("low"),
                            med_severity=severity.get("medium"), high_severity=severity.get("high"))
    db.add(history)
    db.commit()
    db.refresh(history)
    return history



def calculate_and_store(df, filename):
    response = {
        "file_name": filename,
        "fire_count": 28,
        "delayed_fire_count": 4,
        "op_cost": 123000,
        "damage_cost": 550000,
        "severity": {
            "low": 13,
            "medium": 10,
            "high": 5
        }
    }

    write_to_db(response)

    return response


def get_history():
    return database.get_db().query(database.Item).all()
