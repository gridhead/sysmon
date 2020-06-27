import os, psutil

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

'''
[t0xic0der@ToxicDragon ~]$ python3 
Python 3.8.3 (default, May 17 2020, 18:15:42) 
[GCC 10.1.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import psutil
>>> psutil.cpu_times(percpu=True)
[scputimes(user=287.75, nice=0.1, system=98.47, idle=2841.45, iowait=107.61, irq=25.47, softirq=8.4, steal=0.0, guest=0.0, guest_nice=0.0), scputimes(user=265.53, nice=0.08, system=71.96, idle=2899.23, iowait=126.33, irq=6.85, softirq=3.01, steal=0.0, guest=0.0, guest_nice=0.0), scputimes(user=262.88, nice=0.08, system=66.25, idle=2927.21, iowait=99.74, irq=8.11, softirq=4.94, steal=0.0, guest=0.0, guest_nice=0.0), scputimes(user=256.55, nice=0.1, system=66.38, idle=2864.99, iowait=172.99, irq=6.66, softirq=4.05, steal=0.0, guest=0.0, guest_nice=0.0)]
>>> psutil.cpu_percent(percpu=True)
[10.9, 10.8, 10.1, 10.9]
>>> psutil.cpu_count(logical=True)
4
>>> psutil.cpu_count(logical=False)
4
>>> psutil.cpu_stats()
scpustats(ctx_switches=11033914, interrupts=5066753, soft_interrupts=4870922, syscalls=0)
>>> psutil.cpu_freq(percpu=True)
[scpufreq(current=2531.551, min=800.0, max=3500.0), scpufreq(current=2662.429, min=800.0, max=3500.0), scpufreq(current=800.029, min=800.0, max=3500.0), scpufreq(current=800.075, min=800.0, max=3500.0)]
>>> 
'''


def GetCPUStatistics():
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