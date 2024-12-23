let grafstyl = {
    responsive: true,
    minValue: 0,
    maxValue: 100,
    grid: {
        strokeStyle: '#c0c0c0',
        fillStyle: 'rgba(0, 0, 0, 0)',
        lineWidth: 1,
        millisPerLine: 250,
        verticalSections: 10,
    },
    labels: {
        fillStyle: '#008080'
    }
};

let linestyl = {
    strokeStyle: '#00c080',
    fillStyle: 'rgba(0, 128, 128, 0.25)',
    lineWidth: 2
};

function SwitchTab (head, sect) {
    let sectlist = {
        "cpuu": {
            "cpuu-usej-ttle": "cpuu-usej-body",
            "cpuu-cycl-ttle": "cpuu-cycl-body",
            "cpuu-time-ttle": "cpuu-time-body",
            "cpuu-stat-ttle": "cpuu-stat-body"
        },
        "memo": {
            "memo-over-ttle": "memo-over-body",
            "memo-phys-ttle": "memo-phys-body",
            "memo-virt-ttle": "memo-virt-body",
        },
        "disk": {
            "disk-usej-ttle": "disk-usej-body",
            "disk-part-ttle": "disk-part-body",
        },
        "netw": {
            "netw-usej-ttle": "netw-usej-body",
            "netw-stat-ttle": "netw-stat-body",
            "netw-addr-ttle": "netw-addr-body",
        },
        "sens": {
            "sens-batt-ttle": "sens-batt-body",
            "sens-fans-ttle": "sens-fans-body",
            "sens-thrm-ttle": "sens-thrm-body",
        }
    };
    for (indx in sectlist[sect]) {
        if (indx !== head) {
            $("#" + indx).removeClass("active");
            $("#" + sectlist[sect][indx]).removeClass("active");
        }
    }
    $("#" + head).addClass("active");
    $("#" + sectlist[sect][head]).addClass("active");
}

function AskForAJAXServiceEndpoint () {
    $("#restwarn").modal("setting", "closable", false).modal("show");
}

function FetchAJAXServiceEndpoint () {
    credjson = {
        "vsonsuri": document.getElementById("vsonsuri").value,
        "passcode": document.getElementById("passcode").value,
    }
    sessionStorage.setItem("vsoniden", JSON.stringify(credjson));
    OverviewGraphAJAX();
}

