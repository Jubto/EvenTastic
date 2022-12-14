# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class CreditCard(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, card_name: str=None, card_number: str=None, card_type: str=None, card_expiry: str=None):  # noqa: E501
        """CreditCard - a model defined in Swagger

        :param card_name: The card_name of this CreditCard.  # noqa: E501
        :type card_name: str
        :param card_number: The card_number of this CreditCard.  # noqa: E501
        :type card_number: str
        :param card_type: The card_type of this CreditCard.  # noqa: E501
        :type card_type: str
        :param card_expiry: The card_expiry of this CreditCard.  # noqa: E501
        :type card_expiry: str
        """
        self.swagger_types = {
            'card_name': str,
            'card_number': str,
            'card_type': str,
            'card_expiry': str
        }

        self.attribute_map = {
            'card_name': 'card_name',
            'card_number': 'card_number',
            'card_type': 'card_type',
            'card_expiry': 'card_expiry'
        }

        self._card_name = card_name
        self._card_number = card_number
        self._card_type = card_type
        self._card_expiry = card_expiry

    @classmethod
    def from_dict(cls, dikt) -> 'CreditCard':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The CreditCard of this CreditCard.  # noqa: E501
        :rtype: CreditCard
        """
        return util.deserialize_model(dikt, cls)

    @property
    def card_name(self) -> str:
        """Gets the card_name of this CreditCard.


        :return: The card_name of this CreditCard.
        :rtype: str
        """
        return self._card_name

    @card_name.setter
    def card_name(self, card_name: str):
        """Sets the card_name of this CreditCard.


        :param card_name: The card_name of this CreditCard.
        :type card_name: str
        """

        self._card_name = card_name

    @property
    def card_number(self) -> str:
        """Gets the card_number of this CreditCard.


        :return: The card_number of this CreditCard.
        :rtype: str
        """
        return self._card_number

    @card_number.setter
    def card_number(self, card_number: str):
        """Sets the card_number of this CreditCard.


        :param card_number: The card_number of this CreditCard.
        :type card_number: str
        """

        self._card_number = card_number

    @property
    def card_type(self) -> str:
        """Gets the card_type of this CreditCard.


        :return: The card_type of this CreditCard.
        :rtype: str
        """
        return self._card_type

    @card_type.setter
    def card_type(self, card_type: str):
        """Sets the card_type of this CreditCard.


        :param card_type: The card_type of this CreditCard.
        :type card_type: str
        """

        self._card_type = card_type

    @property
    def card_expiry(self) -> str:
        """Gets the card_expiry of this CreditCard.


        :return: The card_expiry of this CreditCard.
        :rtype: str
        """
        return self._card_expiry

    @card_expiry.setter
    def card_expiry(self, card_expiry: str):
        """Sets the card_expiry of this CreditCard.


        :param card_expiry: The card_expiry of this CreditCard.
        :type card_expiry: str
        """

        self._card_expiry = card_expiry
