import connexion
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


from swagger_server.models.email import Email
from swagger_server.models.unexpected_service_error import UnexpectedServiceError


API_KEY = "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"


def send_email(body):
    if connexion.request.is_json:
        body = Email.from_dict(connexion.request.get_json())
    
    try:
        to_emails = []
        for rec in body.email_to:
            tmp = (rec.email_address, rec.name)
            to_emails.append(tmp)

        message = Mail(
            from_email=(body.email_from["email_address"], body.email_from["name"]),
            to_emails=to_emails,
            subject=body.email_subject,
            html_content=body.email_content)

        sendgrid_client = SendGridAPIClient(API_KEY)
        response = sendgrid_client.send(message)
        return "Email request sent", response.status_code, {'Access-Control-Allow-Origin': '*'}

    except Exception as e:
        # catch any unexpected runtime error and return as 500 error 
        error = UnexpectedServiceError(code="500", type="UnexpectedServiceError", message=str(e))
        return error, 500, {'Access-Control-Allow-Origin': '*'}