async function OverviewGraphAJAX () {
    let cpusgraf = new SmoothieChart(grafstyl);
    let physgraf = new SmoothieChart(grafstyl);
    let swapgraf = new SmoothieChart(grafstyl);
    let battgraf = new SmoothieChart(grafstyl);
    let snbtgraf = new SmoothieChart(grafstyl);
    let dediphys = new SmoothieChart(grafstyl);
    let dedivirt = new SmoothieChart(grafstyl);
    let cpusline = new TimeSeries();
    let physline = new TimeSeries();
    let swapline = new TimeSeries();
    let battline = new TimeSeries();
    let snbtline = new TimeSeries();
    let depyline = new TimeSeries();
    let devtline = new TimeSeries();
    cpusgraf.addTimeSeries(cpusline, linestyl);
    physgraf.addTimeSeries(physline, linestyl);
    swapgraf.addTimeSeries(swapline, linestyl);
    battgraf.addTimeSeries(battline, linestyl);
    snbtgraf.addTimeSeries(snbtline, linestyl);
    dediphys.addTimeSeries(depyline, linestyl);
    dedivirt.addTimeSeries(devtline, linestyl);
    let prcpgraf = [];
    let prcpline = [];
    let cyclgraf = [];
    let cyclline = [];
    let cpuquant = 0;
    await $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "deadsync", {
        passcode: JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === "deny") {
            $("#wrngiden").modal("setting", "closable", false).modal("show");
        } else {
            let deadobjc = data;
            cpuquant = parseInt(deadobjc["cpuquant"]);
            // Rendered DOM for every temperature sensor and setting stage for live updating
            for (let indx in deadobjc["sensread"]["senstemp"]) {
                $("#sens-thrm-body").append(
                    "<table class='ui teal compact fixed table'>" +
                    "<thead><tr><th colspan='4'><h1 class='bodyfont' style='color: #008080;'>" + indx + "</h1></th></tr></thead>" +
                    "<tbody id='sens-thrm-devc-" + indx + "'>" + "</tbody>" + "</table>"
                );
                for (let jndx in deadobjc["sensread"]["senstemp"][indx]) {
                    $("#sens-thrm-devc-" + indx).append(
                        "<tr>" + "<td class='four wide'>" + deadobjc["sensread"]["senstemp"][indx][jndx]["label"] + "</td>" +
                        "<td class='four wide'><div class='ui teal horizontal label monofont'>TNOW</div>&nbsp;<span class='monofont'><span id='sens-thrm-devc-tnow-" + indx + "-" + jndx + "'>" + deadobjc["sensread"]["senstemp"][indx][jndx]["current"] + "</span>&nbsp;C</span></td>" +
                        "<td class='four wide'><div class='ui teal horizontal label monofont'>HIGH</div>&nbsp;<span class='monofont'><span id='sens-thrm-devc-high-" + indx + "-" + jndx + "'>" + deadobjc["sensread"]["senstemp"][indx][jndx]["high"] + "</span>&nbsp;C</span></td>" +
                        "<td class='four wide'><div class='ui teal horizontal label monofont'>CRIT</div>&nbsp;<span class='monofont'><span id='sens-thrm-devc-crit-" + indx + "-" + jndx + "'>" + deadobjc["sensread"]["senstemp"][indx][jndx]["critical"] + "</span>&nbsp;C</span></td>" +
                        "</tr>"
                    );
                }
            }
            // Rendered DOM for every fan and setting stage for live updating
            for (let indx in deadobjc["sensread"]["fanspeed"]) {
                $("#sens-fans-body").append(
                    "<table class='ui teal fixed compact table'>" +
                    "<thead><tr><th colspan='2'><h1 class='bodyfont' style='color: #008080;'>" + indx + "</h1></th></tr></thead>" +
                    "<tbody id='sens-fans-devc-" + indx + "'></tbody>" + "</table>"
                );
                for (let jndx in deadobjc["sensread"]["fanspeed"][indx]) {
                    $("#sens-fans-devc-" + indx).append(
                        "<tr>" +
                        "<td class='twelve wide' id='sens-fans-devc-labl-" + indx + "-" + jndx + "'>" + deadobjc["sensread"]["fanspeed"][indx][jndx]["label"] + "</td>" +
                        "<td class='four wide'><span id='sens-fans-devc-curt-" + indx + "-" + jndx + "' class='monofont'>" + deadobjc["sensread"]["fanspeed"][indx][jndx]["current"] + "</span> RPM</td>" +
                        "</tr>"
                    );
                }
            }
            // Rendered DOM for every disk partition and setting stage for live updating
            for (let indx in deadobjc["diousage"]) {
                $("#disk-usej-body").append(
                    "<table class='ui teal fixed compact tablet stackable table' id='disk-usej-tabl-" + indx + "'>" + "<thead>" + "<tr>" +
                    "<th colspan='3'><h2 class='bodyfont' id='disk-usej-name-" + indx + "' style='color: #008080;'>" + indx + "</h2></th>" +
                    "<th><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-bstm-" + indx + "'>0</div><div class='label bodyfont'>BSTM</div></div></th>" +
                    "</tr>" + "</thead>" + "<tbody>" + "<tr>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-rdct-" + indx + "'>0</div><div class='label bodyfont'>RDCT</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-wrct-" + indx + "'>0</div><div class='label bodyfont'>WRCT</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-rdbt-" + indx + "'>0</div><div class='label bodyfont'>RDBT</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-wrbt-" + indx + "'>0</div><div class='label bodyfont'>WRBT</div></div></td>" +
                    "</tr>" + "<tr>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-rdtm-" + indx + "'>0</div><div class='label bodyfont'>RDTM</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-wrtm-" + indx + "'>0</div><div class='label bodyfont'>WRTM</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-rdmc-" + indx + "'>0</div><div class='label bodyfont'>RDMC</div></div></td>" +
                    "<td><div class='ui tiny horizontal statistic'><div class='value dataread' id='disk-usej-wrmc-" + indx + "'>0</div><div class='label bodyfont'>WRMC</div></div></td>" +
                    "</tr>" + "</tbody>" + "</table>"
                );
            }
            // Rendered DOM for every network interface card and setting stage for live updating
            for (let indx in deadobjc["netusage"]) {
                $("#netw-usej-body").append(
                    "<table class='ui teal definition fixed compact table'>" + "<tbody>" + "<tr>" +
                    "<td rowspan='2' class='four wide'>" + "<h1 class='bodyfont' id='netw-usej-name-" + indx + "' style='color: #008080; margin: 0px;'>" + indx + "</h1>" +
                    "<pre style='margin: 0px;' id='disk-part-fsys-0'>SNIC</pre>" + "</td>" +
                    "<td class='six wide'><div class='ui teal horizontal label monofont'>BSNT</div><span class='monofont'><span id='netw-usej-bsnt-" + indx + "'>0</span>&nbsp;bytes</span></td>" +
                    "<td class='six wide'><div class='ui teal horizontal label monofont'>PSNT</div><span class='monofont'><span id='netw-usej-psnt-" + indx + "'>0</span>&nbsp;packets</span></td>" +
                    "</tr>" + "<tr>" + "<td class='rowspanned'></td>" +
                    "<td><div class='ui teal horizontal label monofont'>BRCV</div><span class='monofont'><span id='netw-usej-brcv-" + indx + "'>0</span>&nbsp;bytes</span></td>" +
                    "<td><div class='ui teal horizontal label monofont'>PRCV</div><span class='monofont'><span id='netw-usej-prcv-" + indx + "'>0</span>&nbsp;packets</span></td>" +
                    "</tr>" + "</tbody>" + "</table>"
                );
            }
            // One-time rendering of network interface addresses
            for (let indx in deadobjc["netaddrs"]) {
                $("#netw-addr-body").append(
                    "<table class='ui teal fixed compact tablet stackable table'>" +
                    "<thead><tr><th colspan='4'><h1 style='color: #008080;' class='bodyfont'>" + indx + "</h1></th></tr></thead>" +
                    "<tbody id='netw-addr-tabl-" + indx + "'>" + "</tbody>" + "</table>"
                );
                for (let jndx in deadobjc["netaddrs"][indx]) {
                    $("#netw-addr-tabl-" + indx).append(
                        "<tr>" +
                        "<td class='four wide'><i class='marker icon'></i>&nbsp;<span>" + deadobjc["netaddrs"][indx][jndx]["address"] + "</span></td>" +
                        "<td class='four wide'><i class='compass icon'></i>&nbsp;<span>" + deadobjc["netaddrs"][indx][jndx]["netmask"] + "</span></td>" +
                        "<td class='four wide'><i class='wifi icon'></i>&nbsp;<span>" + deadobjc["netaddrs"][indx][jndx]["broadcast"] + "</span></td>" +
                        "<td class='four wide'><i class='linkify icon'></i>&nbsp;<span>" + deadobjc["netaddrs"][indx][jndx]["ptp"] + "</span></td>" +
                        "</tr>"
                    );
                }
            }
            // One-time rendering of network statistics
            for (let indx in deadobjc["netstats"]) {
                $("#netw-stat-body").append(
                    "<table class='ui teal fixed definition compact table'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td rowspan='2' class='eight wide'>" +
                    "<h1 class='bodyfont' style='color: #008080; margin: 0px;'>" + indx + "</h1>" +
                    "<pre style='margin: 0px'>" + deadobjc["netstats"][indx]["isup"] + "</pre>" +
                    "</td>" +
                    "<td class='eight wide'><div class='ui teal horizontal label monofont'>NSPD</div><span class='monofont'>" + deadobjc["netstats"][indx]["speed"] + "</span></td>" +
                    "<tr>" +
                    "<td class='eight wide rowspanned'></td>" +
                    "<td class='eight wide'><div class='ui teal horizontal label monofont'>NMTU</div><span class='monofont'>" + deadobjc["netstats"][indx]["mtu"] + "</span></td>" +
                    "</tr>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>"
                );
            }
            // One-time rendering of disk partitions
            for (let indx = 0; indx < deadobjc.diskpart.length; indx ++) {
                $("#disk-part-body").append(
                    "<table class='ui teal definition fixed compact table'>" + "<tbody>" + "<tr>" + "<td rowspan='2' class='four wide'>" +
                    "<h1 class='bodyfont' style='margin: 0px; color: #008080;' id='disk-part-name-" + indx + "'>" + deadobjc.diskpart[indx]["device"] + "</h1>" +
                    "<pre style='margin: 0px;' id='disk-part-fsys-" + indx + "'>" + deadobjc.diskpart[indx]["fstype"] + "</pre>" + "</td>" +
                    "<td class='twelve wide'><div class='ui teal horizontal label monofont'>MLOC</div><span id='disk-part-mloc-" + indx + "' class='monofont'>" + deadobjc.diskpart[indx]["mountpoint"] + "</span></td>" +
                    "</tr>" + "<tr>" + "<td class='rowspanned'></td>" +
                    "<td><div class='ui teal horizontal label monofont'>OPTS</div><span id='disk-part-opts-" + indx + "' class='monofont'>" + deadobjc.diskpart[indx]["opts"] + "</span></td>" +
                    "</tr>" + "</tbody>" + "</table>"
                );
            }
            for (let indx = 0; indx < cpuquant; indx++) {
                $("#prcpgraf").append(
                    "<div class='teal padded card bodyfont'>" +
                    "<div class='content'>" + "<div class='header bodyfont' style='color: #00c080;'>CPU #" + indx + "</div>" +
                    "<div class='meta'><span id='cpuu-perc-" + indx + "'>0</span>% in use</div>" + "<div class='description'>" +
                    "<canvas id='cpuu-graf-" + indx + "' style='width:100%; height:12.5vh;'></canvas>" +
                    "</div>" + "</div>" + "</div>"
                );
                $("#cyclgraf").append(
                    "<div class='teal padded card bodyfont'>" +
                    "<div class='content'>" + "<div class='header bodyfont' style='color: #00c080;'>CPU #" + indx + "</div>" +
                    "<div class='meta'><span id='cpuu-cycl-curt-" + indx + "'>0</span>MHz (<span id='cpuu-cycl-mine-" + indx + "'>0</span>/<span id='cpuu-cycl-maxe-" + indx + "'>0</span>)</div>" +
                    "<div class='description'>" + "<canvas id='cpuu-cygf-" + indx + "' style='width:100%; height:12.5vh;'></canvas>" +
                    "</div>" + "</div>" + "</div>"
                );
                let sncpgraf = new SmoothieChart(grafstyl);
                let sncpline = new TimeSeries();
                let scycgraf = new SmoothieChart({
                    responsive: true,
                    minValue: deadobjc.cpuclock[indx]["min"],
                    maxValue: deadobjc.cpuclock[indx]["max"],
                    grid: {
                        strokeStyle: '#c0c0c0',
                        fillStyle: 'rgba(0, 0, 0, 0)',
                        lineWidth: 1,
                        millisPerLine: 250,
                        verticalSections: 10,
                    },
                    labels: {
                        fillStyle: '#008080'
                    }
                });
                let scycline = new TimeSeries();
                sncpgraf.addTimeSeries(sncpline, linestyl);
                scycgraf.addTimeSeries(scycline, linestyl);
                prcpgraf[prcpgraf.length] = sncpgraf;
                prcpline[prcpline.length] = sncpline;
                cyclgraf[cyclgraf.length] = scycgraf;
                cyclline[cyclline.length] = scycline;
            }
            document.getElementById("systover").innerText = deadobjc.osnmdata["System name"];
            document.getElementById("hostover").innerText = deadobjc.osnmdata["Host name"];
            document.getElementById("versover").innerText = deadobjc.osnmdata["Version"];
            document.getElementById("userover").innerText = deadobjc.osnmdata["Username"];
            document.getElementById("bootover").innerText = deadobjc.boottime;
        }
    }).fail(function (err, status) {
        $("#connlost").modal("setting", "closable", false).modal("show");
    });
    for (let indx = 0; indx < cpuquant; indx ++) {
        $("#cpuu-time-tabl-cont").append(
            "<tr>" +
            "<td class='monofont' id='cpuu-time-name-" + indx + "'>CPU #" + indx + "</td>" +
            "<td class='monofont' id='cpuu-time-user-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-nice-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-syst-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-idle-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-iowt-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-ireq-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-soft-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-stel-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-gest-" + indx + "'>Unavailable</td>" +
            "<td class='monofont' id='cpuu-time-gtnc-" + indx + "'>Unavailable</td>" +
            "</tr>"
        );
    }
    while (1) {
        await new Promise(r => setTimeout(r, 1000));
        $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "livesync", {
            passcode:  JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
        }, function (data) {
            if (data["retnmesg"] === "deny") {
                $("#wrngiden").modal("setting", "closable", false).modal("show");
            } else {
                let liveobjc = data;
                for (let indx in liveobjc.cpuprcnt) {
                    cpusline.append(new Date().getTime(), parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3));
                    document.getElementById("cpusvalu").innerText = parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3);
                }
                depyline.append(new Date().getTime(), parseFloat(liveobjc.virtdata["percent"]).toPrecision(3));
                document.getElementById("phys-dedi-byte").innerText = parseInt(liveobjc.virtdata["used"]) + " of " + parseInt(liveobjc.virtdata["total"]);
                physline.append(new Date().getTime(), parseFloat(liveobjc.virtdata["percent"]).toPrecision(3));
                document.getElementById("physvalu").innerText = parseFloat(liveobjc.virtdata["percent"]).toPrecision(3);
                document.getElementById("phys-dedi-perc").innerText = parseFloat(liveobjc.virtdata["percent"]).toPrecision(3);
                devtline.append(new Date().getTime(), parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3));
                document.getElementById("virt-dedi-byte").innerText = parseInt(liveobjc.swapinfo["used"]) + " of " + parseInt(liveobjc.swapinfo["total"]);
                swapline.append(new Date().getTime(), parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3));
                document.getElementById("swapvalu").innerText = parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3);
                document.getElementById("virt-dedi-perc").innerText = parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3);
                battline.append(new Date().getTime(), parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3));
                document.getElementById("battvalu").innerText = parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3);
                for (let indx = 0; indx < cpuquant; indx++) {
                    prcpline[indx].append(new Date().getTime(), parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3));
                    document.getElementById("cpuu-perc-" + indx).innerText = parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3);
                    cyclline[indx].append(new Date().getTime(), parseFloat(liveobjc.cpuclock[indx]["current"]).toPrecision(5));
                    document.getElementById("cpuu-cycl-curt-" + indx).innerText = parseFloat(liveobjc.cpuclock[indx]["current"]).toPrecision(5);
                    document.getElementById("cpuu-cycl-mine-" + indx).innerText = parseFloat(liveobjc.cpuclock[indx]["min"]).toPrecision(5);
                    document.getElementById("cpuu-cycl-maxe-" + indx).innerText = parseFloat(liveobjc.cpuclock[indx]["max"]).toPrecision(5);
                }
                document.getElementById("cpuu-stat-ctxs").innerText = liveobjc.cpustats["ctx_switches"];
                document.getElementById("cpuu-stat-intr").innerText = liveobjc.cpustats["interrupts"];
                document.getElementById("cpuu-stat-soft").innerText = liveobjc.cpustats["soft_interrupts"];
                document.getElementById("cpuu-stat-syst").innerText = liveobjc.cpustats["syscalls"];
                // Sensor battery section updater
                document.getElementById("sens-batt-plug").innerText = liveobjc.sensread.battstat["power_plugged"].toString().toUpperCase();
                document.getElementById("sens-batt-perc").innerText = parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3);
                document.getElementById("sens-batt-time").innerText = liveobjc.sensread.battstat["secsleft"];
                snbtline.append(new Date().getTime(), parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3));
                $("#sens-batt-prog").progress({
                    percent: parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3)
                });
                // Network usage secion updater
                for (let indx in liveobjc["netusage"]) {
                    document.getElementById("netw-usej-bsnt-" + indx).innerText = liveobjc["netusage"][indx]["bytes_sent"];
                    document.getElementById("netw-usej-psnt-" + indx).innerText = liveobjc["netusage"][indx]["packets_sent"];
                    document.getElementById("netw-usej-brcv-" + indx).innerText = liveobjc["netusage"][indx]["bytes_recv"];
                    document.getElementById("netw-usej-prcv-" + indx).innerText = liveobjc["netusage"][indx]["packets_recv"];
                }
                // Physical memory dedicated statistics table updater
                document.getElementById("memo-phys-totl").innerText = liveobjc.virtdata["total"];
                document.getElementById("memo-phys-free").innerText = liveobjc.virtdata["available"];
                document.getElementById("memo-phys-used").innerText = liveobjc.virtdata["used"];
                document.getElementById("memo-phys-actv").innerText = liveobjc.virtdata["active"];
                document.getElementById("memo-phys-inac").innerText = liveobjc.virtdata["inactive"];
                document.getElementById("memo-phys-buff").innerText = liveobjc.virtdata["buffers"];
                document.getElementById("memo-phys-cach").innerText = liveobjc.virtdata["cached"];
                document.getElementById("memo-phys-shar").innerText = liveobjc.virtdata["shared"];
                document.getElementById("memo-phys-slab").innerText = liveobjc.virtdata["slab"];
                // Virtual memory dedicated statistics table updater
                document.getElementById("memo-virt-totl").innerText = liveobjc.swapinfo["total"];
                document.getElementById("memo-virt-free").innerText = liveobjc.swapinfo["free"];
                document.getElementById("memo-virt-used").innerText = liveobjc.swapinfo["used"];
                document.getElementById("memo-virt-sine").innerText = liveobjc.swapinfo["sin"];
                document.getElementById("memo-virt-sout").innerText = liveobjc.swapinfo["sout"];
                // Fan speed sensor section updater
                for (let indx in liveobjc["sensread"]["fanspeed"]) {
                    for (let jndx in liveobjc["sensread"]["fanspeed"][indx]) {
                        document.getElementById("sens-fans-devc-curt-" + indx + "-" + jndx).innerText = liveobjc["sensread"]["fanspeed"][indx][jndx]["current"];
                    }
                }
                // Thermal sensor section updater
                for (let indx in liveobjc["sensread"]["senstemp"]) {
                    for (let jndx in liveobjc["sensread"]["senstemp"][indx]) {
                        document.getElementById("sens-thrm-devc-tnow-" + indx + "-" + jndx).innerText = liveobjc["sensread"]["senstemp"][indx][jndx]["current"];
                        document.getElementById("sens-thrm-devc-high-" + indx + "-" + jndx).innerText = liveobjc["sensread"]["senstemp"][indx][jndx]["high"];
                        document.getElementById("sens-thrm-devc-crit-" + indx + "-" + jndx).innerText = liveobjc["sensread"]["senstemp"][indx][jndx]["critical"];
                    }
                }
                // Disk usage body updater
                for (let indx in liveobjc["diousage"]) {
                    document.getElementById("disk-usej-name-" + indx).innerText = indx;
                    document.getElementById("disk-usej-bstm-" + indx).innerText = liveobjc["diousage"][indx]["busy_time"];
                    document.getElementById("disk-usej-rdct-" + indx).innerText = liveobjc["diousage"][indx]["read_count"];
                    document.getElementById("disk-usej-wrct-" + indx).innerText = liveobjc["diousage"][indx]["write_count"];
                    document.getElementById("disk-usej-rdbt-" + indx).innerText = liveobjc["diousage"][indx]["read_bytes"];
                    document.getElementById("disk-usej-wrbt-" + indx).innerText = liveobjc["diousage"][indx]["write_bytes"];
                    document.getElementById("disk-usej-rdtm-" + indx).innerText = liveobjc["diousage"][indx]["read_time"];
                    document.getElementById("disk-usej-wrtm-" + indx).innerText = liveobjc["diousage"][indx]["write_time"];
                    document.getElementById("disk-usej-rdmc-" + indx).innerText = liveobjc["diousage"][indx]["read_merged_count"];
                    document.getElementById("disk-usej-wrmc-" + indx).innerText = liveobjc["diousage"][indx]["write_merged_count"];
                }
                // Process listing live rendering
                document.getElementById("proc-tabl-dvsn").innerHTML = "<table class='ui fixed compact table'>" + "<tbody id='proc-tabl-main'>" + "</tbody>" + "</table>";
                for (let indx in liveobjc["procinfo"]) {
                    $("#proc-tabl-main").append(
                        "<tr>" +
                        "<td class='two wide'>" + indx + "</td>" +
                        "<td class='six wide' style='font-weight: bold;'><span onclick='ViewProcessInfo(\"" + indx + "\")'>" + liveobjc["procinfo"][indx]["name"] + "</span></td>" +
                        "<td class='four wide'>" + liveobjc["procinfo"][indx]["username"] + "</td>" +
                        "<td class='two wide'>" + parseFloat(liveobjc["procinfo"][indx]["memory_percent"]).toPrecision(3) + "%</td>" +
                        "<td class='two wide'>" + parseFloat(liveobjc["procinfo"][indx]["cpu_percent"]).toPrecision(3) + "%</td>" +
                        "</tr>"
                    );
                }
                // Stream graphs to DOM Canvas elements
                cpusgraf.streamTo(document.getElementById("cpusover"), 1000);
                physgraf.streamTo(document.getElementById("physover"), 1000);
                swapgraf.streamTo(document.getElementById("swapover"), 1000);
                battgraf.streamTo(document.getElementById("battover"), 1000);
                dediphys.streamTo(document.getElementById("phys-dedi-graf"), 1000);
                dedivirt.streamTo(document.getElementById("virt-dedi-graf"), 1000);
                snbtgraf.streamTo(document.getElementById("sens-batt-graf"), 1000);
                for (let indx = 0; indx < cpuquant; indx++) {
                    cyclgraf[indx].streamTo(document.getElementById("cpuu-cygf-" + indx), 1000);
                    prcpgraf[indx].streamTo(document.getElementById("cpuu-graf-" + indx), 1000);
                }
                for (let indx = 0; indx < cpuquant; indx++) {
                    document.getElementById("cpuu-time-user-" + indx).innerText = liveobjc.cputimes[indx]["user"];
                    document.getElementById("cpuu-time-nice-" + indx).innerText = liveobjc.cputimes[indx]["nice"];
                    document.getElementById("cpuu-time-syst-" + indx).innerText = liveobjc.cputimes[indx]["system"];
                    document.getElementById("cpuu-time-idle-" + indx).innerText = liveobjc.cputimes[indx]["idle"];
                    document.getElementById("cpuu-time-iowt-" + indx).innerText = liveobjc.cputimes[indx]["iowait"];
                    document.getElementById("cpuu-time-ireq-" + indx).innerText = liveobjc.cputimes[indx]["irq"];
                    document.getElementById("cpuu-time-soft-" + indx).innerText = liveobjc.cputimes[indx]["softirq"];
                    document.getElementById("cpuu-time-stel-" + indx).innerText = liveobjc.cputimes[indx]["steal"];
                    document.getElementById("cpuu-time-gest-" + indx).innerText = liveobjc.cputimes[indx]["guest"];
                    document.getElementById("cpuu-time-gtnc-" + indx).innerText = liveobjc.cputimes[indx]["guest_nice"];
                }
            }
            }).fail(function () {
                $("#connlost").modal("setting", "closable", false).modal("show");
            }
        );
    }
}

