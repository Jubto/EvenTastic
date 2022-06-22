import connexion
import six

from swagger_server.models.account import Account  # noqa: E501
from swagger_server.models.account_list import AccountList  # noqa: E501
from swagger_server.models.account_not_found_error import AccountNotFoundError  # noqa: E501
from swagger_server.models.credit_card import CreditCard  # noqa: E501
from swagger_server.models.host_details import HostDetails  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util


def create_account(body):  # noqa: E501
    """Used to create an Account.

     # noqa: E501

    :param body: Account object containing the Account details.
    :type body: dict | bytes

    :rtype: Account
    """
    if connexion.request.is_json:
        body = Account.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_account_details(account_id):  # noqa: E501
    """Retrieve Account details by Account ID.

     # noqa: E501

    :param account_id: ID of the Account to be retrieved.
    :type account_id: int

    :rtype: Account
    """
    return 'do some magic!'


def get_credit_card(account_id):  # noqa: E501
    """Used to retrive the Credit Card details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: CreditCard
    """
    return 'do some magic!'


def get_host_details(account_id):  # noqa: E501
    """Used to retrive the Host details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: HostDetails
    """
    return 'do some magic!'


def list_accounts(email=None, first_name=None, last_name=None):  # noqa: E501
    """Retrieve a List of Accounts. Filter by email address, first name or last name.

     # noqa: E501

    :param email: The email address to filter on.
    :type email: str
    :param first_name: The first name to filter on.
    :type first_name: str
    :param last_name: The last name to filter on.
    :type last_name: str

    :rtype: AccountList
    """
    return 'do some magic!'


def update_account(account_id, body):  # noqa: E501
    """Used to update the Account details. Replaces the Account resource.

     # noqa: E501

    :param account_id: ID of the Account to be updated.
    :type account_id: int
    :param body: Account object to update. Performs a complete replace of the Account details.
    :type body: dict | bytes

    :rtype: Account
    """
    if connexion.request.is_json:
        body = Account.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_credit_card(account_id, body):  # noqa: E501
    """Used to update the Credit Card details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Credit Card object to update. Performs a complete replace of the Credit Card details.
    :type body: dict | bytes

    :rtype: CreditCard
    """
    if connexion.request.is_json:
        body = CreditCard.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_host_details(account_id, body):  # noqa: E501
    """Used to update the host details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Host details object to update. Performs a complete replace of the Host details.
    :type body: dict | bytes

    :rtype: HostDetails
    """
    if connexion.request.is_json:
        body = HostDetails.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
