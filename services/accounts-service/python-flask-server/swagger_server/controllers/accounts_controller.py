import connexion
import six
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 

from swagger_server.models.account import Account  # noqa: E501
from swagger_server.models.account_list import AccountList  # noqa: E501
from swagger_server.models.account_not_found_error import AccountNotFoundError  # noqa: E501
from swagger_server.models.credit_card import CreditCard  # noqa: E501
from swagger_server.models.host_details import HostDetails  # noqa: E501
from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util

port=5432 # update port of postgres running in Docker here
host='localhost'

def create_account(body):  # noqa: E501
    """Used to create an Account.

     # noqa: E501

    :param body: Account object containing the Account details.
    :type body: dict | bytes

    :rtype: Account
    """

    try:
        if connexion.request.is_json:
            body = Account.from_dict(connexion.request.get_json())  # noqa: E501

        if (len(body.email) == 0 or len(body.first_name) == 0 or len(body.last_name) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: email or first name or last name")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        tags_string = ""
        if body.tags:
            tag_length = len(body.tags)
            i=0
            for tag in body.tags:
                if i < tag_length-1:
                    tags_string = tags_string + tag.name + ','
                else:
                    tags_string = tags_string + tag.name
                i+=1

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute("SELECT * FROM accounts where email = '"+str(body.email)+"';")
        record = cur.fetchone()
        if record != None:
            error = InvalidInputError(code=409, type="InvalidInputError", 
                    message="The provided email address already exists in database.")
            cur.close()
            con.close()
            return error, 400, {'Access-Control-Allow-Origin': '*'}
        
        insert_string = "INSERT INTO accounts VALUES (default, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING account_id;"
        cur.execute(insert_string, (body.email, body.first_name, body.last_name, body.age, body.mobile, \
            body.location, body.password, body.account_type, body.profile_pic, body.reward_points, tags_string))
        body.account_id = cur.fetchone()[0]

        cur.close()
        con.close()            
        return body, 201, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def create_account_options():
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for POST.

     # noqa: E501


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

     # noqa: E501

    :param account_id: ID of the Account to be retrieved.
    :type account_id: int

    :rtype: Account
    """
    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record != None:
            account = dict()
            account['account_id'] = int(record[0])
            account['account_type'] = str(record[8])
            account['age'] = int(record[4])
            account['email'] = str(record[1])
            account['first_name'] = str(record[2])
            account['last_name'] = str(record[3])
            account['location'] = str(record[6])
            account['mobile'] = str(record[5])
            account['password'] = str(record[7])
            account['profile_pic'] = str(record[9])
            account['reward_points'] = str(record[10])
            tags = str(record[11]).split(',')
            tags_list = list()
            for t in tags:
                tags_list.append({"name": str(t)})
            account['tags'] = tags_list
        else:
            error = AccountNotFoundError(code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}
        
        cur.close()
        con.close()
        return account, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def get_credit_card(account_id):  # noqa: E501
    """Used to retrive the Credit Card details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: CreditCard
    """
    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None:
            error = AccountNotFoundError(code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        cur.execute('SELECT * FROM saved_cards where account_id = ' + str(account_id))
        record = cur.fetchone()
        card = dict()
        if record != None:             
            card['card_name'] = str(record[2])
            card['card_number'] = str(record[3])
            card['card_type'] = str(record[4])
            card['card_expiry'] = str(record[5])       
        else:
            cur.close()
            con.close()
            return CreditCard(), 200, {'Access-Control-Allow-Origin': '*'}

        cur.close()
        con.close()
        return card, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def get_host_details(account_id):  # noqa: E501
    """Used to retrive the Host details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int

    :rtype: HostDetails
    """
    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        
        if (account_id == -1 or int(account_id) == -1):
            cur.execute('SELECT * FROM hosts where is_verified is false')
            records = cur.fetchall()
            host_list = list()
            for record in records:
                host_det = dict()
                host_det['account_id'] = str(record[1])
                host_det['org_name'] = str(record[2])
                host_det['org_desc'] = str(record[3])
                host_det['host_contact_no'] = str(record[4])
                host_det['job_title'] = str(record[5])
                host_det['qualification'] = str(record[6])
                host_det['isVerified'] = bool(record[7])
                host_list.append(host_det)
                
            cur.close()
            con.close()   
            return host_list, 200, {'Access-Control-Allow-Origin': '*'}

        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None:
            error = AccountNotFoundError(code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        cur.execute('SELECT * FROM hosts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record != None:
            host_det = dict()
            host_det['account_id'] = str(record[1])
            host_det['org_name'] = str(record[2])
            host_det['org_desc'] = str(record[3])
            host_det['host_contact_no'] = str(record[4])
            host_det['job_title'] = str(record[5])
            host_det['qualification'] = str(record[6])
            host_det['isVerified'] = bool(record[7])            
        else:
            cur.close()
            con.close()
            return HostDetails(), 200, {'Access-Control-Allow-Origin': '*'}

        cur.close()
        con.close()
        return host_det, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


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
    try:
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        cur.execute("SELECT * FROM accounts where email = '"+str(email)+"';")
        record = cur.fetchone()
        if record != None:
            account = dict()
            account['account_id'] = int(record[0])
            account['account_type'] = str(record[8])
            account['age'] = int(record[4])
            account['email'] = str(record[1])
            account['first_name'] = str(record[2])
            account['last_name'] = str(record[3])
            account['location'] = str(record[6])
            account['mobile'] = str(record[5])
            account['password'] = str(record[7])
            account['profile_pic'] = str(record[9])
            account['reward_points'] = str(record[10])
            tags = str(record[11]).split(',')
            tags_list = list()
            for t in tags:
                tags_list.append({"name": str(t)})
            account['tags'] = tags_list
        else:
            cur.close()
            con.close()
            return [], 200, {'Access-Control-Allow-Origin': '*'}

        cur.close()
        con.close()
        return [account], 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        cur.close()
        con.close()
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_account(account_id, body):  # noqa: E501
    """Used to update the Account details. Replaces the Account resource.

     # noqa: E501

    :param account_id: ID of the Account to be updated.
    :type account_id: int
    :param body: Account object to update. Performs a complete replace of the Account details.
    :type body: dict | bytes

    :rtype: Account
    """
    
    try:
        if connexion.request.is_json:
            body = Account.from_dict(connexion.request.get_json())  # noqa: E501

        if (len(body.email) == 0 or len(body.first_name) == 0 or len(body.last_name) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: email or first name or last name")
            return error, 400, {'Access-Control-Allow-Origin': '*'}
            
        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        # to check if the account id exists or not
        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None:
            error = AccountNotFoundError(code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}

        tags_string = ""
        tag_length = len(body.tags)
        i=0
        for tag in body.tags:
            if i < tag_length-1:
                tags_string = tags_string + tag.name + ','
            else:
                tags_string = tags_string + tag.name
            i+=1

        update_string = "UPDATE accounts set email=%s, first_name=%s, last_name=%s, age=%s, mobile_no=%s, \
            location=%s, password=%s, account_type=%s, profile_pic=%s, reward_points=%s, tags=%s  \
            where account_id = %s RETURNING account_id;"
        cur.execute(update_string, (body.email, body.first_name, body.last_name, body.age, body.mobile, \
            body.location, body.password, body.account_type, body.profile_pic, body.reward_points, tags_string, account_id))
        acc_id = cur.fetchone()[0]

        cur.close()
        con.close()                    
        return body, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_account_options(account_id):  # noqa: E501
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

     # noqa: E501

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


def update_credit_card(account_id, body):  # noqa: E501
    """Used to update the Credit Card details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Credit Card object to update. Performs a complete replace of the Credit Card details.
    :type body: dict | bytes

    :rtype: CreditCard
    """

    try: 
        if connexion.request.is_json:
            body = CreditCard.from_dict(connexion.request.get_json())  # noqa: E501

        if (len(body.card_name) == 0 or len(body.card_number) == 0 or len(body.card_type) == 0 or len(body.card_expiry) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: card name or number or type or expiry")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        # to check if this account exists in database or not
        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None:
            error = AccountNotFoundError(
                    code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}
        
        cur.execute('SELECT * FROM saved_cards where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None: # to add the card details if it doesn't exists
            insert_string = "INSERT INTO saved_cards VALUES (default, %s,%s,%s,%s,%s) RETURNING id;"
            cur.execute(insert_string, (account_id, body.card_name, body.card_number, body.card_type, body.card_expiry))
            card_id = cur.fetchone()[0]
        else: # to update the card details if it already  exists
            update_string = "UPDATE saved_cards set card_name=%s, card_number=%s, card_type=%s, card_expiry=%s \
            where account_id = %s RETURNING account_id;"
            cur.execute(update_string, (body.card_name, body.card_number, body.card_type, body.card_expiry, account_id))
            acc_id = cur.fetchone()[0]
        
        cur.close()
        con.close() 
        return body, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_credit_card_options(account_id):  # noqa: E501
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

     # noqa: E501

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


def update_host_details(account_id, body):  # noqa: E501
    """Used to update the host details for an Account.

     # noqa: E501

    :param account_id: ID of the Account.
    :type account_id: int
    :param body: Host details object to update. Performs a complete replace of the Host details.
    :type body: dict | bytes

    :rtype: HostDetails
    """

    try: 
        if connexion.request.is_json:
            body = HostDetails.from_dict(connexion.request.get_json())  # noqa: E501

        print(account_id)
        print(body)

        if (len(body.org_name) == 0 or len(body.host_contact_no) == 0 or len(body.job_title) == 0 or len(body.qualification) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError", 
                    message="The following mandatory fields were not provided: organisation name or contact number or title or qualification")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        con = psycopg2.connect(database= 'eventastic', user='postgres', password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        # to check if the account id exists or not
        cur.execute('SELECT * FROM accounts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None:
            error = AccountNotFoundError(code=404, type="AccountNotFoundError", 
                    message="The following Account ID does not exist: " + str(account_id))
            cur.close()
            con.close()
            return error, 404, {'Access-Control-Allow-Origin': '*'}
        
        cur.execute('SELECT * FROM hosts where account_id = ' + str(account_id))
        record = cur.fetchone()
        if record == None: # to add the host details if it doesn't exists
            insert_string = "INSERT INTO hosts VALUES (default, %s,%s,%s,%s,%s,%s,%s) RETURNING id;"
            cur.execute(insert_string, (account_id, body.org_name, body.org_desc, body.host_contact_no, body.job_title, \
                        body.qualification, body.is_verified))
            host_id = cur.fetchone()[0]
        else: # to update the host details if it already  exists
            update_string = "UPDATE hosts set organisation_name=%s, organisation_desc=%s, host_contact_no=%s, job_title=%s, \
                qualification=%s, is_verified=%s where account_id = %s RETURNING account_id;"
            cur.execute(update_string, (body.org_name, body.org_desc, body.host_contact_no, body.job_title, \
                        body.qualification, body.is_verified, account_id))
            acc_id = cur.fetchone()[0]

        cur.close()
        con.close()
        return body, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


def update_host_details_options(account_id):  # noqa: E501
    """Used to respond to browser with Access-Control-Allow-Methods header. Required for PUT.

     # noqa: E501

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
