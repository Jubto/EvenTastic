import connexion
import six
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

from swagger_server.models.event import Event  # noqa: E501
from swagger_server.models.event_list import EventList  # noqa: E501
from swagger_server.models.event_not_found_error import EventNotFoundError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util

port=49153 #Change according to port in Docker


def get_event_details(event_id):  # noqa: E501
    """Retrieve Event details by Event ID.

     # noqa: E501

    :param event_id: ID of the Event to be retrieved.
    :type event_id: int

    :rtype: Event
    """

    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        cur.execute('SELECT * FROM events where event_id = ' + str(event_id))
        record = cur.fetchone()
        if record != None:
            event = dict()
            event['event_id'] = str(record[0])
            event['event_title'] = str(record[3])
            event['event_category'] = str(record[4])
            event['event_short_desc'] = str(record[5])
            event['event_desc'] = str(record[6])
            event['event_start_date'] = str(record[7])
            event['event_start_time'] = str(record[8])
            event['event_end_date'] = str(record[9])
            event['event_end_time'] = str(record[10])
            event['event_location'] = str(record[11])
            event['host_id'] = str(record[1])
            event['venue_id'] = str(record[2])
            event['event_img'] = str(record[12])
            tags = str(record[13]).split(',')
            tags_list = list()
            for t in tags:
                tags_list.append({"name": str(t)})
            event['tags'] = tags_list
        else:
            error = EventNotFoundError(
                    code=404, type="EventNotFoundError", 
                    message="The following Event ID does not exist: " + str(event_id))
            cur.close()
            con.close()
            return error, 404
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500
    cur.close()
    con.close()
    return event, 200


def list_events(event_title=None, event_category=None, event_desc=None):  # noqa: E501
    """Retrieve a List of Events. Search by Event Title, Event category or Event Description.

     # noqa: E501

    :param event_title: The Event Title to search for.
    :type event_title: str
    :param event_category: The Event Category to search for.
    :type event_category: str
    :param event_desc: The Event Description to search for.
    :type event_desc: str

    :rtype: EventList
    """

    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        
        if (event_title != None):
            cur.execute("SELECT * FROM events where event_title = '"+str(event_title)+"';")
        elif (event_category != None):
            cur.execute("SELECT * FROM events where event_category = '"+str(event_category)+"';")
        elif (event_desc != None):
            cur.execute("SELECT * FROM events where event_desc = '"+str(event_desc)+"';")

        records = cur.fetchall()
        print(len(records))
        if len(records) == 0:
            cur.execute("SELECT * FROM events ;") #if nothing matches filter criteria, return unfiltered list of events
            records = cur.fetchall()
        events = []
        for record in records:
            if record != None:
                event = dict()
                event['event_id'] = str(record[0])
                event['event_title'] = str(record[3])
                event['event_category'] = str(record[4])
                event['event_short_desc'] = str(record[5])
                event['event_desc'] = str(record[6])
                event['event_start_date'] = str(record[7])
                event['event_start_time'] = str(record[8])
                event['event_end_date'] = str(record[9])
                event['event_end_time'] = str(record[10])
                event['event_location'] = str(record[11])
                event['host_id'] = str(record[1])
                event['venue_id'] = str(record[2])
                event['event_img'] = str(record[12])
                tags = str(record[13]).split(',')
                tags_list = list()
                for t in tags:
                    tags_list.append({"name": str(t)})
                event['tags'] = tags_list
                events.append(event)

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500

    cur.close()
    con.close()
    return events, 200

