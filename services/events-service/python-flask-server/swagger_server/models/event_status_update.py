# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class EventStatusUpdate(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, op: str=None, path: str=None, value: str=None):  # noqa: E501
        """EventStatusUpdate - a model defined in Swagger

        :param op: The op of this EventStatusUpdate.  # noqa: E501
        :type op: str
        :param path: The path of this EventStatusUpdate.  # noqa: E501
        :type path: str
        :param value: The value of this EventStatusUpdate.  # noqa: E501
        :type value: str
        """
        self.swagger_types = {
            'op': str,
            'path': str,
            'value': str
        }

        self.attribute_map = {
            'op': 'op',
            'path': 'path',
            'value': 'value'
        }

        self._op = op
        self._path = path
        self._value = value

    @classmethod
    def from_dict(cls, dikt) -> 'EventStatusUpdate':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The EventStatusUpdate of this EventStatusUpdate.  # noqa: E501
        :rtype: EventStatusUpdate
        """
        return util.deserialize_model(dikt, cls)

    @property
    def op(self) -> str:
        """Gets the op of this EventStatusUpdate.


        :return: The op of this EventStatusUpdate.
        :rtype: str
        """
        return self._op

    @op.setter
    def op(self, op: str):
        """Sets the op of this EventStatusUpdate.


        :param op: The op of this EventStatusUpdate.
        :type op: str
        """
        allowed_values = ["replace"]  # noqa: E501
        if op not in allowed_values:
            raise ValueError(
                "Invalid value for `op` ({0}), must be one of {1}"
                .format(op, allowed_values)
            )

        self._op = op

    @property
    def path(self) -> str:
        """Gets the path of this EventStatusUpdate.


        :return: The path of this EventStatusUpdate.
        :rtype: str
        """
        return self._path

    @path.setter
    def path(self, path: str):
        """Sets the path of this EventStatusUpdate.


        :param path: The path of this EventStatusUpdate.
        :type path: str
        """
        allowed_values = ["/event_status"]  # noqa: E501
        if path not in allowed_values:
            raise ValueError(
                "Invalid value for `path` ({0}), must be one of {1}"
                .format(path, allowed_values)
            )

        self._path = path

    @property
    def value(self) -> str:
        """Gets the value of this EventStatusUpdate.


        :return: The value of this EventStatusUpdate.
        :rtype: str
        """
        return self._value

    @value.setter
    def value(self, value: str):
        """Sets the value of this EventStatusUpdate.


        :param value: The value of this EventStatusUpdate.
        :type value: str
        """
        allowed_values = ["Upcoming", "Completed", "Cancelled"]  # noqa: E501
        if value not in allowed_values:
            raise ValueError(
                "Invalid value for `value` ({0}), must be one of {1}"
                .format(value, allowed_values)
            )

        self._value = value
