import connexion
import six

from swagger_server.models.event import Event  # noqa: E501
from swagger_server.models.event_list import EventList  # noqa: E501
from swagger_server.models.event_not_found_error import EventNotFoundError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def get_event_details(event_id):  # noqa: E501
    """Retrieve Event details by Event ID.

     # noqa: E501

    :param event_id: ID of the Event to be retrieved.
    :type event_id: int

    :rtype: Event
    """
    return 'do some magic!'


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
    return 'do some magic!'
