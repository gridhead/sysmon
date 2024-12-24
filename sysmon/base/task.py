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


from datetime import datetime

import psutil

from sysmon.view import warning


def obtain_task_data(unit: psutil.Process) -> dict:
    result = {
        "iden": unit.pid,
        "name": unit.name(),
        "memo": unit.memory_info().rss,
        "proc": unit.cpu_percent(),
    }
    try:
        ioct = unit.io_counters()
        result["size"] = {
            "rd": ioct.read_bytes,
            "wt": ioct.write_bytes,
        }
    except Exception as expt:
        warning(f"Unable to obtain task data: {expt}")
        result["size"] = {
            "rd": 0,
            "wt": 0,
        }
    return result


def obtain_task_list() -> dict:
    result = {}
    for item in psutil.process_iter():
        result[item.pid] = obtain_task_data(item)
    return result


def obtain_task_data_with_identity(iden: int) -> tuple:
    result = False, {}

    try:
        procdata = psutil.Process(pid=iden)
        iden = procdata.pid
        name = procdata.name()
        proc = procdata.cpu_percent()
        stat = procdata.status()
        grip = " ".join(procdata.cmdline())
        thrd = procdata.num_threads()
        date = datetime.fromtimestamp(procdata.create_time()).strftime("%X %d/%m/%Y")

        tdat = procdata.cpu_times()
        time = {
            "user": tdat.user,
            "syst": tdat.system,
            "cusr": tdat.children_user,
            "csys": tdat.children_system,
        }

        cdat = procdata.num_ctx_switches()
        ctxt = {
            "volu": cdat.voluntary,
            "invo": cdat.involuntary,
        }

        try:
            omem = procdata.memory_full_info()
            orss, ovms, ouss = omem.rss, omem.vms, omem.uss
            prss, pvms, puss = (
                procdata.memory_percent(memtype="rss"),
                procdata.memory_percent(memtype="vms"),
                procdata.memory_percent(memtype="uss")
            )
        except Exception:
            orss, ovms, ouss = 0, 0, 0
            prss, pvms, puss = 0, 0, 0

        kdat = procdata.children()
        kids = {}
        for item in kdat:
            kids[item.pid] = obtain_task_data(item)

        mdat = procdata.parents()
        moms = {}
        for item in mdat:
            moms[item.pid] = obtain_task_data(item)

        result = True, {
            "iden": iden,
            "name": name,
            "proc": proc,
            "stat": stat,
            "grip": grip,
            "thrd": thrd,
            "date": date,
            "time": time,
            "ctxt": ctxt,
            "kids": kids,
            "moms": moms,
            "omem": {
                "orss": orss,
                "ovms": ovms,
                "ouss": ouss,
            },
            "pmem": {
                "prss": prss,
                "pvms": pvms,
                "puss": puss,
            }
        }

    except Exception as expt:
        warning(f"Unable to obtain task data: {expt}")

    return result


def hang_task_with_identity(iden: int) -> bool:
    result = True
    try:
        unit = psutil.Process(pid=iden)
        unit.suspend()
    except Exception as expt:
        warning(f"Unable to hang identified task: {expt}")
        result = False
    return result


def kill_task_with_identity(iden: int) -> bool:
    result = True
    try:
        unit = psutil.Process(pid=iden)
        unit.kill()
    except Exception as expt:
        warning(f"Unable to kill identified task: {expt}")
        result = False
    return result


def stop_task_with_identity(iden: int) -> bool:
    result = True
    try:
        unit = psutil.Process(pid=iden)
        unit.terminate()
    except Exception as expt:
        warning(f"Unable to terminate identified task: {expt}")
        result = False
    return result


def resume_task_with_identity(iden: int) -> bool:
    result = True
    try:
        unit = psutil.Process(pid=iden)
        unit.resume()
    except Exception as expt:
        warning(f"Unable to resume identified task: {expt}")
        result = False
    return result
