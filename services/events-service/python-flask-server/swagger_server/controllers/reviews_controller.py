import connexion
import six

from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.review import Review  # noqa: E501
from swagger_server.models.review_interaction import ReviewInteraction  # noqa: E501
from swagger_server.models.review_interaction_not_found_error import ReviewInteractionNotFoundError  # noqa: E501
from swagger_server.models.review_list import ReviewList  # noqa: E501
from swagger_server.models.review_not_found_error import ReviewNotFoundError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_review(body):  # noqa: E501
    """Used to create a Review.

     # noqa: E501

    :param body: Review object containing the Review details.
    :type body: dict | bytes

    :rtype: Review
    """
    if connexion.request.is_json:
        body = Review.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def create_review_interaction(body):  # noqa: E501
    """Used to create a Review Intercation record.

     # noqa: E501

    :param body: Review Interaction object containing the Review Interaction details.
    :type body: dict | bytes

    :rtype: ReviewInteraction
    """
    if connexion.request.is_json:
        body = ReviewInteraction.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def list_reviews(event_id=None, interaction_acount_id=None):  # noqa: E501
    """Retrieve a List of Reviews. Search by Event ID and Interaction Account ID.

     # noqa: E501

    :param event_id: The Event to search.
    :type event_id: str
    :param interaction_acount_id: The ID of the user who is reading the review.
    :type interaction_acount_id: str

    :rtype: ReviewList
    """
    return 'do some magic!'


def update_review(review_id, body):  # noqa: E501
    """Used to update a Review. Replaces the Review resource.

     # noqa: E501

    :param review_id: ID of the Review to be updated.
    :type review_id: int
    :param body: Review object to update.
    :type body: dict | bytes

    :rtype: Review
    """
    if connexion.request.is_json:
        body = Review.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_review_interaction(interaction_id, body):  # noqa: E501
    """Used to update a Review Interaction record.

     # noqa: E501

    :param interaction_id: ID of the Review Interaction record to be updated.
    :type interaction_id: int
    :param body: Review Interaction object to update.
    :type body: dict | bytes

    :rtype: ReviewInteraction
    """
    if connexion.request.is_json:
        body = ReviewInteraction.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
