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


import platform

import psutil
from cpuinfo import get_cpu_info


def obtain_proc_info_full() -> dict:
    core = psutil.cpu_count(logical=True)
    time_absolute, time_relative = (
        psutil.cpu_times(percpu=True),
        psutil.cpu_times_percent(percpu=True)
    )
    proc_freqlist, proc_centlist = (
        psutil.cpu_freq(percpu=True),
        psutil.cpu_percent(percpu=True)
    )
    result = {
        "core": core,
        "data": {}
    }
    for indx in range(core):
        result["data"][indx] = {
            "cent": proc_centlist[indx],
            "freq": {
                "peak": proc_freqlist[indx].max,
                "base": proc_freqlist[indx].min,
                "curt": proc_freqlist[indx].current,
            },
            "time": {
                "absolute": {
                    "user": time_absolute[indx].user,
                    "syst": time_absolute[indx].system,
                    "idle": time_absolute[indx].idle,
                    "intr": (
                        time_absolute[indx].irq
                        if platform.system() == "Linux" else
                        time_absolute[indx].interrupt
                    )
                },
                "relative": {
                    "user": time_relative[indx].user,
                    "syst": time_relative[indx].system,
                    "idle": time_relative[indx].idle,
                    "intr": (
                        time_relative[indx].irq
                        if platform.system() == "Linux" else
                        time_absolute[indx].interrupt
                    )
                },
            }
        }
    return result


def obtain_proc_info_unit() -> dict:
    core = psutil.cpu_count(logical=True)
    time_absolute, time_relative = (
        psutil.cpu_times(percpu=False),
        psutil.cpu_times_percent(percpu=False)
    )
    proc_freqdata, proc_centdata = (
       psutil.cpu_freq(percpu=False),
       psutil.cpu_percent(percpu=False)
    )
    metainfo = get_cpu_info()
    result = {
        "core": core,
        "cent": proc_centdata,
        "meta": {
            "vend": metainfo.get("vendor_id_raw", "Absent"),
            "name": metainfo.get("brand_raw", "Absent"),
            "flag": metainfo.get("flags", []),
            "freq": metainfo.get("hz_actual_friendly", "0 GHz"),
            "arch": metainfo.get("arch", "Absent"),
            "core": metainfo.get("count", 0),
        },
        "freq": {
            "peak": proc_freqdata.max,
            "base": proc_freqdata.min,
            "curt": proc_freqdata.current,
        },
        "time": {
            "absolute": {
                "user": time_absolute.user,
                "syst": time_absolute.system,
                "idle": time_absolute.idle,
                "intr": (
                    time_absolute.irq
                    if platform.system() == "Linux" else
                    time_absolute.interrupt
                )
            },
            "relative": {
                "user": time_relative.user,
                "syst": time_relative.system,
                "idle": time_relative.idle,
                "intr": (
                    time_relative.irq
                    if platform.system() == "Linux" else
                    time_absolute.interrupt
                )
            },
        }
    }
    return result


def obtain_proc_stat() -> dict:
    stat = psutil.cpu_stats()
    result = {
        "ctxt": stat.ctx_switches,
        "hirq": stat.interrupts,
        "sirq": stat.soft_interrupts,
        "call": stat.syscalls,
    }
    return result


def obtain_proc_load() -> dict:
    core = psutil.cpu_count(logical=True)
    load = tuple([item * 100 / core for item in psutil.getloadavg()])
    result = {
        "time_01": load[0],
        "time_05": load[1],
        "time_15": load[2],
    }
    return result
