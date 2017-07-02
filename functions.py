import psycopg2


def import_config():
    """Get the credentials for database access"""
    with open("config.txt") as config:
        config = config.readlines()
    return config


def database_query():
    """Make a database query"""
    query = """
            SELECT *
            FROM swu_user;
            """
    config = import_config()
    try:
        connect_str = "dbname={} user={} host='localhost' password={}".format(config[0], config[0], config[1])
        conn = psycopg2.connect(connect_str)
        with conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                query_result = cursor.fetchall()
                column_names = [desc[0] for desc in cursor.description]
                query_result.insert(0, column_names)
                query_status = "OK"
                return (query_result, query_status)
    except:
        query_status = "The database cannot be accessed"
        return query_status


def database_update(username, password):
    """Make a database query"""
    query = """
            INSERT INTO swu_user (username, password)
            VALUES ('{}', '{}');
            """.format(username, password)
    config = import_config()
    try:
        connect_str = "dbname={} user={} host='localhost' password={}".format(config[0], config[0], config[1])
        conn = psycopg2.connect(connect_str)
        with conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                status = "OK"
                return status
    except:
        status = "The database cannot be accessed"
        return status
