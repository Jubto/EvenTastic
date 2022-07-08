import connexion
import six

from swagger_server.models.booking import Booking  # noqa: E501
from swagger_server.models.booking_list import BookingList  # noqa: E501
from swagger_server.models.booking_not_found_error import BookingNotFoundError  # noqa: E501
from swagger_server.models.booking_status_update import BookingStatusUpdate  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_booking(body):  # noqa: E501
    """Used to create a Booking.

     # noqa: E501

    :param body: Booking object containing the Booking details.
    :type body: dict | bytes

    :rtype: Booking
    """
    if connexion.request.is_json:
        body = Booking.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_booking_details(booking_id):  # noqa: E501
    """Retrieve Booking details by Booking ID.

     # noqa: E501

    :param booking_id: ID of the Booking to be retrieved.
    :type booking_id: int

    :rtype: Booking
    """
    return 'do some magic!'


def list_bookings(account_id=None, booking_status=None, event_id=None):  # noqa: E501
    """Retrieve a List of Bookings. Search by Account ID and Booking Status.

     # noqa: E501

    :param account_id: The Account ID to search for.
    :type account_id: str
    :param booking_status: The Booking Status to search for.
    :type booking_status: str
    :param event_id: The Event ID to search for.
    :type event_id: str

    :rtype: BookingList
    """
    return 'do some magic!'


def update_booking_status(booking_id, body):  # noqa: E501
    """Used to update the Status of a single Booking e.g. Cancel a Booking.

     # noqa: E501

    :param booking_id: ID of the Booking to be updated.
    :type booking_id: int
    :param body: The patch operation to perform. Only Booking status update is supported.
    :type body: dict | bytes

    :rtype: Booking
    """
    if connexion.request.is_json:
        body = BookingStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
