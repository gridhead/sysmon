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


from flask import Blueprint, Response, jsonify

from sysmon.base.proc import (
    obtain_proc_info_full,
    obtain_proc_info_unit,
    obtain_proc_load,
    obtain_proc_stat,
)

proc = Blueprint("proc", __name__, url_prefix="/proc")


@proc.route("/load", methods=["GET"])
def endpoint_obtain_proc_load() -> Response:
    return jsonify(obtain_proc_load()), 200


@proc.route("/stat", methods=["GET"])
def endpoint_obtain_proc_stat() -> Response:
    return jsonify(obtain_proc_stat()), 200


@proc.route("/full", methods=["GET"])
def endpoint_obtain_proc_info_full() -> Response:
    return jsonify(obtain_proc_info_full()), 200


@proc.route("/unit", methods=["GET"])
def endpoint_obtain_proc_info_unit() -> Response:
    return jsonify(obtain_proc_info_unit()), 200
