import psycopg2
import json

def connect(data):
    db_name = data["db_name"]
    user = data["user"]
    password = data["password"] 
    host = data["host"]
    port = data["port"]

    try:
        conn = psycopg2.connect(database=db_name, user=user, password=password, host=host, port=port)
        return conn
    except Exception as err:
        print(err)
        return ""

def query_handler(data):
    query = "explain (analyze,buffers,verbose, format json) {}".format(data["query"])
    conn = connect(data)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        plan = cursor.fetchall()
    except Exception as err:
        print(err)
        return "Query Error : Please check input"

    return plan[0][0][0]

    