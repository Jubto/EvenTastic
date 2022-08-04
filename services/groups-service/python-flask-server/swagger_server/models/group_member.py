# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.tag import Tag
from swagger_server import util


class GroupMember(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, group_membership_id: int=None, account_id: int=None, group_id: int=None, join_status: str=None, join_desc: str=None, interest_tags: List[Tag]=None):  # noqa: E501
        """GroupMember - a model defined in Swagger

        :param group_membership_id: The group_membership_id of this GroupMember.  # noqa: E501
        :type group_membership_id: int
        :param account_id: The account_id of this GroupMember.  # noqa: E501
        :type account_id: int
        :param group_id: The group_id of this GroupMember.  # noqa: E501
        :type group_id: int
        :param join_status: The join_status of this GroupMember.  # noqa: E501
        :type join_status: str
        :param join_desc: The join_desc of this GroupMember.  # noqa: E501
        :type join_desc: str
        :param interest_tags: The interest_tags of this GroupMember.  # noqa: E501
        :type interest_tags: List[Tag]
        """
        self.swagger_types = {
            'group_membership_id': int,
            'account_id': int,
            'group_id': int,
            'join_status': str,
            'join_desc': str,
            'interest_tags': List[Tag]
        }

        self.attribute_map = {
            'group_membership_id': 'group_membership_id',
            'account_id': 'account_id',
            'group_id': 'group_id',
            'join_status': 'join_status',
            'join_desc': 'join_desc',
            'interest_tags': 'interest_tags'
        }

        self._group_membership_id = group_membership_id
        self._account_id = account_id
        self._group_id = group_id
        self._join_status = join_status
        self._join_desc = join_desc
        self._interest_tags = interest_tags

    @classmethod
    def from_dict(cls, dikt) -> 'GroupMember':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The GroupMember of this GroupMember.  # noqa: E501
        :rtype: GroupMember
        """
        return util.deserialize_model(dikt, cls)

    @property
    def group_membership_id(self) -> int:
        """Gets the group_membership_id of this GroupMember.


        :return: The group_membership_id of this GroupMember.
        :rtype: int
        """
        return self._group_membership_id

    @group_membership_id.setter
    def group_membership_id(self, group_membership_id: int):
        """Sets the group_membership_id of this GroupMember.


        :param group_membership_id: The group_membership_id of this GroupMember.
        :type group_membership_id: int
        """

        self._group_membership_id = group_membership_id

    @property
    def account_id(self) -> int:
        """Gets the account_id of this GroupMember.


        :return: The account_id of this GroupMember.
        :rtype: int
        """
        return self._account_id

    @account_id.setter
    def account_id(self, account_id: int):
        """Sets the account_id of this GroupMember.


        :param account_id: The account_id of this GroupMember.
        :type account_id: int
        """

        self._account_id = account_id

    @property
    def group_id(self) -> int:
        """Gets the group_id of this GroupMember.


        :return: The group_id of this GroupMember.
        :rtype: int
        """
        return self._group_id

    @group_id.setter
    def group_id(self, group_id: int):
        """Sets the group_id of this GroupMember.


        :param group_id: The group_id of this GroupMember.
        :type group_id: int
        """

        self._group_id = group_id

    @property
    def join_status(self) -> str:
        """Gets the join_status of this GroupMember.


        :return: The join_status of this GroupMember.
        :rtype: str
        """
        return self._join_status

    @join_status.setter
    def join_status(self, join_status: str):
        """Sets the join_status of this GroupMember.


        :param join_status: The join_status of this GroupMember.
        :type join_status: str
        """
        allowed_values = ["Pending", "Accepted", "Rejected"]  # noqa: E501
        if join_status not in allowed_values:
            raise ValueError(
                "Invalid value for `join_status` ({0}), must be one of {1}"
                .format(join_status, allowed_values)
            )

        self._join_status = join_status

    @property
    def join_desc(self) -> str:
        """Gets the join_desc of this GroupMember.


        :return: The join_desc of this GroupMember.
        :rtype: str
        """
        return self._join_desc

    @join_desc.setter
    def join_desc(self, join_desc: str):
        """Sets the join_desc of this GroupMember.


        :param join_desc: The join_desc of this GroupMember.
        :type join_desc: str
        """

        self._join_desc = join_desc

    @property
    def interest_tags(self) -> List[Tag]:
        """Gets the interest_tags of this GroupMember.


        :return: The interest_tags of this GroupMember.
        :rtype: List[Tag]
        """
        return self._interest_tags

    @interest_tags.setter
    def interest_tags(self, interest_tags: List[Tag]):
        """Sets the interest_tags of this GroupMember.


        :param interest_tags: The interest_tags of this GroupMember.
        :type interest_tags: List[Tag]
        """

        self._interest_tags = interest_tags