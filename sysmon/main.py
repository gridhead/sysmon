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


from os import urandom

from click import group, option, version_option

from sysmon import __versdata__, conf
from sysmon.dyno import work


@group(
    name="sysmon",
    context_settings={"show_default": True},
    help="Remotely accessible service for monitoring system performance and managing running processes",  # noqa: E501
)
@option(
    "-r",
    "--repair",
    "repair",
    type=bool,
    default=conf.repair,
    help="Show the nerdy statistics to help repair the codebase."
)
@version_option(
    version=__versdata__, prog_name="SysMon by Akashdeep Dhar"
)
def main(repair):
    conf.repair = repair
    conf.secret = urandom(32).hex().upper()
    if repair:
        conf.logrconf["handlers"]["console"]["level"] = "DEBUG"
        conf.logrconf["root"]["level"] = "DEBUG"


@main.command(
    name="remote",
    help="Start the remote server",
    context_settings={"show_default": True},
)
@option(
    "-p",
    "--port",
    "port",
    type=int,
    default=conf.port,
    help="Set the port value for the service frontend endpoints.",
)
@option(
    "-u",
    "--username",
    "username",
    type=str,
    default=conf.username,
    help="Set the username for service authentication.",
)
@option(
    "-w",
    "--password",
    "password",
    type=str,
    default=conf.password,
    help="Set the password for service authentication.",
)
def remote(port, username, password):
    conf.port = port
    conf.username = username
    conf.password = password
    work()
