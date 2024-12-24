"""
SysMon
Copyright (C) 2024 Akashdeep Dhar

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <https://www.gnu.org/licenses/>.

Any Red Hat trademarks that are incorporated in the codebase or documentation
are not subject to the GNU Affero General Public License and may only be used
or replicated with the express permission of Red Hat, Inc.
"""


from functools import wraps
from typing import Callable

from flask import abort, request, session

from sysmon import conf


def checkpoint(path: Callable) -> Callable:
    """
    Confirm if the session is valid before allowing the access to the endpoints

    :return:
    """
    @wraps(path)
    def authenticate(*args, **kwargs) -> Callable:
        username, password = request.headers.get("username"), request.headers.get("password")
        if ("username" in session and "password" in session) or (username == conf.username and password == conf.password):  # noqa: E501
            return path(*args, **kwargs)
        return abort(401, "Invalid credentials")
    return authenticate
