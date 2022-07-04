import connexion
import six

from swagger_server.models.ticket_list import TicketList  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def list_tickets(event_id=None, ticket_status=None, booking_id=None):  # noqa: E501
    """Retrieve a List of Tickets. Search by Event ID and Ticket Status.

     # noqa: E501

    :param event_id: The Event ID to search for.
    :type event_id: str
    :param ticket_status: The Ticket Status to search for.
    :type ticket_status: str
    :param booking_id: The Booking ID to search for.
    :type booking_id: str

    :rtype: TicketList
    """
    return 'do some magic!'
