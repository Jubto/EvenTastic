import connexion
import six

from swagger_server.models.invalid_input_error import InvalidInputError
from swagger_server.models.unexpected_service_error import UnexpectedServiceError
from swagger_server.models.venue import Venue
from swagger_server.models.venue_list import VenueList
from swagger_server.models.venue_not_found_error import VenueNotFoundError
from swagger_server import util


###############################################
#                                             #
# Mock Venues Service for front end testing.  #
#                                             #
###############################################

# used to simulate a database of Venues
_venues_dict = {}

# used to simulate account id generation by the database
_venue_id = 0


def get_new_venue_id():
    global _venue_id
    _venue_id = _venue_id + 1
    return _venue_id


def create_venue(body):
    """Used to create a Venue.

    :param body: Venue object containing Venue details.
    :type body: dict | bytes

    :rtype: Venue
    """
    try:
        global _venues_dict

        # convert the client request body to Venue object
        if connexion.request.is_json:
            venue = Venue.from_dict(connexion.request.get_json())

        # Create a new Venue ID (will be done by the database in the real service)
        venue.venue_id = get_new_venue_id()
        # Store new Venue object in the mock database which is just a dictionary
        _venues_dict[venue.venue_id] = venue
        # if successful, return the created Venue in the response
        return venue, 201, {'Access-Control-Allow-Origin': '*'}
    except Exception as err:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(err))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def get_venue_details(venue_id):
    """Retrieve Venue details by Venue ID.

    :param venue_id: ID of the Venue to be retrieved.
    :type venue_id: int

    :rtype: Venue
    """
    try:
        try:
            # attempt to get Venue from the store/database
            venue = _venues_dict[venue_id]
        except KeyError as ke:
            # return 401 if error if Venue does not exist
            return VenueNotFoundError(
                code=401, type="VenueNotFoundError", 
                message="The following Venue does not exist: " + str(venue_id)), 401, {'Access-Control-Allow-Origin': '*'}
        # If successful, return the Venue object
        return venue, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def list_venues(venue_name=None):
    """Retrieve a List of Venues. Search by Venue Name.

    :param venue_name: The Venue Name to search for.
    :type venue_name: str

    :rtype: VenueList
    """
    try:
        venue_list = []
        for id, venue in _venues_dict.items():
            venue_list.append(venue)

        # filter the list of venues by venue name
        if venue_name:
            filtered = list(filter(lambda venue: venue_name in venue.venue_name, venue_list))
            return filtered, 200, {'Access-Control-Allow-Origin': '*'}

        # otherwise, just return the unfiltered list of Venues
        return venue_list, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 
