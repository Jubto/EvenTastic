import connexion
import six
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

from swagger_server.models.event import Event  # noqa: E501
from swagger_server.models.event_list import EventList  # noqa: E501
from swagger_server.models.event_status_update import EventStatusUpdate
from swagger_server.models.event_not_found_error import EventNotFoundError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server import util

port=5432 #Change according to port in Docker
host='localhost'

def create_event(body):  # noqa: E501
    """Used to create an Event.

     # noqa: E501

    :param body: Event object containing the Event details.
    :type body: dict | bytes

    :rtype: Event
    """
    try: 
        if connexion.request.is_json:
            body = Event.from_dict(connexion.request.get_json())  # noqa: E501

        if (len(str(body.account_id)) == 0 or len(str(body.host_id)) == 0 or len(str(body.venue_id)) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: Account ID or Host ID or Venue ID")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        if body.tags is None: tags_string = ""
        else:
            tags_string = "" 
            if body.tags:
                tag_length = len(body.tags)
                i=0
                for tag in body.tags:
                    if i < tag_length-1:
                        tags_string = tags_string + tag.name + ','
                    else:
                        tags_string = tags_string + tag.name
                    i+=1

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        if body.event_id != None:
            cur.execute("SELECT * FROM events where event_id = '"+str(body.event_id)+"';")
            record = cur.fetchone()
            if record != None:
                error = InvalidInputError(code=409, type="InvalidInputError", 
                        message="The provided event already exists in database.")
                cur.close()
                con.close()
                return error, 400, {'Access-Control-Allow-Origin': '*'}
        
        insert_string = "INSERT INTO events VALUES (default, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING event_id;"
        cur.execute(insert_string, (body.host_id, body.account_id, body.venue_id, body.gen_seat_price, \
                body.front_seat_price, body.mid_seat_price, body.back_seat_price, body.event_title, body.event_category, \
                body.event_short_desc, body.event_desc, body.event_start_datetime, body.event_end_datetime, body.event_location, \
                body.event_img, body.event_status, tags_string))
        body.event_id = cur.fetchone()[0]
        print("New ID is:\n")
        print(body.event_id)

        cur.close()
        con.close()          
        return body, 201, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}



def create_event_options():  # noqa: E501
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for POST.

     # noqa: E501


    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    }
    return None, 200, response_headers


