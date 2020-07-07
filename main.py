from flask import Flask, render_template, jsonify
import back, click


main = Flask(__name__)


@main.route("/virtdata/", methods=["GET"])
def virtdata():
    retndata = back.GetVirtualMemoryData()
    retnjson = jsonify(virtdata=retndata)
    return retnjson


@main.route("/cputimes/", methods=["GET"])
def cputimes():
    retndata = back.GetCPUStateTimes()
    retnjson = jsonify(cputimes=retndata)
    return retnjson


@main.route("/cpuprcnt/", methods=["GET"])
def cpuprcnt():
    retndata = back.GetCPUUsagePercent()
    retndata = jsonify(cpuprcnt=retndata)
    return retndata


@main.route("/cpustats/", methods=["GET"])
def cpustats():
    retndata = back.GetCPUStatistics()
    retnjson = jsonify(cpustats=retndata)
    return retnjson


@main.route("/swapinfo/", methods=["GET"])
def swapinfo():
    retndata = back.GetSwapMemoryInfo()
    retnjson = jsonify(swapinfo=retndata)
    return retnjson


@main.route("/cpuclock/", methods=["GET"])
def cpuclock():
    retndata = back.GetCPUClockSpeed()
    retnjson = jsonify(cpuclock=retndata)
    return retnjson


@main.route("/diousage/", methods=["GET"])
def diousage():
    retndata = back.GetDiskIOUsage()[0]
    retnjson = jsonify(diousage=retndata)
    return retnjson


@main.route("/senstemp/", methods=["GET"])
def senstemp():
    retndata = back.GetSensorsTemperature()
    retnjson = jsonify(senstemp=retndata)
    return retnjson


@main.route("/netusage/", methods=["GET"])
def netusage():
    retndata = back.GetNetworkIOUsage()[0]
    retnjson = jsonify(netusage=retndata)
    return retnjson


@main.route("/fanspeed/", methods=["GET"])
def fanspeed():
    retndata = back.GetSensorsFanSpeed()
    retnjson = jsonify(fanspeed=retndata)
    return retnjson


@main.route("/battstat/", methods=["GET"])
def battstat():
    retndata = back.GetSensorsBatteryStatus()
    retnjson = jsonify(battstat=retndata)
    return retnjson


@main.route("/procinfo/", methods=["GET"])
def procinfo():
    retndata = back.GetProcessInfo()
    retnjson = jsonify(procinfo=retndata)
    return retnjson


@main.route("/termproc/<prociden>/", methods=["GET"])
def termproc(prociden):
    back.TerminateSingleProcess(prociden)
    return "Terminated"


@main.route("/killproc/<prociden>/", methods=["GET"])
def killproc(prociden):
    back.KillSingleProcess(prociden)
    return "Killed"


@main.route("/sspdproc/<prociden>/", methods=["GET"])
def sspdroc(prociden):
    back.SuspendSingleProcess(prociden)
    return "Suspended"


@main.route("/resmproc/<prociden>/", methods=["GET"])
def resmproc(prociden):
    back.ResumeSingleProcess(prociden)
    return "Resumed"


@main.route("/<thmcolor>/", methods=["GET"])
def custpage(thmcolor="maroon"):
    retndata = back.GetOSUnameData()
    cpuquant = back.GetCPULogicalCount()
    diskpart = back.GetAllDiskPartitions()
    dionames = list(back.GetDiskIOUsage()[1].keys())
    netnames = list(back.GetNetworkIOUsage()[1].keys())
    procinfo = back.GetProcessInfo()
    senstemp = back.GetSensorsTemperature()
    fanspeed = back.GetSensorsFanSpeed()
    boottime = back.GetBootTime()
    netaddrs = back.GetNetworkIFAddresses()
    netstats = back.GetNetworkStatistics()
    return render_template("custpage.html", retndata=retndata, cpuquant=cpuquant,
                           diskpart=diskpart, dionames=dionames, netnames=netnames,
                           netaddrs=netaddrs, netstats=netstats, senstemp=senstemp,
                           fanspeed=fanspeed, boottime=boottime, procinfo=procinfo,
                           thmcolor=thmcolor)


@click.command()
@click.option("-p", "--portdata", "portdata", help="Set the port value [0-65536]", default="9696")
@click.option("-6", "--ipprotv6", "netprotc", flag_value="ipprotv6", help="Start the server on an IPv6 address")
@click.option("-4", "--ipprotv4", "netprotc", flag_value="ipprotv4", help="Start the server on an IPv4 address")
@click.version_option(version="0.1.0", prog_name="WebStation SYSMON by t0xic0der")
def mainfunc(portdata, netprotc):
    print(" * Starting WebStation SYSMON by t0xic0der...")
    print(" * Port number : " + str(portdata))
    netpdata = ""
    if netprotc == "ipprotv6":
        print(" * IP version  : 6")
        netpdata = "::"
    elif netprotc == "ipprotv4":
        print(" * IP version  : 4")
        netpdata = "0.0.0.0"
    main.run(port=portdata, host=netpdata)

if __name__ == "__main__":
    mainfunc()