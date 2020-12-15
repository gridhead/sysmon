'''
##########################################################################
*
*   Copyright © 2019-2020 Akashdeep Dhar <t0xic0der@fedoraproject.org>
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <https://www.gnu.org/licenses/>.
*
##########################################################################
'''

import getpass
import os
import psutil
from secrets import choice
import time


class ConnectionManager():
    def PassphraseGenerator(self, lent=16):
        retndata = "".join(choice("ABCDEF0123456789") for i in range(lent))
        return retndata


class ProcessHandler():
    def __init__(self, prociden):
        self.prociden = prociden

    def ReturnProcessInfo(self):
        procstmp = psutil.Process(self.prociden).as_dict()
        retndata = {
            "pid": procstmp["pid"],
            "username": procstmp["username"],
            "uids": {
                "real": procstmp["uids"].real,
                "effective": procstmp["uids"].effective,
                "saved": procstmp["uids"].saved
            },
            "memory_percent": procstmp["memory_percent"],
            "name": procstmp["name"],
            "create_time": time.ctime(procstmp["create_time"]),
            "num_ctx_switches": {
                "voluntary": procstmp["num_ctx_switches"].voluntary,
                "involuntary": procstmp["num_ctx_switches"].involuntary,
            },
            "cpu_percent": procstmp["cpu_percent"],
            "cpu_times": {
                "user": procstmp["cpu_times"].user,
                "system": procstmp["cpu_times"].system,
                "children_user": procstmp["cpu_times"].children_user,
                "children_system": procstmp["cpu_times"].children_system,
                "iowait": procstmp["cpu_times"].iowait,
            },
            "memory_info": {
                "rss": procstmp["memory_info"].rss,
                "vms": procstmp["memory_info"].vms,
                "shared": procstmp["memory_info"].shared,
                "text": procstmp["memory_info"].text,
                "lib": procstmp["memory_info"].lib,
                "data": procstmp["memory_info"].data,
                "dirty": procstmp["memory_info"].dirty,
            },
            "status": procstmp["status"],
            "num_threads": procstmp["num_threads"],
            "gids": {
                "real": procstmp["gids"].real,
                "effective": procstmp["gids"].effective,
                "saved": procstmp["gids"].saved,
            },
            "terminal": procstmp["terminal"]
        }
        return retndata

    def GetSingleProcess(self, prociden):
        try:
            return psutil.Process(int(prociden))
        except Exception as e:
            return str(e)

    def ProcessKiller(self):
        singproc = self.GetSingleProcess(self.prociden)
        if type(singproc) == psutil.Process:
            singproc.kill()
        return {"retnmesg": True}

    def ProcessTerminator(self):
        singproc = self.GetSingleProcess(self.prociden)
        if type(singproc) == psutil.Process:
            singproc.terminate()
        return {"retnmesg": True}

    def ProcessSuspender(self):
        singproc = self.GetSingleProcess(self.prociden)
        if type(singproc) == psutil.Process:
            singproc.suspend()
        return {"retnmesg": True}

    def ProcessResumer(self):
        singproc = self.GetSingleProcess(self.prociden)
        if type(singproc) == psutil.Process:
            singproc.resume()
        return {"retnmesg": True}


