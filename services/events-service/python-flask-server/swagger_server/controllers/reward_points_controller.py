import connexion
import six

from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.reward_points import RewardPoints  # noqa: E501
from swagger_server.models.reward_points_list import RewardPointsList  # noqa: E501
from swagger_server.models.reward_points_not_found_error import RewardPointsNotFoundError  # noqa: E501
from swagger_server.models.reward_points_status_update import RewardPointsStatusUpdate  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_reward_points(body):  # noqa: E501
    """Used to create a Reward Points.

     # noqa: E501

    :param body: Reward Points object containing the Reward Points details.
    :type body: dict | bytes

    :rtype: RewardPoints
    """
    if connexion.request.is_json:
        body = RewardPoints.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_reward_points_details(reward_points_id):  # noqa: E501
    """Retrieve Reward Points details by Reward Points ID.

     # noqa: E501

    :param reward_points_id: ID of the Reward Points to be retrieved.
    :type reward_points_id: int

    :rtype: RewardPoints
    """
    return 'do some magic!'


def list_reward_points(event_id=None, booking_id=None, reward_points_status=None):  # noqa: E501
    """Retrieve a List of Reward Points.

     # noqa: E501

    :param event_id: The Event ID to search for.
    :type event_id: str
    :param booking_id: The Booking ID to search for.
    :type booking_id: str
    :param reward_points_status: The Reward Points Status to search for.
    :type reward_points_status: str

    :rtype: RewardPointsList
    """
    return 'do some magic!'


def update_reward_points_status(reward_points_id, body):  # noqa: E501
    """Used to update the Status of a single Event e.g. Cancel an Event.

     # noqa: E501

    :param reward_points_id: ID of the Reward Points to be updated.
    :type reward_points_id: int
    :param body: The patch operation to perform. Only Reward Points status update is supported.
    :type body: dict | bytes

    :rtype: RewardPoints
    """
    if connexion.request.is_json:
        body = RewardPointsStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