function ViewProcessInfo (prociden) {
    $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "procinfo", {
        prociden: prociden, passcode:  JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === "deny") {
            $("#wrngiden").modal("setting", "closable", false).modal("show");
        } else {
            document.getElementById("proc-info-name").innerText = data["name"];
            document.getElementById("proc-info-iden").innerText = "#" + data["pid"];
            document.getElementById("proc-info-cpuu-perc").innerText = parseFloat(data["cpu_percent"]).toPrecision(3) + "%";
            document.getElementById("proc-info-memo-perc").innerText = parseFloat(data["memory_percent"]).toPrecision(3) + "%";
            // Data section renderer
            document.getElementById("proc-info-data-user").innerText = data["username"];
            document.getElementById("proc-info-data-time").innerText = data["create_time"];
            document.getElementById("proc-info-data-stat").innerText = data["status"];
            document.getElementById("proc-info-data-term").innerText = data["terminal"];
            document.getElementById("proc-info-data-last").innerText = new Date().toLocaleString();
            // Memory info renderer
            document.getElementById("proc-info-memo-rsts").innerText = data["memory_info"]["rss"] + " bytes";
            document.getElementById("proc-info-memo-vmsz").innerText = data["memory_info"]["vms"] + " bytes";
            document.getElementById("proc-info-memo-shsz").innerText = data["memory_info"]["shared"] + " bytes";
            document.getElementById("proc-info-memo-text").innerText = data["memory_info"]["text"] + " bytes";
            document.getElementById("proc-info-memo-data").innerText = data["memory_info"]["data"] + " bytes";
            document.getElementById("proc-info-memo-libs").innerText = data["memory_info"]["lib"] + " bytes";
            document.getElementById("proc-info-memo-dirt").innerText = data["memory_info"]["dirty"] + " pages";
            // CPU times renderer
            document.getElementById("proc-info-time-user").innerText = data["cpu_times"]["user"];
            document.getElementById("proc-info-time-syst").innerText = data["cpu_times"]["system"];
            document.getElementById("proc-info-time-cusr").innerText = data["cpu_times"]["children_user"];
            document.getElementById("proc-info-time-csys").innerText = data["cpu_times"]["children_system"];
            document.getElementById("proc-info-time-iowt").innerText = data["cpu_times"]["iowait"];
            // Context switch renderer
            document.getElementById("proc-info-ctxs-volu").innerText = data["num_ctx_switches"]["voluntary"];
            document.getElementById("proc-info-ctxs-volu").innerText = data["num_ctx_switches"]["involuntary"];
            // Group IDs renderer
            document.getElementById("proc-info-gids-eftv").innerText = data["gids"]["effective"];
            document.getElementById("proc-info-gids-real").innerText = data["gids"]["real"];
            document.getElementById("proc-info-gids-save").innerText = data["gids"]["saved"];
            // User IDs renderer
            document.getElementById("proc-info-uids-eftv").innerText = data["uids"]["effective"];
            document.getElementById("proc-info-uids-real").innerText = data["uids"]["real"];
            document.getElementById("proc-info-uids-save").innerText = data["uids"]["saved"];
            document.getElementById("proc-mode-kill").setAttribute("onclick", "KillProcess(" + data["pid"] + ")");
            document.getElementById("proc-mode-term").setAttribute("onclick", "TerminateProcess(" + data["pid"] + ")");
            document.getElementById("proc-mode-susp").setAttribute("onclick", "SuspendProcess(" + data["pid"] + ")");
            document.getElementById("proc-mode-resm").setAttribute("onclick", "ResumeProcess(" + data["pid"] + ")");
            $("#procinfo").modal("setting", "closable", false).modal("show");
        }
    }).fail(function () {
        $("body").toast({
            position: "bottom right",
            message: "Process information could not be retrieved"
        });
    });
}