class LiveUpdatingElements():
    def __init__(self, passcode):
        self.passcode = passcode

    def GetVirtualMemoryData(self):
        bruhdata = psutil.virtual_memory()
        retndata = {
            "total": bruhdata.total,
            "available": bruhdata.available,
            "percent": bruhdata.percent,
            "used": bruhdata.used,
            "active": bruhdata.active,
            "inactive": bruhdata.inactive,
            "buffers": bruhdata.buffers,
            "cached": bruhdata.cached,
            "shared": bruhdata.shared,
            "slab": bruhdata.slab,
        }
        return retndata

    def GetSwapMemoryInfo(self):
        swapinfo = psutil.swap_memory()
        retndata = {
            "total": swapinfo.total,
            "used": swapinfo.used,
            "free": swapinfo.free,
            "percent": swapinfo.percent,
            "sin": swapinfo.sin,
            "sout": swapinfo.sout,
        }
        return retndata

    def GetCPUStateTimes(self):
        timedata = psutil.cpu_times(percpu=True)
        retndata = {}
        for indx in range(len(timedata)):
            elemobjc = {
                "user": timedata[indx].user,
                "nice": timedata[indx].nice,
                "system": timedata[indx].system,
                "idle": timedata[indx].idle,
                "iowait": timedata[indx].iowait,
                "irq": timedata[indx].irq,
                "softirq": timedata[indx].softirq,
                "steal": timedata[indx].steal,
                "guest": timedata[indx].guest,
                "guest_nice": timedata[indx].guest_nice,
            }
            retndata[indx] = elemobjc
        return retndata

    def GetCPUUsagePercent(self):
        cpuprcnt = psutil.cpu_percent(percpu=True)
        retndata = {}
        for indx in range(len(cpuprcnt)):
            retndata[indx] = cpuprcnt[indx]
        return retndata

    def GetCPUStatistics(self):
        cpustats = psutil.cpu_stats()
        retndata = {
            "ctx_switches": cpustats.ctx_switches,
            "interrupts": cpustats.interrupts,
            "soft_interrupts": cpustats.soft_interrupts,
            "syscalls": cpustats.syscalls,
        }
        return retndata

    def GetCPUClockSpeed(self):
        cpuclock = psutil.cpu_freq(percpu=True)
        retndata = {}
        for indx in range(len(cpuclock)):
            singlist = {
                "current": cpuclock[indx].current,
                "min": cpuclock[indx].min,
                "max": cpuclock[indx].max,
            }
            retndata[indx] = singlist
        return retndata

    def GetDiskIOUsage(self):
        diousage = psutil.disk_io_counters(perdisk=True)
        retndata = {}
        for indx in diousage.keys():
            singlist = {
                "read_count": diousage[indx].read_count,
                "write_count": diousage[indx].write_count,
                "read_bytes": diousage[indx].read_bytes,
                "write_bytes": diousage[indx].write_bytes,
                "read_time": diousage[indx].read_time,
                "write_time": diousage[indx].write_time,
                "read_merged_count": diousage[indx].read_merged_count,
                "write_merged_count": diousage[indx].write_merged_count,
                "busy_time": diousage[indx].busy_time,
            }
            retndata[indx] = singlist
        return retndata

    def GetNetworkIOUsage(self):
        netusage = psutil.net_io_counters(pernic=True)
        retndata = {}
        for indx in netusage.keys():
            singlist = {
                "bytes_sent": netusage[indx].bytes_sent,
                "bytes_recv": netusage[indx].bytes_recv,
                "packets_sent": netusage[indx].packets_sent,
                "packets_recv": netusage[indx].packets_recv,
                "errin": netusage[indx].errin,
                "errout": netusage[indx].errout,
                "dropin": netusage[indx].dropin,
                "dropout": netusage[indx].dropout,
            }
            retndata[indx] = singlist
        return retndata

    def GetProcessListingInfo(self):
        procstmp = psutil.process_iter(["pid", "name", "username", "memory_percent", "cpu_percent"])
        retndata = {}
        for indx in procstmp:
            singlist = {
                "pid": indx.info["pid"],
                "name": indx.info["name"],
                "username": indx.info["username"],
                "memory_percent": indx.info["memory_percent"],
                "cpu_percent": indx.info["cpu_percent"],
            }
            retndata[indx.info["pid"]] = singlist
        return retndata

    def GetSensorsTemperature(self):
        senstemp = psutil.sensors_temperatures(fahrenheit=False)
        retndata = {}
        for indx in senstemp.keys():
            retndata[indx] = []
            for jndx in senstemp[indx]:
                singdict = {
                    "label": jndx.label,
                    "current": str(jndx.current),
                    "high": str(jndx.high),
                    "critical": str(jndx.critical),
                }
                retndata[indx].append(singdict)
        return retndata

    def GetSensorsFanSpeed(self):
        senstemp = psutil.sensors_fans()
        retndata = {}
        for indx in senstemp.keys():
            retndata[indx] = []
            for jndx in senstemp[indx]:
                singdict = {
                    "label": jndx.label,
                    "current": jndx.current
                }
                retndata[indx].append(singdict)
        return retndata

    def GetSensorsBatteryStatus(self):
        retndata = {}
        try:
            battstat = psutil.sensors_battery()
            retndata = {
                "percent": battstat.percent,
                "secsleft": battstat.secsleft,
                "power_plugged": battstat.power_plugged,
            }
        except:
            retndata = {
                "percent": 0,
                "secsleft": 0,
                "power_plugged": True,
            }
        return retndata

    def ReturnLiveData(self):
        jsonobjc = {
            "passcode": self.passcode,
            "virtdata": self.GetVirtualMemoryData(),
            "swapinfo": self.GetSwapMemoryInfo(),
            "cpustats": self.GetCPUStatistics(),
            "cputimes": self.GetCPUStateTimes(),
            "cpuprcnt": self.GetCPUUsagePercent(),
            "cpuclock": self.GetCPUClockSpeed(),
            "diousage": self.GetDiskIOUsage(),
            "netusage": self.GetNetworkIOUsage(),
            "procinfo": self.GetProcessListingInfo(),
            "sensread": {
                "senstemp": self.GetSensorsTemperature(),
                "fanspeed": self.GetSensorsFanSpeed(),
                "battstat": self.GetSensorsBatteryStatus(),
            }
        }
        return jsonobjc


