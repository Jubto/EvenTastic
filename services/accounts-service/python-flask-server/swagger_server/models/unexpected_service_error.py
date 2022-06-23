# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.error import Error
from swagger_server import util


class UnexpectedServiceError(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, code: str=None, type: str=None, message: str=None):  # noqa: E501
        """UnexpectedServiceError - a model defined in Swagger

        :param code: The code of this UnexpectedServiceError.  # noqa: E501
        :type code: str
        :param type: The type of this UnexpectedServiceError.  # noqa: E501
        :type type: str
        :param message: The message of this UnexpectedServiceError.  # noqa: E501
        :type message: str
        """
        self.swagger_types = {
            'code': str,
            'type': str,
            'message': str
        }

        self.attribute_map = {
            'code': 'code',
            'type': 'type',
            'message': 'message'
        }

        self._code = code
        self._type = type
        self._message = message

    @classmethod
    def from_dict(cls, dikt) -> 'UnexpectedServiceError':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The UnexpectedServiceError of this UnexpectedServiceError.  # noqa: E501
        :rtype: UnexpectedServiceError
        """
        return util.deserialize_model(dikt, cls)

    @property
    def code(self) -> str:
        """Gets the code of this UnexpectedServiceError.


        :return: The code of this UnexpectedServiceError.
        :rtype: str
        """
        return self._code

    @code.setter
    def code(self, code: str):
        """Sets the code of this UnexpectedServiceError.


        :param code: The code of this UnexpectedServiceError.
        :type code: str
        """

        self._code = code

    @property
    def type(self) -> str:
        """Gets the type of this UnexpectedServiceError.


        :return: The type of this UnexpectedServiceError.
        :rtype: str
        """
        return self._type

    @type.setter
    def type(self, type: str):
        """Sets the type of this UnexpectedServiceError.


        :param type: The type of this UnexpectedServiceError.
        :type type: str
        """

        self._type = type

    @property
    def message(self) -> str:
        """Gets the message of this UnexpectedServiceError.


        :return: The message of this UnexpectedServiceError.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this UnexpectedServiceError.


        :param message: The message of this UnexpectedServiceError.
        :type message: str
        """

        self._message = message