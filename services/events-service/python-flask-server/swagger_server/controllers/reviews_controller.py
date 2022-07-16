import connexion
import six
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

from swagger_server.models.invalid_input_error import InvalidInputError  # noqa: E501
from swagger_server.models.review import Review  # noqa: E501
from swagger_server.models.review_interaction import ReviewInteraction  # noqa: E501
from swagger_server.models.review_interaction_not_found_error import ReviewInteractionNotFoundError  # noqa: E501
from swagger_server.models.review_list import ReviewList  # noqa: E501
from swagger_server.models.review_not_found_error import ReviewNotFoundError  # noqa: E501
from swagger_server.models.unexpected_service_error import UnexpectedServiceError  # noqa: E501
from swagger_server import util

port = 5432  # Change according to port in Docker
host = 'localhost'

def create_review(body):  # noqa: E501
    """Used to create a Review.

     # noqa: E501

    :param body: Review object containing the Review details.
    :type body: dict | bytes

    :rtype: Review
    """
    try:
        if connexion.request.is_json:
            body = Review.from_dict(connexion.request.get_json())  # noqa: E501

        if (len(str(body.event_id)) == 0 or len(str(body.reviewer_account_id)) == 0):
            error = InvalidInputError(code=400, type="InvalidInputError",
                                      message="The following mandatory fields were not provided: Event ID or Account ID")
            return error, 400, {'Access-Control-Allow-Origin': '*'}

        con = psycopg2.connect(database='eventastic', user='postgres',
                               password='postgrespw', host=host, port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()

        if body.event_id != None and body.reviewer_account_id != None:
            cur.execute("SELECT * FROM reviews where event_id = '"+str(body.event_id) +
                        "' and reviewer_account_id = '"+str(body.reviewer_account_id)+"';")
            record = cur.fetchone()
            if record != None:
                error = InvalidInputError(code=409, type="InvalidInputError",
                                          message="User has already written a review for this event.")
                cur.close()
                con.close()
                return error, 400, {'Access-Control-Allow-Origin': '*'}
        #When a new review is created, default values are:
        body.upvotes = 0
        body.flag_count = 0
        body.review_status = 'Active'
        body.reply_text = ''
        # body.review_interaction = {}
        insert_string = "INSERT INTO reviews VALUES (default, %s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING review_id;"
        cur.execute(insert_string, (body.event_id, body.reviewer_account_id, body.upvotes, body.rating,\
                                    body.review_text, body.review_timestamp, body.flag_count,\
                                    body.review_status, body.reply_text))
        body.review_id = cur.fetchone()[0]

        cur.close()
        con.close()
        return body, 201, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error
        error = UnexpectedServiceError(
            code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}


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
    try:
        con = psycopg2.connect(database='eventastic', user='postgres',
                               password='postgrespw', host='localhost', port=port)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        
        cur.execute('SELECT * FROM reviews where event_id = ' + str(event_id))
        records = cur.fetchall()

        reviews = []
        for record in records:
            if record != None:
                review = dict()
                review['review_id'] = str(record[0])
                review['event_id'] = str(record[1])
                review['account_id'] = str(record[2])
                review['upvote_count'] = str(record[3])
                review['rating'] = str(record[4])
                review['review_text'] = str(record[5])
                review['time_stamp'] = str(record[6])
                review['flag_count'] = str(record[7])
                review['status'] = str(record[8])
                review['reply_text'] = str(record[9])

                reviews.append(review)

        cur.close()
        con.close()
        return reviews, 200, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error
        cur.close()
        con.close()
        error = UnexpectedServiceError(
            code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}



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
