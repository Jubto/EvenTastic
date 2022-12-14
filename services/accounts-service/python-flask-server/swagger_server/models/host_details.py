# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class HostDetails(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, host_id: int=None, account_id: int=None, org_name: str=None, org_desc: str=None, org_email: str=None, host_contact_no: str=None, job_title: str=None, qualification: str=None, is_verified: bool=None, host_status: str=None):  # noqa: E501
        """HostDetails - a model defined in Swagger

        :param host_id: The host_id of this HostDetails.  # noqa: E501
        :type host_id: int
        :param account_id: The account_id of this HostDetails.  # noqa: E501
        :type account_id: int
        :param org_name: The org_name of this HostDetails.  # noqa: E501
        :type org_name: str
        :param org_desc: The org_desc of this HostDetails.  # noqa: E501
        :type org_desc: str
        :param org_email: The org_email of this HostDetails.  # noqa: E501
        :type org_email: str
        :param host_contact_no: The host_contact_no of this HostDetails.  # noqa: E501
        :type host_contact_no: str
        :param job_title: The job_title of this HostDetails.  # noqa: E501
        :type job_title: str
        :param qualification: The qualification of this HostDetails.  # noqa: E501
        :type qualification: str
        :param is_verified: The is_verified of this HostDetails.  # noqa: E501
        :type is_verified: bool
        :param host_status: The host_status of this HostDetails.  # noqa: E501
        :type host_status: str
        """
        self.swagger_types = {
            'host_id': int,
            'account_id': int,
            'org_name': str,
            'org_desc': str,
            'org_email': str,
            'host_contact_no': str,
            'job_title': str,
            'qualification': str,
            'is_verified': bool,
            'host_status': str
        }

        self.attribute_map = {
            'host_id': 'host_id',
            'account_id': 'account_id',
            'org_name': 'org_name',
            'org_desc': 'org_desc',
            'org_email': 'org_email',
            'host_contact_no': 'host_contact_no',
            'job_title': 'job_title',
            'qualification': 'qualification',
            'is_verified': 'isVerified',
            'host_status': 'host_status'
        }

        self._host_id = host_id
        self._account_id = account_id
        self._org_name = org_name
        self._org_desc = org_desc
        self._org_email = org_email
        self._host_contact_no = host_contact_no
        self._job_title = job_title
        self._qualification = qualification
        self._is_verified = is_verified
        self._host_status = host_status

    @classmethod
    def from_dict(cls, dikt) -> 'HostDetails':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The HostDetails of this HostDetails.  # noqa: E501
        :rtype: HostDetails
        """
        return util.deserialize_model(dikt, cls)

    @property
    def host_id(self) -> int:
        """Gets the host_id of this HostDetails.


        :return: The host_id of this HostDetails.
        :rtype: int
        """
        return self._host_id

    @host_id.setter
    def host_id(self, host_id: int):
        """Sets the host_id of this HostDetails.


        :param host_id: The host_id of this HostDetails.
        :type host_id: int
        """

        self._host_id = host_id

    @property
    def account_id(self) -> int:
        """Gets the account_id of this HostDetails.


        :return: The account_id of this HostDetails.
        :rtype: int
        """
        return self._account_id

    @account_id.setter
    def account_id(self, account_id: int):
        """Sets the account_id of this HostDetails.


        :param account_id: The account_id of this HostDetails.
        :type account_id: int
        """

        self._account_id = account_id

    @property
    def org_name(self) -> str:
        """Gets the org_name of this HostDetails.


        :return: The org_name of this HostDetails.
        :rtype: str
        """
        return self._org_name

    @org_name.setter
    def org_name(self, org_name: str):
        """Sets the org_name of this HostDetails.


        :param org_name: The org_name of this HostDetails.
        :type org_name: str
        """

        self._org_name = org_name

    @property
    def org_desc(self) -> str:
        """Gets the org_desc of this HostDetails.


        :return: The org_desc of this HostDetails.
        :rtype: str
        """
        return self._org_desc

    @org_desc.setter
    def org_desc(self, org_desc: str):
        """Sets the org_desc of this HostDetails.


        :param org_desc: The org_desc of this HostDetails.
        :type org_desc: str
        """

        self._org_desc = org_desc

    @property
    def org_email(self) -> str:
        """Gets the org_email of this HostDetails.


        :return: The org_email of this HostDetails.
        :rtype: str
        """
        return self._org_email

    @org_email.setter
    def org_email(self, org_email: str):
        """Sets the org_email of this HostDetails.


        :param org_email: The org_email of this HostDetails.
        :type org_email: str
        """

        self._org_email = org_email

    @property
    def host_contact_no(self) -> str:
        """Gets the host_contact_no of this HostDetails.


        :return: The host_contact_no of this HostDetails.
        :rtype: str
        """
        return self._host_contact_no

    @host_contact_no.setter
    def host_contact_no(self, host_contact_no: str):
        """Sets the host_contact_no of this HostDetails.


        :param host_contact_no: The host_contact_no of this HostDetails.
        :type host_contact_no: str
        """

        self._host_contact_no = host_contact_no

    @property
    def job_title(self) -> str:
        """Gets the job_title of this HostDetails.


        :return: The job_title of this HostDetails.
        :rtype: str
        """
        return self._job_title

    @job_title.setter
    def job_title(self, job_title: str):
        """Sets the job_title of this HostDetails.


        :param job_title: The job_title of this HostDetails.
        :type job_title: str
        """

        self._job_title = job_title

    @property
    def qualification(self) -> str:
        """Gets the qualification of this HostDetails.


        :return: The qualification of this HostDetails.
        :rtype: str
        """
        return self._qualification

    @qualification.setter
    def qualification(self, qualification: str):
        """Sets the qualification of this HostDetails.


        :param qualification: The qualification of this HostDetails.
        :type qualification: str
        """

        self._qualification = qualification

    @property
    def is_verified(self) -> bool:
        """Gets the is_verified of this HostDetails.


        :return: The is_verified of this HostDetails.
        :rtype: bool
        """
        return self._is_verified

    @is_verified.setter
    def is_verified(self, is_verified: bool):
        """Sets the is_verified of this HostDetails.


        :param is_verified: The is_verified of this HostDetails.
        :type is_verified: bool
        """

        self._is_verified = is_verified

    @property
    def host_status(self) -> str:
        """Gets the host_status of this HostDetails.


        :return: The host_status of this HostDetails.
        :rtype: str
        """
        return self._host_status

    @host_status.setter
    def host_status(self, host_status: str):
        """Sets the host_status of this HostDetails.


        :param host_status: The host_status of this HostDetails.
        :type host_status: str
        """
        allowed_values = ["Pending", "Approved", "Declined"]  # noqa: E501
        if host_status not in allowed_values:
            raise ValueError(
                "Invalid value for `host_status` ({0}), must be one of {1}"
                .format(host_status, allowed_values)
            )

        self._host_status = host_status
