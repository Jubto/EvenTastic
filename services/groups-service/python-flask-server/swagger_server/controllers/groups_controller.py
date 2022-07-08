import connexion
import six

from swagger_server.models.group import Group  # noqa: E501
from swagger_server.models.group_list import GroupList  # noqa: E501
from swagger_server.models.group_member import GroupMember  # noqa: E501
from swagger_server.models.group_not_found_error import GroupNotFoundError  # noqa: E501
from swagger_server.models.group_status_update import GroupStatusUpdate  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_group(body):  # noqa: E501
    """Used to create an Group.

     # noqa: E501

    :param body: Event object containing the Group details.
    :type body: dict | bytes

    :rtype: Group
    """
    if connexion.request.is_json:
        body = Group.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def create_group_member(group_id, body):  # noqa: E501
    """Used to create a new Group Memeber for a Group.

     # noqa: E501

    :param group_id: ID of the Group.
    :type group_id: int
    :param body: The details of the Group Member to be created.
    :type body: dict | bytes

    :rtype: GroupMember
    """
    if connexion.request.is_json:
        body = GroupMember.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_group_details(group_id):  # noqa: E501
    """Retrieve Group details by Group ID.

     # noqa: E501

    :param group_id: ID of the Group to be retrieved.
    :type group_id: int

    :rtype: Group
    """
    return 'do some magic!'


def list_groups(event_id=None, account_id=None):  # noqa: E501
    """Retrieve a List of Groups. Search by Event ID or Account ID.

     # noqa: E501

    :param event_id: The Event ID to search for.
    :type event_id: str
    :param account_id: The Account ID to search for.
    :type account_id: str

    :rtype: GroupList
    """
    return 'do some magic!'


def update_group(group_id, body):  # noqa: E501
    """Used to update the Group details. Replaces the Group resource.

     # noqa: E501

    :param group_id: ID of the Group to be updated.
    :type group_id: int
    :param body: Group object to update. Performs a complete replace of the Group details.
    :type body: dict | bytes

    :rtype: Group
    """
    if connexion.request.is_json:
        body = Group.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_group_member_status(group_id, group_membership_id, body):  # noqa: E501
    """Used to PATCH the status of a Group Membership.

     # noqa: E501

    :param group_id: ID of the Group.
    :type group_id: int
    :param group_membership_id: ID of the Group Membership.
    :type group_membership_id: int
    :param body: The details of the PATCH operation to be performed.
    :type body: dict | bytes

    :rtype: GroupStatusUpdate
    """
    if connexion.request.is_json:
        body = GroupStatusUpdate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
