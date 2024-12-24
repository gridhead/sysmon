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


import time

import psutil


def obtain_connection_info() -> dict:
    prevmult, prevunit = psutil.net_io_counters(pernic=True), psutil.net_io_counters(pernic=False)
    time.sleep(1)
    nextmult, nextunit = psutil.net_io_counters(pernic=True), psutil.net_io_counters(pernic=False)
    addrdata = psutil.net_if_addrs()
    statdata = psutil.net_if_stats()

    result = {
        "numb": len(nextmult),
        "unit": {
            "rate": {
                "size": {
                    "sent": nextunit.bytes_sent - prevunit.bytes_sent,
                    "recv": nextunit.bytes_recv - prevunit.bytes_recv,
                },
                "pack": {
                    "sent": nextunit.packets_sent - prevunit.packets_sent,
                    "recv": nextunit.packets_recv - prevunit.packets_recv,
                },
                "drop": {
                    "sent": nextunit.dropout - prevunit.dropout,
                    "recv": nextunit.dropin - prevunit.dropin,
                },
                "flaw": {
                    "sent": nextunit.errout - prevunit.errout,
                    "recv": nextunit.errin - prevunit.errin,
                }
            },
            "data": {
                "size": {
                    "sent": nextunit.bytes_sent,
                    "recv": nextunit.bytes_recv,
                },
                "pack": {
                    "sent": nextunit.packets_sent,
                    "recv": nextunit.packets_recv,
                },
                "drop": {
                    "sent": nextunit.dropout,
                    "recv": nextunit.dropin,
                },
                "flaw": {
                    "sent": nextunit.errout,
                    "recv": nextunit.errin,
                }
            }
        },
        "mult": {}
    }

    for item in nextmult:
        result["mult"][item] = {
            "stat": {
                "isup": statdata[item].isup,
                "dplx": statdata[item].duplex.name,
                "rate": statdata[item].speed,
                "mxtu": statdata[item].mtu,
            },
            "rate": {
                "size": {
                    "sent": nextmult[item].bytes_sent - prevmult[item].bytes_sent,
                    "recv": nextmult[item].bytes_recv - prevmult[item].bytes_recv,
                },
                "pack": {
                    "sent": nextmult[item].packets_sent - prevmult[item].packets_sent,
                    "recv": nextmult[item].packets_recv - prevmult[item].packets_recv,
                },
                "drop": {
                    "sent": nextmult[item].dropout - prevmult[item].dropout,
                    "recv": nextmult[item].dropin - prevmult[item].dropin,
                },
                "flaw": {
                    "sent": nextmult[item].errout - prevmult[item].errout,
                    "recv": nextmult[item].errin - prevmult[item].errin,
                }
            },
            "data": {
                "size": {
                    "sent": nextmult[item].bytes_sent,
                    "recv": nextmult[item].bytes_recv,
                },
                "pack": {
                    "sent": nextmult[item].packets_sent,
                    "recv": nextmult[item].packets_recv,
                },
                "drop": {
                    "sent": nextmult[item].dropout,
                    "recv": nextmult[item].dropin,
                },
                "flaw": {
                    "sent": nextmult[item].errout,
                    "recv": nextmult[item].errin,
                }
            },
            "addr": [
                {
                    "type": addr.family.name,
                    "addr": addr.address,
                    "mask": str(addr.netmask),
                    "cast": str(addr.broadcast),
                    "ptop": str(addr.ptp),
                } for addr in addrdata[item]
            ]
        }

    return result
