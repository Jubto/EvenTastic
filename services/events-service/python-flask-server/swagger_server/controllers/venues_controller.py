import connexion
import six

from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server.models.venue import Venue  # noqa: E501
from swagger_server.models.venue_list import VenueList  # noqa: E501
from swagger_server.models.venue_not_found_error import VenueNotFoundError  # noqa: E501
from swagger_server import util


def create_venue(body):  # noqa: E501
    """Used to create a Venue.

     # noqa: E501

    :param body: Venue object containing Venue details.
    :type body: dict | bytes

    :rtype: Venue
    """
    if connexion.request.is_json:
        body = Venue.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_venue_details(venue_id):  # noqa: E501
    """Retrieve Venue details by Venue ID.

     # noqa: E501

    :param venue_id: ID of the Venue to be retrieved.
    :type venue_id: int

    :rtype: Venue
    """
    return 'do some magic!'


def list_venues(venue_name=None):  # noqa: E501
    """Retrieve a List of Venues. Search by Venue Name.

     # noqa: E501

    :param venue_name: The Venue Name to search for.
    :type venue_name: str

    :rtype: VenueList
    """
    return 'do some magic!'
