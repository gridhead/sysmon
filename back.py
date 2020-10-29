import os, psutil, time, getpass


def GetOSUnameData():
    unamdata = os.uname()
    retndata = {
        "System name": unamdata.sysname + " " + unamdata.release,
        "Host name": unamdata.nodename + " [" + unamdata.machine + "] ",
        "Version": unamdata.version,
        "Username": getpass.getuser(),
    }
    return retndata


def GetCPULogicalCount():
    cpuquant = psutil.cpu_count(logical=True)
    return cpuquant


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
    return diousage


def GetNetworkIOUsage():
    netusage = psutil.net_io_counters(pernic=True)
    return netusage


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


def GetSingleProcess(prociden):
    try:
        return psutil.Process(int(prociden))
    except Exception as e:
        return str(e)


def KillSingleProcess(prociden):
    singproc = GetSingleProcess(prociden)
    if type(singproc) == psutil.Process:
        singproc.kill()


def TerminateSingleProcess(prociden):
    singproc = GetSingleProcess(prociden)
    if type(singproc) == psutil.Process:
        singproc.terminate()


def SuspendSingleProcess(prociden):
    singproc = GetSingleProcess(prociden)
    if type(singproc) == psutil.Process:
        singproc.suspend()


def ResumeSingleProcess(prociden):
    singproc = GetSingleProcess(prociden)
    if type(singproc) == psutil.Process:
        singproc.resume()
