import asyncio
import click
import getpass
import json
import os
import psutil
from secrets import choice
import sys
import time
import websockets


class ConnectionManager():
    def PassphraseGenerator(self, lent=16):
        retndata = "".join(choice("ABCDEF0123456789") for i in range(lent))
        return retndata


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

    def GetProcessInfo(self):
        procstmp = psutil.process_iter(["pid", "cpu_affinity", "cpu_percent",
                                         "cpu_times", "create_time", "gids",
                                         "memory_info", "memory_percent", "name",
                                         "num_ctx_switches", "num_threads", "status",
                                         "terminal", "threads", "uids",
                                         "username"])
        retndata = {}
        for indx in procstmp:
            singlist = {
                "username": indx.info["username"],
                "pid": indx.info["pid"],
                "uid": {
                    "real": indx.info["uids"].real,
                    "effective": indx.info["uids"].effective,
                    "saved": indx.info["uids"].saved,
                },
                "memory_percent": indx.info["memory_percent"],
                "name": indx.info["name"],
                "create_time": time.ctime(indx.info["create_time"]),
                "num_ctx_switches": {
                    "voluntary": indx.info["num_ctx_switches"].voluntary,
                    "involuntary": indx.info["num_ctx_switches"].involuntary,
                },
                "cpu_percent": indx.info["cpu_percent"],
                "cpu_times": {
                    "user": indx.info["cpu_times"].user,
                    "system": indx.info["cpu_times"].system,
                    "children_user": indx.info["cpu_times"].children_user,
                    "children_system": indx.info["cpu_times"].children_system,
                    "iowait": indx.info["cpu_times"].iowait,
                },
                "memory_info": {
                    "rss": indx.info["memory_info"].rss,
                    "vms": indx.info["memory_info"].vms,
                    "shared": indx.info["memory_info"].shared,
                    "text": indx.info["memory_info"].text,
                    "lib": indx.info["memory_info"].lib,
                    "data": indx.info["memory_info"].data,
                    "dirty": indx.info["memory_info"].dirty,
                },
                "status": indx.info["status"],
                "num_threads": indx.info["num_threads"],
                "gids": {
                    "real": indx.info["gids"].real,
                    "effective": indx.info["gids"].effective,
                    "saved": indx.info["gids"].saved,
                },
                "terminal": indx.info["terminal"],
            }
            retndata[indx.info["pid"]] = singlist
        return retndata

    def GetSensorsTemperature(self):
        senstemp = psutil.sensors_temperatures(fahrenheit=False)
        retndata = {}
        for indx in senstemp.keys():
            retndata[indx] = {}
            for jndx in senstemp[indx]:
                singlist = {
                    "current": jndx.current,
                    "high": jndx.high,
                    "critical": jndx.critical,
                }
                retndata[indx][jndx.label] = singlist
        return retndata

    def GetSensorsFanSpeed(self):
        senstemp = psutil.sensors_fans()
        retndata = {}
        for indx in senstemp.keys():
            retndata[indx] = {}
            for jndx in senstemp[indx]:
                retndata[indx][jndx.label] = jndx.current
        return retndata

    def GetSensorsBatteryStatus(self):
        battstat = psutil.sensors_battery()
        retndata = {
            "percent": battstat.percent,
            "secsleft": battstat.secsleft,
            "power_plugged": battstat.power_plugged,
        }
        return retndata

    def ReturnLiveData(self):
        jsonobjc = {
            "passcode": self.passcode,
            "virtdata": self.GetVirtualMemoryData(),
            "swapinfo": self.GetSwapMemoryInfo(),
            "cputimes": self.GetCPUStateTimes(),
            "cpuprcnt": self.GetCPUUsagePercent(),
            "cpuclock": self.GetCPUClockSpeed(),
            "diousage": self.GetDiskIOUsage(),
            "netusage": self.GetNetworkIOUsage(),
            "procinfo": self.GetProcessInfo(),
            "sensread": {
                "senstemp": self.GetSensorsTemperature(),
                "fanspeed": self.GetSensorsFanSpeed(),
                "battstat": self.GetSensorsBatteryStatus(),
            }
        }
        return json.dumps(jsonobjc)


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
            "diskpart": self.GetAllDiskPartitions(),
            "diousage": self.GetDiskIOUsage(),
            "netusage": self.GetNetworkIOUsage(),
            "netaddrs": self.GetNetworkIFAddresses(),
            "netstats": self.GetNetworkStatistics(),
            "senstemp": self.GetSensorsTemperature(),
            "fanspeed": self.GetSensorsFanSpeed(),
            "boottime": self.GetBootTime(),
            "procinfo": self.GetProcessInfo(),
        }
        return json.dumps(jsonobjc)


async def AsynchronousTransferLive(sockobjc, path):
    print(" * LiveSync activated on " + time.ctime())
    while True:
        liveobjc = LiveUpdatingElements(passcode).ReturnLiveData()
        await sockobjc.send(liveobjc)
        await asyncio.sleep(1)


async def AsynchronousTransferDead(sockobjc, path):
    print(" * DeadSync activated on " + time.ctime())
    deadobjc = DeadUpdatingElements(passcode).ReturnDeadData()
    await sockobjc.send(deadobjc)


@click.command()
@click.option("-l", "--liveport", "liveport", help="Set the port value for LiveSync [0-65536]", default="1969")
@click.option("-d", "--deadport", "deadport", help="Set the port value for DeadSync [0-65536]", default="2020")
@click.option("-6", "--ipprotv6", "netprotc", flag_value="ipprotv6", help="Start the server on an IPv6 address")
@click.option("-4", "--ipprotv4", "netprotc", flag_value="ipprotv4", help="Start the server on an IPv4 address")
@click.version_option(version="0.1.0", prog_name="WebStation SYSMON by t0xic0der")
def mainfunc(liveport, deadport, netprotc):
    try:
        print(" * Starting WebStation SYSMON driver")
        netpdata = ""
        global passcode
        passcode = ConnectionManager().PassphraseGenerator()
        if netprotc == "ipprotv6":
            print(" * IP version   : 6")
            netpdata = "::"
        elif netprotc == "ipprotv4":
            print(" * IP version   : 4")
            netpdata = "0.0.0.0"
        print(" * Passcode     : " + passcode)
        print(" * LiveSync URI : ws://" + netpdata + ":" + str(liveport) + "/")
        print(" * DeadSync URI : ws://" + netpdata + ":" + str(deadport) + "/")
        livesock = websockets.serve(AsynchronousTransferLive, netpdata, liveport)
        deadsock = websockets.serve(AsynchronousTransferDead, netpdata, deadport)
        asyncio.get_event_loop().run_until_complete(livesock)
        asyncio.get_event_loop().run_until_complete(deadsock)
        asyncio.get_event_loop().run_forever()
    except KeyboardInterrupt:
        print()
        print(" * Leaving WebStation SYSMON driver")
        sys.exit()


if __name__ == "__main__":
    mainfunc()