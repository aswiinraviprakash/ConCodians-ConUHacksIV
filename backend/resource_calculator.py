import pandas as pd
import heapq

# Define available resources
resources = {
    "Smoke Jumpers": {"deployment_time": 30, "cost": 5000, "available": 5},
    "Fire Engines": {"deployment_time": 60, "cost": 2000, "available": 10},
    "Helicopters": {"deployment_time": 45, "cost": 8000, "available": 3},
    "Tanker Planes": {"deployment_time": 120, "cost": 15000, "available": 2},
    "Ground Crews": {"deployment_time": 90, "cost": 3000, "available": 8},
}

damage_costs = {"low": 50000, "medium": 100000, "high": 200000}
priority_map = {'high': 3, 'medium': 2, 'low': 1}

def load_wildfire_data(file_path):
    df = pd.read_csv(file_path)
    
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['fire_start_time'] = pd.to_datetime(df['fire_start_time'])
    # Map the third column (e.g., 'priority') to specific values
    df["severity"] = df["severity"].str.lower()
    
    df['severity'] = df['severity'].map({'high': 3, 'medium': 2, 'low': 1})
    
    sorted_data = df.sort_values(by=["timestamp", "fire_start_time", "severity"], ascending=[True, True, False])
    sorted_data['severity'] = df['severity'].map({3: 'high', 2: 'medium', 1: 'low'})
    return sorted_data

def deploy_resources(df):
    stats = {"addressed": {"low": 0, "medium": 0, "high": 0}, "missed": {"low": 0, "medium": 0, "high": 0}}
    total_costs = {"operational": 0, "damage": 0}

    priority_queue = []

    for resource, details in resources.items():
        heapq.heappush(priority_queue, (-details["available"], details["deployment_time"], details["cost"], resource))

    for _, fire in df.iterrows():
        severity = fire["severity"]

        available, deployment_time, operation_cost, resource_name = heapq.heappop(priority_queue)
        available = -available
        if available > 0:
            available = available - 1;
            total_costs["operational"] += operation_cost
            stats["addressed"][severity] += 1
            heapq.heappush(priority_queue, (-available, deployment_time, operation_cost, resource_name))
        else:
            stats["missed"][severity] += 1
            total_costs["damage"] += damage_costs[severity]

    return stats, total_costs

def generate_report(stats, costs):
    print("Wildfire Resource Deployment Report")
    print(f"Number of fires addressed: {sum(stats['addressed'].values())}")
    print(f"Number of fires missed: {sum(stats['missed'].values())}")
    print(f"Total operational costs: ${costs['operational']}")
    print(f"Estimated damage costs from missed responses: ${costs['damage']}")
    print(f"Fire severity report: {stats['addressed']}")

if __name__ == "__main__":
    wildfire_data = load_wildfire_data("current_wildfiredata.csv")
    stats, costs = deploy_resources(wildfire_data)
    generate_report(stats, costs)

