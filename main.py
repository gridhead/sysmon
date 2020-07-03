from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import psutil, back

main = Flask(__name__)


# rendering the HTML page which has the button
@main.route("/legacylo/")
def json():
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
    return render_template("main.html", retndata=retndata, cpuquant=cpuquant, procinfo=procinfo,
                           diskpart=diskpart, dionames=dionames, netnames=netnames, netaddrs=netaddrs,
                           netstats=netstats, senstemp=senstemp, fanspeed=fanspeed, boottime=boottime)


# background process hmainening without any refreshing
@main.route('/background_process_test')
def background_process_test():
    print("Hello")
    return "nothing"


@main.route('/_stuff', methods= ['GET'])
def stuff():
    cpu=str(psutil.cpu_freq(True))
    return jsonify(cpu=cpu)


@main.route("/virtdata/", methods=["GET"])
def virtdata():
    retndata = back.GetVirtualMemoryData()
    retnjson = jsonify(virttomr=retndata["Total"],
                       virtavbl=retndata["Available"],
                       virtperc=retndata["Percent"],
                       virtused=retndata["Used"],
                       virtactv=retndata["Active"],
                       virtbufr=retndata["Buffers"],
                       virtcach=retndata["Cached"],
                       virtshrd=retndata["Shared"],
                       virtslab=retndata["Slab"])
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
    return render_template("cust.html", retndata=retndata, cpuquant=cpuquant,
                           diskpart=diskpart, dionames=dionames, netnames=netnames,
                           netaddrs=netaddrs, netstats=netstats, senstemp=senstemp,
                           fanspeed=fanspeed, boottime=boottime, procinfo=procinfo,
                           thmcolor=thmcolor)


if __name__ == "__main__":
    main.run(port=9696, host="0.0.0.0")