class DeadUpdatingElements(LiveUpdatingElements):
    def __init__(self, passcode):
        self.passcode = passcode

    def GetOSUnameData(self):
        unamdata = os.uname()
        retndata = {
            "System name": unamdata.sysname + " " + unamdata.release,
            "Host name": unamdata.nodename + " [" + unamdata.machine + "] ",
            "Version": unamdata.version,
            "Username": getpass.getuser(),
        }
        return retndata

    def GetCPULogicalCount(self):
        cpuquant = psutil.cpu_count(logical=True)
        return str(cpuquant)

    def GetAllDiskPartitions(self):
        diskpart = psutil.disk_partitions(all=True)
        retndata = []
        for indx in diskpart:
            singinfo = {
                "device": indx.device,
                "mountpoint": indx.mountpoint,
                "fstype": indx.fstype,
                "opts": indx.opts,
            }
            retndata.append(singinfo)
        return retndata

    def GetNetworkStatistics(self):
        netstats = psutil.net_if_stats()
        retndata = {}
        for indx in netstats.keys():
            singinfo = {
                "isup": netstats[indx].isup,
                "duplex": netstats[indx].duplex,
                "speed": netstats[indx].speed,
                "mtu": netstats[indx].mtu,
            }
            retndata[indx] = singinfo
        return retndata

    def GetNetworkIFAddresses(self):
        netaddrs = psutil.net_if_addrs()
        retndata = {}
        for indx in netaddrs.keys():
            retndata[indx] = {}
            for jndx in netaddrs[indx]:
                addrobjc = {
                    "address": jndx.address,
                    "netmask": jndx.netmask,
                    "broadcast": jndx.broadcast,
                    "ptp": jndx.ptp,
                }
                retndata[indx][jndx.family] = addrobjc
        return retndata

    def GetBootTime(self):
        boottime = time.ctime(psutil.boot_time())
        return boottime

    def ReturnDeadData(self):
        jsonobjc = {
            "passcode": self.passcode,
            "osnmdata": self.GetOSUnameData(),
            "cpuquant": self.GetCPULogicalCount(),
            "cpuclock": self.GetCPUClockSpeed(),
            "diskpart": self.GetAllDiskPartitions(),
            "diousage": self.GetDiskIOUsage(),
            "netusage": self.GetNetworkIOUsage(),
            "netaddrs": self.GetNetworkIFAddresses(),
            "netstats": self.GetNetworkStatistics(),
            "boottime": self.GetBootTime(),
            "procinfo": self.GetProcessListingInfo(),
            "sensread": {
                "senstemp": self.GetSensorsTemperature(),
                "fanspeed": self.GetSensorsFanSpeed(),
                "battstat": self.GetSensorsBatteryStatus()
            }
        }
        return jsonobjc