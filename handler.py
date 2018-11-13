import json
from query_handler import connect, query_handler
# from index import explain

"""
    Message type:
    0: Check Connection
    1: Explain Query Execution Plan; Input: Query
"""
def handler(payload):
    action_type = payload["type"]
    data = payload["data"]

    if action_type == 0:
        result = connect(data)
        if result:
            return "Connection Successful!"
        else:
            return "Unable to establish connection to the database, Please check your credentials!"

    elif action_type == 1:
        result = query_handler(data)
        return result 

    else:
        print("Type not valid")
