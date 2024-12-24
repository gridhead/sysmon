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


from flask import Flask

from sysmon import __projname__, conf
from sysmon.path.disk import disk
from sysmon.path.memo import memo
from sysmon.path.misc import misc
from sysmon.path.ntwk import ntwk
from sysmon.path.proc import proc
from sysmon.path.task import task


def main():
    serv = Flask(
        import_name=__projname__,
        template_folder="frontend",
        static_folder="frontend/assets"
    )
    serv.register_blueprint(disk)
    serv.register_blueprint(memo)
    serv.register_blueprint(misc)
    serv.register_blueprint(ntwk)
    serv.register_blueprint(proc)
    serv.register_blueprint(task)
    serv.secret_key = conf.secret
    return serv


def work() -> None:
    """
    Starts the application service on all interfaces with the defined config data

    :return:
    """
    serv = main()
    serv.run(
        host="0.0.0.0",  # noqa : S104
        port=conf.port,
        debug=conf.repair
    )
