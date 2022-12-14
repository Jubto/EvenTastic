# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.tag import Tag
from swagger_server import util


class Event(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, event_id: int=None, host_id: int=None, account_id: int=None, venue_id: int=None, gen_seat_price: float=None, front_seat_price: float=None, mid_seat_price: float=None, back_seat_price: float=None, event_title: str=None, event_category: str=None, event_short_desc: str=None, event_desc: str=None, event_start_datetime: str=None, event_end_datetime: str=None, event_location: str=None, event_img: str=None, event_status: str=None, tags: List[Tag]=None):  # noqa: E501
        """Event - a model defined in Swagger

        :param event_id: The event_id of this Event.  # noqa: E501
        :type event_id: int
        :param host_id: The host_id of this Event.  # noqa: E501
        :type host_id: int
        :param account_id: The account_id of this Event.  # noqa: E501
        :type account_id: int
        :param venue_id: The venue_id of this Event.  # noqa: E501
        :type venue_id: int
        :param gen_seat_price: The gen_seat_price of this Event.  # noqa: E501
        :type gen_seat_price: float
        :param front_seat_price: The front_seat_price of this Event.  # noqa: E501
        :type front_seat_price: float
        :param mid_seat_price: The mid_seat_price of this Event.  # noqa: E501
        :type mid_seat_price: float
        :param back_seat_price: The back_seat_price of this Event.  # noqa: E501
        :type back_seat_price: float
        :param event_title: The event_title of this Event.  # noqa: E501
        :type event_title: str
        :param event_category: The event_category of this Event.  # noqa: E501
        :type event_category: str
        :param event_short_desc: The event_short_desc of this Event.  # noqa: E501
        :type event_short_desc: str
        :param event_desc: The event_desc of this Event.  # noqa: E501
        :type event_desc: str
        :param event_start_datetime: The event_start_datetime of this Event.  # noqa: E501
        :type event_start_datetime: str
        :param event_end_datetime: The event_end_datetime of this Event.  # noqa: E501
        :type event_end_datetime: str
        :param event_location: The event_location of this Event.  # noqa: E501
        :type event_location: str
        :param event_img: The event_img of this Event.  # noqa: E501
        :type event_img: str
        :param event_status: The event_status of this Event.  # noqa: E501
        :type event_status: str
        :param tags: The tags of this Event.  # noqa: E501
        :type tags: List[Tag]
        """
        self.swagger_types = {
            'event_id': int,
            'host_id': int,
            'account_id': int,
            'venue_id': int,
            'gen_seat_price': float,
            'front_seat_price': float,
            'mid_seat_price': float,
            'back_seat_price': float,
            'event_title': str,
            'event_category': str,
            'event_short_desc': str,
            'event_desc': str,
            'event_start_datetime': str,
            'event_end_datetime': str,
            'event_location': str,
            'event_img': str,
            'event_status': str,
            'tags': List[Tag]
        }

        self.attribute_map = {
            'event_id': 'event_id',
            'host_id': 'host_id',
            'account_id': 'account_id',
            'venue_id': 'venue_id',
            'gen_seat_price': 'gen_seat_price',
            'front_seat_price': 'front_seat_price',
            'mid_seat_price': 'mid_seat_price',
            'back_seat_price': 'back_seat_price',
            'event_title': 'event_title',
            'event_category': 'event_category',
            'event_short_desc': 'event_short_desc',
            'event_desc': 'event_desc',
            'event_start_datetime': 'event_start_datetime',
            'event_end_datetime': 'event_end_datetime',
            'event_location': 'event_location',
            'event_img': 'event_img',
            'event_status': 'event_status',
            'tags': 'tags'
        }

        self._event_id = event_id
        self._host_id = host_id
        self._account_id = account_id
        self._venue_id = venue_id
        self._gen_seat_price = gen_seat_price
        self._front_seat_price = front_seat_price
        self._mid_seat_price = mid_seat_price
        self._back_seat_price = back_seat_price
        self._event_title = event_title
        self._event_category = event_category
        self._event_short_desc = event_short_desc
        self._event_desc = event_desc
        self._event_start_datetime = event_start_datetime
        self._event_end_datetime = event_end_datetime
        self._event_location = event_location
        self._event_img = event_img
        self._event_status = event_status
        self._tags = tags

    @classmethod
    def from_dict(cls, dikt) -> 'Event':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Event of this Event.  # noqa: E501
        :rtype: Event
        """
        return util.deserialize_model(dikt, cls)

    @property
    def event_id(self) -> int:
        """Gets the event_id of this Event.


        :return: The event_id of this Event.
        :rtype: int
        """
        return self._event_id

    @event_id.setter
    def event_id(self, event_id: int):
        """Sets the event_id of this Event.


        :param event_id: The event_id of this Event.
        :type event_id: int
        """

        self._event_id = event_id

    @property
    def host_id(self) -> int:
        """Gets the host_id of this Event.


        :return: The host_id of this Event.
        :rtype: int
        """
        return self._host_id

    @host_id.setter
    def host_id(self, host_id: int):
        """Sets the host_id of this Event.


        :param host_id: The host_id of this Event.
        :type host_id: int
        """

        self._host_id = host_id

    @property
    def account_id(self) -> int:
        """Gets the account_id of this Event.


        :return: The account_id of this Event.
        :rtype: int
        """
        return self._account_id

    @account_id.setter
    def account_id(self, account_id: int):
        """Sets the account_id of this Event.


        :param account_id: The account_id of this Event.
        :type account_id: int
        """

        self._account_id = account_id

    @property
    def venue_id(self) -> int:
        """Gets the venue_id of this Event.


        :return: The venue_id of this Event.
        :rtype: int
        """
        return self._venue_id

    @venue_id.setter
    def venue_id(self, venue_id: int):
        """Sets the venue_id of this Event.


        :param venue_id: The venue_id of this Event.
        :type venue_id: int
        """

        self._venue_id = venue_id

    @property
    def gen_seat_price(self) -> float:
        """Gets the gen_seat_price of this Event.


        :return: The gen_seat_price of this Event.
        :rtype: float
        """
        return self._gen_seat_price

    @gen_seat_price.setter
    def gen_seat_price(self, gen_seat_price: float):
        """Sets the gen_seat_price of this Event.


        :param gen_seat_price: The gen_seat_price of this Event.
        :type gen_seat_price: float
        """

        self._gen_seat_price = gen_seat_price

    @property
    def front_seat_price(self) -> float:
        """Gets the front_seat_price of this Event.


        :return: The front_seat_price of this Event.
        :rtype: float
        """
        return self._front_seat_price

    @front_seat_price.setter
    def front_seat_price(self, front_seat_price: float):
        """Sets the front_seat_price of this Event.


        :param front_seat_price: The front_seat_price of this Event.
        :type front_seat_price: float
        """

        self._front_seat_price = front_seat_price

    @property
    def mid_seat_price(self) -> float:
        """Gets the mid_seat_price of this Event.


        :return: The mid_seat_price of this Event.
        :rtype: float
        """
        return self._mid_seat_price

    @mid_seat_price.setter
    def mid_seat_price(self, mid_seat_price: float):
        """Sets the mid_seat_price of this Event.


        :param mid_seat_price: The mid_seat_price of this Event.
        :type mid_seat_price: float
        """

        self._mid_seat_price = mid_seat_price

    @property
    def back_seat_price(self) -> float:
        """Gets the back_seat_price of this Event.


        :return: The back_seat_price of this Event.
        :rtype: float
        """
        return self._back_seat_price

    @back_seat_price.setter
    def back_seat_price(self, back_seat_price: float):
        """Sets the back_seat_price of this Event.


        :param back_seat_price: The back_seat_price of this Event.
        :type back_seat_price: float
        """

        self._back_seat_price = back_seat_price

    @property
    def event_title(self) -> str:
        """Gets the event_title of this Event.


        :return: The event_title of this Event.
        :rtype: str
        """
        return self._event_title

    @event_title.setter
    def event_title(self, event_title: str):
        """Sets the event_title of this Event.


        :param event_title: The event_title of this Event.
        :type event_title: str
        """

        self._event_title = event_title

    @property
    def event_category(self) -> str:
        """Gets the event_category of this Event.


        :return: The event_category of this Event.
        :rtype: str
        """
        return self._event_category

    @event_category.setter
    def event_category(self, event_category: str):
        """Sets the event_category of this Event.


        :param event_category: The event_category of this Event.
        :type event_category: str
        """

        self._event_category = event_category

    @property
    def event_short_desc(self) -> str:
        """Gets the event_short_desc of this Event.


        :return: The event_short_desc of this Event.
        :rtype: str
        """
        return self._event_short_desc

    @event_short_desc.setter
    def event_short_desc(self, event_short_desc: str):
        """Sets the event_short_desc of this Event.


        :param event_short_desc: The event_short_desc of this Event.
        :type event_short_desc: str
        """

        self._event_short_desc = event_short_desc

    @property
    def event_desc(self) -> str:
        """Gets the event_desc of this Event.


        :return: The event_desc of this Event.
        :rtype: str
        """
        return self._event_desc

    @event_desc.setter
    def event_desc(self, event_desc: str):
        """Sets the event_desc of this Event.


        :param event_desc: The event_desc of this Event.
        :type event_desc: str
        """

        self._event_desc = event_desc

    @property
    def event_start_datetime(self) -> str:
        """Gets the event_start_datetime of this Event.


        :return: The event_start_datetime of this Event.
        :rtype: str
        """
        return self._event_start_datetime

    @event_start_datetime.setter
    def event_start_datetime(self, event_start_datetime: str):
        """Sets the event_start_datetime of this Event.


        :param event_start_datetime: The event_start_datetime of this Event.
        :type event_start_datetime: str
        """

        self._event_start_datetime = event_start_datetime

    @property
    def event_end_datetime(self) -> str:
        """Gets the event_end_datetime of this Event.


        :return: The event_end_datetime of this Event.
        :rtype: str
        """
        return self._event_end_datetime

    @event_end_datetime.setter
    def event_end_datetime(self, event_end_datetime: str):
        """Sets the event_end_datetime of this Event.


        :param event_end_datetime: The event_end_datetime of this Event.
        :type event_end_datetime: str
        """

        self._event_end_datetime = event_end_datetime

    @property
    def event_location(self) -> str:
        """Gets the event_location of this Event.


        :return: The event_location of this Event.
        :rtype: str
        """
        return self._event_location

    @event_location.setter
    def event_location(self, event_location: str):
        """Sets the event_location of this Event.


        :param event_location: The event_location of this Event.
        :type event_location: str
        """

        self._event_location = event_location

    @property
    def event_img(self) -> str:
        """Gets the event_img of this Event.


        :return: The event_img of this Event.
        :rtype: str
        """
        return self._event_img

    @event_img.setter
    def event_img(self, event_img: str):
        """Sets the event_img of this Event.


        :param event_img: The event_img of this Event.
        :type event_img: str
        """

        self._event_img = event_img

    @property
    def event_status(self) -> str:
        """Gets the event_status of this Event.


        :return: The event_status of this Event.
        :rtype: str
        """
        return self._event_status

    @event_status.setter
    def event_status(self, event_status: str):
        """Sets the event_status of this Event.


        :param event_status: The event_status of this Event.
        :type event_status: str
        """
        allowed_values = ["Upcoming", "Cancelled", "Completed"]  # noqa: E501
        if event_status not in allowed_values:
            raise ValueError(
                "Invalid value for `event_status` ({0}), must be one of {1}"
                .format(event_status, allowed_values)
            )

        self._event_status = event_status

    @property
    def tags(self) -> List[Tag]:
        """Gets the tags of this Event.


        :return: The tags of this Event.
        :rtype: List[Tag]
        """
        return self._tags

    @tags.setter
    def tags(self, tags: List[Tag]):
        """Sets the tags of this Event.


        :param tags: The tags of this Event.
        :type tags: List[Tag]
        """

        self._tags = tags
