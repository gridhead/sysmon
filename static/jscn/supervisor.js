function UpdateValues() {
    PhysicalMemoryOverviewGraph();
}

function PhysicalMemoryOverviewGraph() {
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
        fillStyle: 'rgba(0, 128, 128, 0.1)',
        lineWidth: 2
    }
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
    ws.onmessage = function (event) {
        let jsonobjc = JSON.parse(event.data);
        for (let indx in jsonobjc.cpuprcnt) {
            cpusline.append(new Date().getTime(), parseFloat(jsonobjc.cpuprcnt[indx]).toPrecision(3));
            document.getElementById("cpusvalu").innerText = parseFloat(jsonobjc.cpuprcnt[indx]).toPrecision(3);
        }
        physline.append(new Date().getTime(), parseFloat(jsonobjc.virtdata["percent"]).toPrecision(3));
        document.getElementById("physvalu").innerText = parseFloat(jsonobjc.virtdata["percent"]).toPrecision(3);
        swapline.append(new Date().getTime(), parseFloat(jsonobjc.swapinfo["percent"]).toPrecision(3));
        document.getElementById("swapvalu").innerText = parseFloat(jsonobjc.swapinfo["percent"]).toPrecision(3);
        battline.append(new Date().getTime(), parseFloat(jsonobjc.sensread.battstat["percent"]).toPrecision(3));
        document.getElementById("battvalu").innerText = parseFloat(jsonobjc.sensread.battstat["percent"]).toPrecision(3);
    };
    cpusgraf.streamTo(document.getElementById("cpusover"), 1000);
    physgraf.streamTo(document.getElementById("physover"), 1000);
    swapgraf.streamTo(document.getElementById("swapover"), 1000);
    battgraf.streamTo(document.getElementById("battover"), 1000);
}