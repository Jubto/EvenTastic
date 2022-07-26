import schedule
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import datetime


def call_me():
    port = 5432
    host = "localhost"
    user = "postgres"
    password = "postgrespw"
    database = 'eventastic'
    con = psycopg2.connect(database=database, user=user,
                           password=password, host=host, port=port)
    con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = con.cursor()

    cur.execute("SELECT * FROM events where event_status='UPCOMING';")
    CurrentDate = datetime.datetime.now()
    records = cur.fetchall()
    for row in records:
        end_time = row[13]
        end_time = datetime.datetime.strptime(end_time, '%Y-%m-%dT%H:%M:%S')
        event_id = row[0]
        if CurrentDate > end_time:
            cur.execute(
                f"Update events SET event_status='COMPLETED' where event_id={event_id};")

    cur.close()
    con.close()


schedule.every().hour.do(call_me)

while True:
    schedule.run_pending()
