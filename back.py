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