function KillProcess (prociden) {
    $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "killproc", {
        prociden: prociden, passcode: JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === true) {
            $("body").toast({
                position: "bottom right",
                message: "Process kill was conveyed"
            });
        } else {
            $("body").toast({
                position: "bottom right",
                message: "Process kill could not be conveyed"
            });
        }
    }).fail(function () {
        $("body").toast({
            position: "bottom right",
            message: "Process kill could not be conveyed"
        });
    });
    $("#procinfo").modal("hide");
}

function TerminateProcess (prociden) {
    $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "termproc", {
        prociden: prociden, passcode: JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === true) {
            $("body").toast({
                position: "bottom right",
                message: "Process termination was conveyed"
            });
        } else {
            $("body").toast({
                position: "bottom right",
                message: "Process termination could not be conveyed"
            });
        }
    }).fail(function () {
        $("body").toast({
            position: "bottom right",
            message: "Process termination could not be conveyed"
        });
    });
    $("#procinfo").modal("hide");
}

function SuspendProcess (prociden) {
    $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "suspproc", {
        prociden: prociden, passcode: JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === true) {
            $("body").toast({
                position: "bottom right",
                message: "Process suspension was conveyed"
            });
        } else {
            $("body").toast({
                position: "bottom right",
                message: "Process suspension could not be conveyed"
            });
        }
    }).fail(function () {
        $("body").toast({
            position: "bottom right",
            message: "Process suspension could not be conveyed"
        });
    });
    $("#procinfo").modal("hide");
}

function ResumeProcess (prociden) {
    $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "resmproc", {
        prociden: prociden, passcode: JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]
    }, function (data) {
        if (data["retnmesg"] === true) {
            $("body").toast({
                position: "bottom right",
                message: "Process resuming was conveyed"
            });
        } else {
            $("body").toast({
                position: "bottom right",
                message: "Process resuming could not be conveyed"
            });
        }
    }).fail(function () {
        $("body").toast({
            position: "bottom right",
            message: "Process resuming could not be conveyed"
        });
    });
    $("#procinfo").modal("hide");
}