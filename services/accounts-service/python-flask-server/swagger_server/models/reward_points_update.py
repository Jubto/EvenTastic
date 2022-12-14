# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class RewardPointsUpdate(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, op: str=None, path: str=None, value: float=None):  # noqa: E501
        """RewardPointsUpdate - a model defined in Swagger

        :param op: The op of this RewardPointsUpdate.  # noqa: E501
        :type op: str
        :param path: The path of this RewardPointsUpdate.  # noqa: E501
        :type path: str
        :param value: The value of this RewardPointsUpdate.  # noqa: E501
        :type value: float
        """
        self.swagger_types = {
            'op': str,
            'path': str,
            'value': float
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
    def from_dict(cls, dikt) -> 'RewardPointsUpdate':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The RewardPointsUpdate of this RewardPointsUpdate.  # noqa: E501
        :rtype: RewardPointsUpdate
        """
        return util.deserialize_model(dikt, cls)

    @property
    def op(self) -> str:
        """Gets the op of this RewardPointsUpdate.


        :return: The op of this RewardPointsUpdate.
        :rtype: str
        """
        return self._op

    @op.setter
    def op(self, op: str):
        """Sets the op of this RewardPointsUpdate.


        :param op: The op of this RewardPointsUpdate.
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
        """Gets the path of this RewardPointsUpdate.


        :return: The path of this RewardPointsUpdate.
        :rtype: str
        """
        return self._path

    @path.setter
    def path(self, path: str):
        """Sets the path of this RewardPointsUpdate.


        :param path: The path of this RewardPointsUpdate.
        :type path: str
        """
        allowed_values = ["/reward_points"]  # noqa: E501
        if path not in allowed_values:
            raise ValueError(
                "Invalid value for `path` ({0}), must be one of {1}"
                .format(path, allowed_values)
            )

        self._path = path

    @property
    def value(self) -> float:
        """Gets the value of this RewardPointsUpdate.


        :return: The value of this RewardPointsUpdate.
        :rtype: float
        """
        return self._value

    @value.setter
    def value(self, value: float):
        """Sets the value of this RewardPointsUpdate.


        :param value: The value of this RewardPointsUpdate.
        :type value: float
        """
        if value is None:
            raise ValueError("Invalid value for `value`, must not be `None`")  # noqa: E501

        self._value = value