def get_event_details(event_id):  # noqa: E501
    """Retrieve Event details by Event ID.

     # noqa: E501

    :param event_id: ID of the Event to be retrieved.
    :type event_id: int

    :rtype: Event
    """

    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host='localhost', port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        cur.execute('SELECT * FROM events where event_id = ' + str(event_id))
        record = cur.fetchone()
        if record != None:
            event = dict()
            event['event_id'] = str(record[0])
            event['host_id'] = str(record[1])
            event['account_id'] = str(record[2])
            event['venue_id'] = str(record[3])
            event['gen_seat_price'] = str(record[4])
            event['front_seat_price'] = str(record[5])
            event['mid_seat_price'] = str(record[6])
            event['back_seat_price'] = str(record[7])
            
            event['event_title'] = str(record[8])
            event['event_category'] = str(record[9])
            event['event_short_desc'] = str(record[10])
            event['event_desc'] = str(record[11])
            event['event_start_datetime'] = str(record[12])
            event['event_end_datetime'] = str(record[13])
            event['event_location'] = str(record[14])
            event['event_img'] = str(record[15])
            event['event_status'] = str(record[16])
            tags = str(record[17]).split(',')
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
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        cur.close()
        con.close()
        return event, 200, {'Access-Control-Allow-Origin': '*'} 
        
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        cur.close()
        con.close()
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def list_events(event_title=None, event_category=None, event_desc=None, host_id=None, event_status=None):  # noqa: E501
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
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host='localhost', port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        if (event_title != None and event_desc != None and event_category != None):
            cur.execute("SELECT * FROM events where event_title ~* '"+str(event_title)+"' and event_desc ~* '"+str(event_desc)+"' and event_category ~* '"+str(event_category)+"';") #all 3
        elif (event_title != None and event_desc != None):
            cur.execute("SELECT * FROM events where event_title ~* '"+str(event_title)+"' and event_desc ~* '"+str(event_desc)+"';") #title and desc
        elif (event_title != None and event_category != None):
            cur.execute("SELECT * FROM events where event_title ~* '"+str(event_title)+"' and event_category ~* '"+str(event_category)+"';") #title and category
        elif (event_desc != None and event_category != None):
            cur.execute("SELECT * FROM events where event_desc ~* '"+str(event_desc)+"' and event_category ~* '"+str(event_category)+"';") #desc and category
        elif (event_title != None):
            cur.execute("SELECT * FROM events where event_title ~* '"+str(event_title)+"';") #only event title
        elif (event_category != None):
            cur.execute("SELECT * FROM events where event_category ~* '"+str(event_category)+"';") #only event category
        elif (event_desc != None):
            cur.execute("SELECT * FROM events where event_desc ~* '"+str(event_desc)+"';") #only event desc
        elif (host_id != None and event_status != None):
            cur.execute("SELECT * FROM events where host_id = '"+str(host_id)+"' and event_status ~* '"+str(event_status)+"';") #host id and event status
        elif (host_id != None):
            cur.execute("SELECT * FROM events where host_id = '"+str(host_id)+"';") #only host id
        elif (event_status != None):
            cur.execute("SELECT * FROM events where event_status ~* '"+str(event_status)+"';") #only event status
        else:
            cur.execute("SELECT * FROM events")

        records = cur.fetchall()

        
        events = []
        for record in records:
            if record != None:
                event = dict()
                event['event_id'] = str(record[0])
                event['host_id'] = str(record[1])
                event['account_id'] = str(record[2])
                event['venue_id'] = str(record[3])
                event['gen_seat_price'] = str(record[4])
                event['front_seat_price'] = str(record[5])
                event['mid_seat_price'] = str(record[6])
                event['back_seat_price'] = str(record[7])
                
                event['event_title'] = str(record[8])
                event['event_category'] = str(record[9])
                event['event_short_desc'] = str(record[10])
                event['event_desc'] = str(record[11])
                event['event_start_datetime'] = str(record[12])
                event['event_end_datetime'] = str(record[13])
                event['event_location'] = str(record[14])
                event['event_img'] = str(record[15])
                event['event_status'] = str(record[16])
                tags = str(record[17]).split(',')
                tags_list = list()
                for t in tags:
                    tags_list.append({"name": str(t)})
                event['tags'] = tags_list
                events.append(event)

        cur.close()
        con.close()
        return events, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        cur.close()
        con.close()
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_event(event_id, body):  # noqa: E501
    """Used to update the Event details. Replaces the Event resource.

     # noqa: E501

    :param event_id: ID of the Event to be updated.
    :type event_id: int
    :param body: Event object to update. Performs a complete replace of the Event details.
    :type body: dict | bytes

    :rtype: Event
    """
    try:
        if connexion.request.is_json:
            body = Event.from_dict(connexion.request.get_json())  # noqa: E501

            
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        # to check if the event id exists or not
        cur.execute('SELECT * FROM events where event_id = ' + str(event_id))
        record = cur.fetchone()
        if record == None:
            error = EventNotFoundError(code=404, type="EventNotFoundError", 
                    message="The following Event ID does not exist: " + str(event_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        if body.tags is None: tags_string = ""
        else:
            tags_string = ""
            tag_length = len(body.tags)
            i=0
            for tag in body.tags:
                if i < tag_length-1:
                    tags_string = tags_string + tag.name + ','
                else:
                    tags_string = tags_string + tag.name
                i+=1

        #Perform Update
        update_string = "UPDATE events set "

        if body.gen_seat_price != None: update_string += f" gen_seat_price='{body.gen_seat_price}',"
        if body.front_seat_price != None: update_string += f" front_seat_price='{body.front_seat_price}',"
        if body.mid_seat_price != None: update_string += f" mid_seat_price='{body.mid_seat_price}',"
        if body.back_seat_price != None: update_string += f" back_seat_price='{body.back_seat_price}',"
        if body.event_title != None: update_string += f" event_title='{body.event_title}',"
        if body.event_category != None: update_string += f" event_category='{body.event_category}',"
        if body.event_short_desc != None: update_string += f" event_short_desc='{body.event_short_desc}',"
        if body.event_desc != None: update_string += f" event_desc='{body.event_desc}',"
        if body.event_start_datetime != None: update_string += f" event_start_datetime='{body.event_start_datetime}',"
        if body.event_end_datetime != None: update_string += f" event_end_datetime='{body.event_end_datetime}',"
        if body.event_location != None: update_string += f" event_location='{body.event_location}',"
        if body.event_img != None: update_string += f" event_img='{body.event_img}',"
        if body.event_status != None: update_string += f" event_status='{body.event_status}',"
        if tags_string != "": update_string += f" tags='{tags_string}',"

        update_string = list(update_string)
        update_string[-1] = " "
        update_string = "".join(update_string)
        update_string += f" where event_id = {event_id} RETURNING event_id;"  
        cur.execute(update_string)
        body.event_id = cur.fetchone()[0]

        cur.close()
        con.close()                    
        return body, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_event_options(event_id):  # noqa: E501
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

     # noqa: E501

    :param event_id: ID of the Event to be updated.
    :type event_id: int

    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    }
    return None, 200, response_headers


def update_event_status(event_id, body):  # noqa: E501
    """Used to update the Status of a single Event e.g. Cancel an Event.

     # noqa: E501

    :param event_id: ID of the Event to be updated.
    :type event_id: int
    :param body: The patch operation to perform. Only Event status update is supported.
    :type body: dict | bytes

    :rtype: Event
    """
    try:
        if connexion.request.is_json:
            body = EventStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501
        
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        if (len(str(body.op)) == 0 or len(str(body.path)) == 0 or len(str(body.value)) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: operation or path or event-status value")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        # to check if the event id exists or not
        cur.execute('SELECT * FROM events where event_id = ' + str(event_id))
        record = cur.fetchone()
        if record == None:
            error = EventNotFoundError(code=404, type="EventNotFoundError", 
                    message="The following Event ID does not exist: " + str(event_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}
        
        #Perform Update
        update_string = "UPDATE events set "
        if body.value != None: update_string += f" event_status='{body.value}',"

        update_string = list(update_string)
        update_string[-1] = " "
        update_string = "".join(update_string)
        update_string += f" where event_id = {event_id} RETURNING event_id;"  
        cur.execute(update_string)

        event_id = cur.fetchone()[0]

        cur.close()
        con.close()                    
        return body, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}
