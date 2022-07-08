import connexion
import six
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

from swagger_server.models.booking import Booking  # noqa: E501
from swagger_server.models.booking_list import BookingList  # noqa: E501
from swagger_server.models.booking_not_found_error import BookingNotFoundError  # noqa: E501
from swagger_server.models.booking_status_update import BookingStatusUpdate  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util

port=5432 # update port of postgres running in Docker here
host='localhost'

def create_booking(body):  # noqa: E501
    """Used to create a Booking.

     # noqa: E501

    :param body: Booking object containing the Booking details.
    :type body: dict | bytes

    :rtype: Booking
    """
    
    try: 
        if connexion.request.is_json:
            body = Booking.from_dict(connexion.request.get_json())  # noqa: E501

        if body.account_id == None or body.event_id == None or body.total_cost == None or body.tickets == None:
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: account ID or event ID or total cost or tickets list")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        if len(body.tickets) == 0:
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: tickets list")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        # could check if account id or event id exists in the database

        for type in body.tickets:
            print(type)

        """
        
        insert_string = "INSERT INTO bookings VALUES (default, %s,%s,%s,%s) RETURNING booking_id;"
        cur.execute(insert_string, (body.account_id, body.event_id, body.booking_status, body.total_cost))
        booking_id = cur.fetchone()[0]

        cur.execute("INSERT INTO bookings values (default, 1, 1, 'Booked', 200.0);")
        cur.execute("INSERT INTO tickets values (default, 1, 1, 1, 'F_1', 'Purchased', 'QR', 'Front', 100.0);")
        """

        cur.close()
        con.close()            
        return body, 201, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def get_booking_details(booking_id):  # noqa: E501
    """Retrieve Booking details by Booking ID.

     # noqa: E501

    :param booking_id: ID of the Booking to be retrieved.
    :type booking_id: int

    :rtype: Booking
    """
    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute(f"SELECT booking_id, account_id, event_id, booking_status, total_cost \
                    FROM bookings where booking_id = {booking_id}")
        record = cur.fetchone()
        if record == None:
            error = BookingNotFoundError(code=404, type="BookingNotFoundError", 
                    message="The following Booking ID does not exist: " + str(booking_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        booking = dict()
        booking['booking_id'] = int(record[0])
        b_id = booking['booking_id']
        booking['account_id'] = int(record[1])
        booking['event_id'] = int(record[2])
        booking['booking_status'] = str(record[3])
        booking['total_cost'] = float(record[4])
            
        cur.execute(f"SELECT ticket_type, count(ticket_type) from tickets \
                    where booking_id = {b_id} group by booking_id, ticket_type")
        t_records = cur.fetchall()
        ticket_list = list()
        for t_row in t_records:
            ticket_list.append({ t_row[0]: int(t_row[1]) })    
        booking['tickets'] = ticket_list
                    

        cur.close()
        con.close()
        return booking, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def list_bookings(account_id=None, booking_status=None, event_id=None):  # noqa: E501
    """Retrieve a List of Bookings. Search by Account ID and Booking Status.

     # noqa: E501

    :param account_id: The Account ID to search for.
    :type account_id: str
    :param booking_status: The Booking Status to search for.
    :type booking_status: str

    :rtype: BookingList
    """
    try:
        if account_id == None or booking_status == None:
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: account id or booking status")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute(f"SELECT booking_id, account_id, event_id, booking_status, total_cost \
                    FROM bookings where booking_status = '{booking_status}' and account_id = {account_id}")
        records = cur.fetchall()
        bookings_list = list()
        for record in records:
            booking = dict()
            booking['booking_id'] = int(record[0])
            b_id = booking['booking_id']
            booking['account_id'] = int(record[1])
            booking['event_id'] = int(record[2])
            booking['booking_status'] = str(record[3])
            booking['total_cost'] = float(record[4])
            
            cur.execute(f"SELECT ticket_type, count(ticket_type) from tickets \
                    where booking_id = {b_id} group by booking_id, ticket_type")
            t_records = cur.fetchall()
            ticket_list = list()
            for t_row in t_records:
                ticket_list.append({ t_row[0]: int(t_row[1]) })    
            booking['tickets'] = ticket_list
                    
            bookings_list.append(booking)

        cur.close()
        con.close()
        return bookings_list, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_booking_status(booking_id, body):  # noqa: E501
    """Used to update the Status of a single Booking e.g. Cancel a Booking.

     # noqa: E501

    :param booking_id: ID of the Booking to be updated.
    :type booking_id: int
    :param body: The patch operation to perform. Only Booking status update is supported.
    :type body: dict | bytes

    :rtype: Booking
    """

    try:
        if connexion.request.is_json:
            body = BookingStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute(f"SELECT booking_id FROM bookings where booking_id = {booking_id}")
        record = cur.fetchone()
        if record == None:
            error = BookingNotFoundError(code=404, type="BookingNotFoundError", 
                    message="The following Booking ID does not exist: " + str(booking_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        cur.execute(f"UPDATE bookings set booking_status = '{body.value}' where booking_id = {booking_id}")
        if body.value == 'Cancelled':
            cur.execute(f"UPDATE tickets set ticket_status = 'Available', booking_id = -1 where booking_id = {booking_id}")                    

        cur.close()
        con.close()
        return {"message": "Booking has been updated successfully."}, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}
