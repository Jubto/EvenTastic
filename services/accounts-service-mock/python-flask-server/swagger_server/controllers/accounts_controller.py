import connexion
import six

from swagger_server.models.account import Account
from swagger_server.models.account_list import AccountList
from swagger_server.models.account_not_found_error import AccountNotFoundError
from swagger_server.models.credit_card import CreditCard
from swagger_server.models.host_details import HostDetails
from swagger_server.models.invalid_input_error import InvalidInputError
from swagger_server.models.unexpected_service_error import UnexpectedServiceError
from swagger_server import util


############################################### 
#                                             #
# Mock Account Service for front end testing. #
#                                             #
###############################################

# used to simulate account id generation by the database
_account_id = 0

# used to simulate a database of Accounts
_account_dict = {}

# used to simulate a database of Credit Cards
_credit_card_dict = {}

# used to simulate a database of Host Account details
_host_details_dict = {}


def get_new_account_id():
    global _account_id
    _account_id = _account_id + 1
    return _account_id


def create_account(body):
    """Used to create an Account.

    :param body: Account object containing the Account details.
    :type body: dict | bytes

    :rtype: Account
    """
    print(f'POST /accounts body: {body}')
    try:
        global _account_dict

        # convert the client request body to Account object
        if connexion.request.is_json:
            account = Account.from_dict(connexion.request.get_json())

        # Create a new Account ID (will be done by the database in the real service)
        account.account_id = get_new_account_id()
        # Store new Account object in the mock database which is just a dictionary
        _account_dict[account.account_id] = account
        # if successful, return the created Account in the response
        return account, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as err:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(err))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def create_account_options():
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for POST.

    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': 86400 
    }
    return None, 200, response_headers


def get_account_details(account_id): 
    """Retrieve Account details by Account ID.

    :param account_id: ID of the Account to be retrieved.
    :type account_id: int

    :rtype: Account
    """
    try:
        try:
            # attempt to get Account from the store/database
            temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}
        # If successful, return the Account object
        return temp, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def get_credit_card(account_id):
    """Used to retrive the Credit Card details for an Account.

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: CreditCard
    """
    try:
        try:
            # attempt to get Account from the store/database
            account_temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}

        try:
            # attempt to get Credit Card details from the store/database
            card_temp = _credit_card_dict[account_id]
        except KeyError as ke:
            # return empty CreditCard object if card not found
            return CreditCard(), 200, {'Access-Control-Allow-Origin': '*'}


        # If successful, return the CreditCard object from the store/database
        return card_temp, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def get_host_details(account_id):
    """Used to retrive the Host details for an Account.

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: HostDetails
    """
    try:
        try:
            # attempt to get Account from the store/database
            account_temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}

        try:
            # attempt to get host details from the store/database
            host_temp = _host_details_dict[account_id]
        except KeyError as ke:
            # return empty HostDetails object if host deatils not found
            return HostDetails(), 200, {'Access-Control-Allow-Origin': '*'}

        # If successful, return the HostDetails object from the store/database
        return host_temp, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def list_accounts(email=None, first_name=None, last_name=None):
    """Retrieve a List of Accounts. Filter by email address, first name or last name.

    :param email: The email address to filter on.
    :type email: str
    :param first_name: The first name to filter on.
    :type first_name: str
    :param last_name: The last name to filter on.
    :type last_name: str

    :rtype: AccountList
    """
    try:
        account_list = []
        for id, account in _account_dict.items():
            account_list.append(account)

        # filter the list of accounts by email address (first_name/last_name not implemented)
        if email:
            filtered = list(filter(lambda account: account.email == email, account_list))
            return filtered, 200, {'Access-Control-Allow-Origin': '*'}

        # otherwise, just return the unfiltered list of Accounts
        return account_list, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def update_account(account_id, body):
    """Used to update the Account details. Replaces the Account resource.

    :param account_id: ID of the Account to be updated.
    :type account_id: int
    :param body: Account object to update. Performs a complete replace of the Account details.
    :type body: dict | bytes

    :rtype: Account
    """
    try:
        global _account_dict
        
        try:
            # Fist check if the Account exists
            account_temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}

        # convert the request body to Account object
        if connexion.request.is_json:
            account = Account.from_dict(connexion.request.get_json())

        # Don't let the client change the Account ID
        account.account_id = account_id
        # Update the Account Object in the datastore
        _account_dict[account_id] = account
        # if successful, return the updated Account in the response
        return account, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and retrun as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def update_account_options(account_id):
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

    :param account_id: ID of the Account to be updated.
    :type account_id: int

    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': 86400 
    }
    return None, 200, response_headers


def update_credit_card(account_id, body):
    """Used to update the Credit Card details for an Account.

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Credit Card object to update. Performs a complete replace of the Credit Card details.
    :type body: dict | bytes

    :rtype: CreditCard
    """
    try:
        global _credit_card_dict
        
        try:
            # Fist check if the Account exists
            account_temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}

        # convert the client request body to CreditCard object
        if connexion.request.is_json:
            credit_card = CreditCard.from_dict(connexion.request.get_json())
 
        # Update the CreditCard in the datastore
        _credit_card_dict[account_id] = credit_card
        # if successful, return the updated Credit Card details in the response
        return credit_card, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and retrun as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 


def update_credit_card_options(account_id):
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

    :param account_id: ID of the Account to be updated.
    :type account_id: int

    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': 86400 
    }
    return None, 200, response_headers


def update_host_details(account_id, body):
    """Used to update the host details for an Account.

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Host details object to update. Performs a complete replace of the Host details.
    :type body: dict | bytes

    :rtype: HostDetails
    """
    try:
        global _host_details_dict
        
        try:
            # Fist check if the Account exists
            account_temp = _account_dict[account_id]
        except KeyError as ke:
            # return 401 if error if Account does not exist
            return AccountNotFoundError(
                code=401, type="AccountNotFoundError", 
                message="The following Account does not exist: " + str(account_id)), 401, {'Access-Control-Allow-Origin': '*'}

        # convert the client request body to HostDetails object
        if connexion.request.is_json:
            host_details = HostDetails.from_dict(connexion.request.get_json())
 
        # Update the HostDetails in the datastore
        _host_details_dict[account_id] = host_details
        # if successful, return the updated Host Details in the response
        return host_details, 200, {'Access-Control-Allow-Origin': '*'}
    except Exception as e:
        # catch any unexpected runtime error and retrun as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'} 
    return 'do some magic!'


def update_host_details_options(account_id):
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

    :param account_id: ID of the Account to be updated.
    :type account_id: int

    :rtype: None
    """
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': 86400 
    }
    return None, 200, response_headers
