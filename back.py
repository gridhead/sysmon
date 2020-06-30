import os, psutil, time

def GetOSUnameData():
    unamdata = os.uname()
    retndata = {
        "System name": unamdata.sysname + " " + unamdata.release,
        "Host name": unamdata.nodename + " (" + unamdata.machine + ") ",
        "Version": unamdata.version,
    }
    return retndata

def GetCPULogicalCount():
    cpuquant = psutil.cpu_count(logical=True)
    return cpuquant

def RecognizeSystem():
    systarry = []
    if psutil.AIX:
        systarry.append("AIX")
    if psutil.BSD:
        systarry.append("BSD")
    if psutil.FREEBSD:
        systarry.append("FreeBSD")
    if psutil.LINUX:
        systarry.append("Linux")
    if psutil.MACOS:
        systarry.append("MacOS")
    if psutil.NETBSD:
        systarry.append("NetBSD")
    if psutil.OPENBSD:
        systarry.append("OpenBSD")
    if psutil.OSX:
        systarry.append("OSX")
    if psutil.POSIX:
        systarry.append("POSIX")
    if psutil.SUNOS:
        systarry.append("SunOS")
    if psutil.WINDOWS:
        systarry.append("Windows")
    return systarry

def GetVirtualMemoryData():
    bruhdata = psutil.virtual_memory()
    retndata = {
        "Total": bruhdata.total,
        "Available": bruhdata.available,
        "Percent": bruhdata.percent,
        "Used": bruhdata.used,
        "Active": bruhdata.active,
        "Buffers": bruhdata.buffers,
        "Cached": bruhdata.cached,
        "Shared": bruhdata.shared,
        "Slab": bruhdata.slab,
    }
    return retndata

def GetCPUStateTimes():
    timedata = psutil.cpu_times(percpu=True)
    timelist = []
    for indx in timedata:
        singlist = []
        for jndx in indx:
            singlist.append(jndx)
        timelist.append(singlist)
    return timelist

def GetCPUUsagePercent():
    cpuprcnt = psutil.cpu_percent(percpu=True)
    return cpuprcnt

def GetCPUStatistics():
    cpustats = psutil.cpu_stats()
    retndata = {
        "ctxs": cpustats.ctx_switches,
        "intr": cpustats.interrupts,
        "soft": cpustats.soft_interrupts,
        "sysc": cpustats.syscalls,
    }
    return retndata

def GetSwapMemoryInfo():
    swapinfo = psutil.swap_memory()
    return swapinfo

def GetAllDiskPartitions():
    diskpart = psutil.disk_partitions(all=True)
    disklist = []
    for indx in diskpart:
        singlist = []
        for jndx in indx:
            singlist.append(jndx)
        disklist.append(singlist)
    return disklist

def GetCPUClockSpeed():
    cpuclock = psutil.cpu_freq(percpu=True)
    cloklist = []
    for indx in cpuclock:
        singlist = []
        for jndx in indx:
            singlist.append(jndx)
        cloklist.append(singlist)
    return cloklist

def GetDiskIOUsage():
    diousage = psutil.disk_io_counters(perdisk=True)
    dioulist = []
    for indx in diousage.keys():
        dioulist.append(diousage[indx])
    return dioulist, diousage

def GetNetworkIOUsage():
    netusage = psutil.net_io_counters(pernic=True)
    netulist = []
    for indx in netusage.keys():
        netulist.append(netusage[indx])
    return netulist, netusage

def GetNetworkStatistics():
    netstats = psutil.net_if_stats()
    return netstats

def GetNetworkIFAddresses():
    netaddrs = psutil.net_if_addrs()
    return netaddrs

def GetSensorsTemperature():
    senstemp = psutil.sensors_temperatures(fahrenheit=False)
    return senstemp

def GetSensorsFanSpeed():
    fanspeed = psutil.sensors_fans()
    return fanspeed

def GetSensorsBatteryStatus():
    battstat = psutil.sensors_battery()
    return battstat

def GetBootTime():
    boottime = time.ctime(psutil.boot_time())
    return boottime

def GetProcessInfo():
    procinfo = []
    for indx in psutil.process_iter(["pid", "cpu_affinity", "cpu_percent",
                                     "cpu_times", "create_time", "gids",
                                     "memory_info", "memory_percent", "name",
                                     "num_ctx_switches", "num_threads", "status",
                                     "terminal", "threads", "uids",
                                     "username"]):
        procinfo.append(indx.info)
    return procinfo

'''
>>> for proc in psutil.process_iter(['pid', 'name', 'username']):
...     print(proc.info)
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_create_time', '_exe', '_gone', '_hash', '_ident', '_init', '_last_proc_cpu_times', '_last_sys_cpu_times', '_lock', '_name', '_pid', '_ppid', '_proc', '_send_signal', 'as_dict', 'children', 'cmdline', 'connections', 'cpu_affinity', 'cpu_num', 'cpu_percent', 'cpu_times', 'create_time', 'cwd', 'environ', 'exe', 'gids', 'io_counters', 'ionice', 'is_running', 'kill', 'memory_full_info', 'memory_info', 'memory_info_ex', 'memory_maps', 'memory_percent', 'name', 'nice', 'num_ctx_switches', 'num_fds', 'num_threads', 'oneshot', 'open_files', 'parent', 'parents', 'pid', 'ppid', 'resume', 'rlimit', 'send_signal', 'status', 'suspend', 'terminal', 'terminate', 'threads', 'uids', 'username', 'wait']

PID
CPU_AFFINITY
CPU_PERCENT
CPU_TIMES
CREATE_TIME
GIDS
MEMORY_INFO_EX
MEMORY_PERCENT
NAME
NUM_CTX_SWITCHES
NUM_THREADS
STATUS
TERMINAL
THREADS
UIDS
USERNAME
'''