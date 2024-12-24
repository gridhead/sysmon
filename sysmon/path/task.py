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

from sysmon.base.task import (
    hang_task_with_identity,
    kill_task_with_identity,
    obtain_task_data_with_identity,
    obtain_task_list,
    resume_task_with_identity,
    stop_task_with_identity,
)

task = Blueprint("task", __name__, url_prefix="/task")


@task.route("/list", methods=["GET"])
def endpoint_obtain_task_list() -> Response:
    return jsonify(obtain_task_list()), 200


@task.route("/data/<iden>", methods=["GET"])
def endpoint_obtain_task_data_with_identity(iden: str) -> Response:
    data = obtain_task_data_with_identity(int(iden))
    if data[0]:
        result, code = data[1], 200
    else:
        result, code = {"data": "Unable to obtain task data"}, 404
    return jsonify(result), code


@task.route("/hang/<iden>", methods=["POST"])
def endpoint_hang_task_with_identity(iden: str) -> Response:
    result = hang_task_with_identity(int(iden))
    return jsonify({
        "data": result
    }), 202 if result else 422


@task.route("/kill/<iden>", methods=["POST"])
def endpoint_kill_task_with_identity(iden: str) -> Response:
    result = kill_task_with_identity(int(iden))
    return jsonify({
        "data": result
    }), 202 if result else 422


@task.route("/stop/<iden>", methods=["POST"])
def endpoint_stop_task_with_identity(iden: str) -> Response:
    result = stop_task_with_identity(int(iden))
    return jsonify({
        "data": result
    }), 202 if result else 422


@task.route("/resume/<iden>", methods=["POST"])
def endpoint_resume_task_with_identity(iden: str) -> Response:
    result = resume_task_with_identity(int(iden))
    return jsonify({
        "data": result
    }), 202 if result else 422
