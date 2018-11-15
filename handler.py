import json
from query_handler import connect, query_handler

"""
    Message type:
    0: Check Connection
    1: Visualize Query Execution Plan; Input: Query
    2: Input: Plan
"""

defaultDBData = {
    "db_name" : "CZ4031",
    "user" : "postgres",
    "password" : "postgres",
    "host" : "localhost",
    "port" : "5432"
}

def handler(payload):
    action_type = payload["type"]
    data = payload["data"]

    if action_type == 0: 
        result = connect(data)
        if result:
            defaultDBData["db_name"] = data["db_name"]
            defaultDBData["user"] = data["user"]
            defaultDBData["password"] = data["password"]
            defaultDBData["host"] = data["host"]
            defaultDBData["port"] = data["port"]
            return "Connection Successful!"
        else:
            return "Unable to establish connection to the database, Please check your credentials!"

    elif action_type == 1:
        data["db_name"] = defaultDBData["db_name"]
        data["user"] = defaultDBData["user"]
        data["password"] = defaultDBData["password"]
        data["host"] = defaultDBData["host"]
        data["port"] = defaultDBData["port"]
        result = query_handler(data)
        return result 
    
    elif action_type == 2:
        return data["plan"]

    else:
        print("Type not valid")