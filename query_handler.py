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
<<<<<<< HEAD
    query = "explain (analyze, verbose, format json) {}".format(data["query"])
=======
    query = "explain (analyze,buffers,verbose, format json) {}".format(data["query"])
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
    conn = connect(data)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        plan = cursor.fetchall()
    except Exception as err:
        print(err)
        return "Query Error : Please check input"

    return plan[0][0][0]

    