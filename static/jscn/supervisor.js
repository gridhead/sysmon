let grafstyl = {
    responsive: true,
    minValue: 0,
    maxValue: 100,
    grid: {
        strokeStyle: '#c0c0c0',
        fillStyle: '#ffffff',
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

function SwitchTab(head, body) {
    $(".item").removeClass("active");
    $(".bottom.attached").removeClass("active");
    $("#" + head).addClass("active");
    $("#" + body).addClass("active");
}

function AskForWebSocketEndpoint() {
    $("#restwarn").modal("setting", "closable", false).modal("show");
}

function FetchWebSocketEndpoint() {
    credjson = {
        "vsonsuri": document.getElementById("vsonsuri").value,
        "passcode": document.getElementById("passcode").value,
    }
    sessionStorage.setItem("vsoniden", JSON.stringify(credjson));
    OverviewGraphAJAX();
}

async function OverviewGraphAJAX() {
    let cpusgraf = new SmoothieChart(grafstyl);
    let physgraf = new SmoothieChart(grafstyl);
    let swapgraf = new SmoothieChart(grafstyl);
    let battgraf = new SmoothieChart(grafstyl);
    let cpusline = new TimeSeries();
    let physline = new TimeSeries();
    let swapline = new TimeSeries();
    let battline = new TimeSeries();
    cpusgraf.addTimeSeries(cpusline, linestyl);
    physgraf.addTimeSeries(physline, linestyl);
    swapgraf.addTimeSeries(swapline, linestyl);
    battgraf.addTimeSeries(battline, linestyl);
    let prcpgraf = [];
    let prcpline = [];
    var cpuquant = 0;
    await $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "deadsync/",
        function(data) {
            let deadobjc = JSON.parse(data.deadobjc);
            cpuquant = parseInt(deadobjc["cpuquant"]);
            console.log(cpuquant);
            for (let indx = 0; indx < cpuquant; indx++) {
                $("#prcpgraf").append(
                    "<div class='padded card bodyfont'>" +
                    "<div class='content'>" + "<div class='header bodyfont' style='color: #00c080;'>CPU #" + indx + "</div>" +
                    "<div class='meta'><span id='cpuu-perc-" + indx + "'>0</span>% in use</div>" + "<div class='description'>" +
                    "<canvas id='cpuu-graf-" + indx + "' style='width:100%; height:12.5vh;'></canvas>" +
                    "</div>" + "</div>" + "</div>"
                );
                let sncpgraf = new SmoothieChart(grafstyl);
                let sncpline = new TimeSeries();
                sncpgraf.addTimeSeries(sncpline, linestyl);
                prcpgraf[prcpgraf.length] = sncpgraf;
                prcpline[prcpline.length] = sncpline;
            }
            if (deadobjc.passcode === JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]) {
                document.getElementById("systover").innerText = deadobjc.osnmdata["System name"];
                document.getElementById("hostover").innerText = deadobjc.osnmdata["Host name"];
                document.getElementById("versover").innerText = deadobjc.osnmdata["Version"];
                document.getElementById("userover").innerText = deadobjc.osnmdata["Username"]
                document.getElementById("bootover").innerText = deadobjc.boottime;
            } else {
                $("#wrngiden").modal("setting", "closable", false).modal("show");
            }
        }
    );
    console.log(cpuquant, prcpgraf, prcpline);
    for (let indx = 0; indx < cpuquant; indx ++) {
        $("#cpuu-time-tabl-cont").append(
            "<tr>" +
            "<td id='cpuu-time-name-" + indx + "'>CPU #" + indx + "</td>" +
            "<td id='cpuu-time-user-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-nice-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-syst-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-idle-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-iowt-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-ireq-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-soft-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-stel-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-gest-" + indx + "'>Unavailable</td>" +
            "<td id='cpuu-time-gtnc-" + indx + "'>Unavailable</td>" + 
            "</tr>"
        );
        console.log("Hello, " + indx);
    }
    while (1) {
        await new Promise(r => setTimeout(r, 1000));
        $.getJSON(JSON.parse(sessionStorage.getItem("vsoniden"))["vsonsuri"] + "livesync/",
            function (data) {
                let liveobjc = JSON.parse(data.liveobjc);
                if (liveobjc.passcode === JSON.parse(sessionStorage.getItem("vsoniden"))["passcode"]) {
                    for (let indx in liveobjc.cpuprcnt) {
                        cpusline.append(new Date().getTime(), parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3));
                        document.getElementById("cpusvalu").innerText = parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3);
                    }
                    physline.append(new Date().getTime(), parseFloat(liveobjc.virtdata["percent"]).toPrecision(3));
                    document.getElementById("physvalu").innerText = parseFloat(liveobjc.virtdata["percent"]).toPrecision(3);
                    swapline.append(new Date().getTime(), parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3));
                    document.getElementById("swapvalu").innerText = parseFloat(liveobjc.swapinfo["percent"]).toPrecision(3);
                    battline.append(new Date().getTime(), parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3));
                    document.getElementById("battvalu").innerText = parseFloat(liveobjc.sensread.battstat["percent"]).toPrecision(3);
                    for (let indx = 0; indx < cpuquant; indx ++) {
                        prcpline[indx].append(new Date().getTime(), parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3));
                        document.getElementById("cpuu-perc-"+indx).innerText = parseFloat(liveobjc.cpuprcnt[indx]).toPrecision(3);
                    }
                    cpusgraf.streamTo(document.getElementById("cpusover"), 1000);
                    physgraf.streamTo(document.getElementById("physover"), 1000);
                    swapgraf.streamTo(document.getElementById("swapover"), 1000);
                    battgraf.streamTo(document.getElementById("battover"), 1000);
                    for (let indx = 0; indx < cpuquant; indx ++) {
                        //console.log("cpuu-graf-"+indx);
                        prcpgraf[indx].streamTo(document.getElementById("cpuu-graf-"+indx), 1000);
                    }
                    for (let indx = 0; indx < cpuquant; indx ++) {
                        document.getElementById("cpuu-time-user-"+indx).innerText = liveobjc.cputimes[indx]["user"];
                        document.getElementById("cpuu-time-nice-"+indx).innerText = liveobjc.cputimes[indx]["nice"];
                        document.getElementById("cpuu-time-syst-"+indx).innerText = liveobjc.cputimes[indx]["system"];
                        document.getElementById("cpuu-time-idle-"+indx).innerText = liveobjc.cputimes[indx]["idle"];
                        document.getElementById("cpuu-time-iowt-"+indx).innerText = liveobjc.cputimes[indx]["iowait"];
                        document.getElementById("cpuu-time-ireq-"+indx).innerText = liveobjc.cputimes[indx]["irq"];
                        document.getElementById("cpuu-time-soft-"+indx).innerText = liveobjc.cputimes[indx]["softirq"];
                        document.getElementById("cpuu-time-stel-"+indx).innerText = liveobjc.cputimes[indx]["steal"];
                        document.getElementById("cpuu-time-gest-"+indx).innerText = liveobjc.cputimes[indx]["guest"];
                        document.getElementById("cpuu-time-gtnc-"+indx).innerText = liveobjc.cputimes[indx]["guest_nice"];
                        
                    }
                } else {
                    $("#wrngiden").modal("setting", "closable", false).modal("show");
                }
            }
        );
        //console.log(cpuquant, prcpgraf[0], prcpline[0]);
    }
}