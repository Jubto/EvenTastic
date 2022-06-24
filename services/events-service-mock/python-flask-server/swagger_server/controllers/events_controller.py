import connexion
import six

from swagger_server.models.event import Event
from swagger_server.models.event_list import EventList
from swagger_server.models.event_not_found_error import EventNotFoundError
from swagger_server.models.unexpected_service_error import UnexpectedServiceError
from swagger_server import util

###############################################
#                                             #
# Mock Events Service for front end testing.  #
#                                             #
###############################################

# used to simulate a database of Events
_events_dict = {}

# lets add some Events to the database ...
event1 = {
    "event_category": "Music",
    "event_desc": "STRICTLY KPOP & K-HIPHOP! KPOP ALBUM GIVEAWAYS! LIVE DJS!",
    "event_end_datetime": "2022-08-25T21:00:00+10:00",
    "event_id": 1,
    "event_img": "1603dfd6-efb6-11ec-8ea0-0242ac120002.jpeg",
    "event_location": "Shark Hotel Sydney, NSW",
    "event_short_desc": "Sydney KPOP Party BTS Special!",
    "event_start_datetime": "2022-08-25T19:00:00+10:00",
    "event_title": "Sydney KPOP Party",
    "host_id": 12,
    "tags": [
        {
            "name": "Pop Music"
        }
    ],
    "venue_id": 1
    }

event2 = {
    "event_category": "Music",
    "event_desc": "Catch Red Hot Chili Peppers live for the tour of their new album Unlimited Love ...",
    "event_end_datetime": "2022-08-25T21:00:00+10:00",
    "event_id": 2,
    "event_img": "1603dfd6-efb6-11ec-8ea0-0242ac120003.jpeg",
    "event_location": "Sydney Entertainment Centre",
    "event_short_desc": "RHCP Live ! Don't miss out !",
    "event_start_datetime": "2022-08-25T19:00:00+10:00",
    "event_title": "Red Hot Chili Peppers Live",
    "host_id": 8,
    "tags": [
        {
            "name": "Rock"
        },
        {
            "name": "Funk"
        }
    ],
    "venue_id": 2
    }

event3 = {
    "event_category": "Arts",
    "event_desc": "Four of Sydney's best improv comedy teams will battle for glory. You - the audience - will decide who wins on the night!",
    "event_end_datetime": "2022-10-10T21:00:00+10:00",
    "event_id": 3,
    "event_img": "1603dfd6-efb6-11ec-8ea0-0242ac120004.jpeg",
    "event_location": "Potts Point Hotel, Potts Point, NSW",
    "event_short_desc": "Lots of laughs ! Don't miss out !",
    "event_start_datetime": "2022-10-10T18:00:00+10:00",
    "event_title": "Improv Comedy Night",
    "host_id": 8,
    "tags": [
        {
            "name": "Dance"
        },
        {
            "name": "Comedy"
        }
    ],
    "venue_id": 3
    }

_events_dict[1] = Event.from_dict(event1)
_events_dict[2] = Event.from_dict(event2)
_events_dict[3] = Event.from_dict(event3)


def get_event_details(event_id):
    """Retrieve Event details by Event ID.

    :param event_id: ID of the Event to be retrieved.
    :type event_id: int

    :rtype: Event
    """
    try:
        try:
            # attempt to get Event from the store/database
            temp = _events_dict[event_id]
        except KeyError as ke:
            # return 401 if error if Event does not exist
            return EventNotFoundError(
                code=401, type="EventNotFoundError", 
                message="The following Event does not exist: " + str(event_id)), 401, {'Access-Control-Allow-Origin': '*'}
        # If successful, return the Event object
        return temp, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def list_events(event_title=None, event_category=None, event_desc=None):
    """Retrieve a List of Events. Search by Event Title, Event category or Event Description.

    :param event_title: The Event Title to search for.
    :type event_title: str
    :param event_category: The Event Category to search for.
    :type event_category: str
    :param event_desc: The Event Description to search for.
    :type event_desc: str

    :rtype: EventList
    """
    try:
        event_list = []
        for id, event in _events_dict.items():
            event_list.append(event)

        # filter the list of Events by Event Title, Event category or Event Description (only Event Title implemented atm).
        if event_title:
            filtered = list(filter(
                lambda event: event_title in event.event_title, event_list))
            return filtered, 200, {'Access-Control-Allow-Origin': '*'}
        
        # otherwise, just return the unfiltered list of Accounts
        return event_list, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}
