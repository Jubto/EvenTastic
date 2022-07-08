import connexion
import six

from swagger_server.models.event import Event  # noqa: E501
from swagger_server.models.event_list import EventList  # noqa: E501
from swagger_server.models.event_not_found_error import EventNotFoundError  # noqa: E501
from swagger_server.models.event_status_update import EventStatusUpdate  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_event(body):  # noqa: E501
    """Used to create an Event.

     # noqa: E501

    :param body: Event object containing the Event details.
    :type body: dict | bytes

    :rtype: Event
    """
    if connexion.request.is_json:
        body = Event.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_event_details(event_id):  # noqa: E501
    """Retrieve Event details by Event ID.

     # noqa: E501

    :param event_id: ID of the Event to be retrieved.
    :type event_id: int

    :rtype: Event
    """
    return 'do some magic!'


def list_events(event_title=None, event_category=None, event_desc=None, host_id=None, event_status=None):  # noqa: E501
    """Retrieve a List of Events. Search by Event Title, Event category or Event Description.

     # noqa: E501

    :param event_title: The Event Title to search for.
    :type event_title: str
    :param event_category: The Event Category to search for.
    :type event_category: str
    :param event_desc: The Event Description to search for.
    :type event_desc: str
    :param host_id: The Host ID to search for.
    :type host_id: str
    :param event_status: The Event Status to search for.
    :type event_status: str

    :rtype: EventList
    """
    return 'do some magic!'


def update_event(event_id, body):  # noqa: E501
    """Used to update the Event details. Replaces the Event resource.

     # noqa: E501

    :param event_id: ID of the Event to be updated.
    :type event_id: int
    :param body: Event object to update. Performs a complete replace of the Event details.
    :type body: dict | bytes

    :rtype: Event
    """
    if connexion.request.is_json:
        body = Event.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_event_status(event_id, body):  # noqa: E501
    """Used to update the Status of a single Event e.g. Cancel an Event.

     # noqa: E501

    :param event_id: ID of the Event to be updated.
    :type event_id: int
    :param body: The patch operation to perform. Only Event status update is supported.
    :type body: dict | bytes

    :rtype: Event
    """
    if connexion.request.is_json:
        body = EventStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
