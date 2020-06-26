import os, psutil

def GetOSUnameData():
    unamdata = os.uname()
    retndata = {
        "System name": unamdata.sysname + " " + unamdata.release,
        "Host name": unamdata.nodename + " (" + unamdata.machine + ") ",
        "Version": unamdata.version,
    }
    return retndata

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