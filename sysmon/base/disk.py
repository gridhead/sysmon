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


import psutil


def obtain_disk_partitions(entire: bool = False) -> dict:
    data = psutil.disk_partitions(all=entire)
    result = {
        "numb": len(data),
        "data": {}
    }
    for indx, item in enumerate(data):
        result["data"][indx] = {
            "devs": item.device,
            "mtpt": item.mountpoint,
            "type": item.fstype,
            "opts": [word.upper() for word in item.opts.split(",")],
        }
        try:
            size = psutil.disk_usage(item.mountpoint)
            result["data"][indx]["size"] = {
                "relative": size.percent,
                "absolute": {
                    "full": size.total,
                    "free": size.free,
                    "used": size.used,
                }
            }
        except Exception:
            size = psutil._common.sdiskusage(percent=0.0, total=0, free=0, used=0)
            result["data"][indx]["size"] = {
                "relative": size.percent,
                "absolute": {
                    "full": size.total,
                    "free": size.free,
                    "used": size.used,
                }
            }
    return result


def obtain_disk_counters() -> dict:
    data = psutil.disk_io_counters(perdisk=False)
    result = {
        "size": {
            "rd": data.read_bytes,
            "wt": data.write_bytes,
        },
        "numb": {
            "rd": data.read_count,
            "wt": data.write_count,
        },
        "time": {
            "rd": data.read_time,
            "wt": data.write_time,
        }
    }
    return result
