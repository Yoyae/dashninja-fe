/*
 This file is part of Monoeci Ninja.
 https://github.com/Yoyae/monoecininja-fe

 Monoeci Ninja is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Monoeci Ninja is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Monoeci Ninja.  If not, see <http://www.gnu.org/licenses/>.

 */

// Monoeci Ninja Front-End (monoecininja-fe) - Masternode List (v2)

var monoecininjaversion = '2.5.2';
var tableLocalNodes = null;
var tableBlockConsensus = null;
var tableMNList = null;
var chartMNVersions = null;
var monoeciversiondefault = "0.12.2.1";
var monoeciversion = monoeciversiondefault;
var monoeciversioncheck = monoeciversion;
var monoeciversionsemaphore = false;
var sentinelversiondefault = "1.0";
var sentinelversion = sentinelversiondefault;
var monoecimaxprotocol = 0;

$.fn.dataTable.ext.errMode = 'throw';

if(typeof(Storage) !== "undefined") {
    if (sessionStorage.getItem("nextmonoeciversion") !== null) {
        sessionStorage.removeItem("nextmonoeciversion");
    }
}

if (typeof monoecininjatestnet === 'undefined') {
    var monoecininjatestnet = 0;
}
if (typeof monoecininjatestnethost !== 'undefined') {
    if (window.location.hostname == monoecininjatestnethost) {
        monoecininjatestnet = 1;
        $('a[name=menuitemexplorer]').attr("href", "https://"+monoecininjatestnetexplorer);
    }
}

if (typeof monoecininjamndetail === 'undefined') {
    var monoecininjamndetail = [[],[]];
}
if (typeof monoecininjamndetail[0] === 'undefined') {
    monoecininjamndetail[0] = [];
}
if (typeof monoecininjamndetail[1] === 'undefined') {
    monoecininjamndetail[1] = [];
}

if (typeof monoecininjamndetailvin === 'undefined') {
    var monoecininjamndetailvin = [[],[]];
}
if (typeof monoecininjamndetailvin[0] === 'undefined') {
    monoecininjamndetailvin[0] = [];
}
if (typeof monoecininjamndetailvin[1] === 'undefined') {
    monoecininjamndetailvin[1] = [];
}

if (typeof monoecininjaaddressexplorer === 'undefined') {
    var monoecininjaaddressexplorer = [[],[]];
}
if (typeof monoecininjaaddressexplorer[0] === 'undefined') {
    monoecininjaaddressexplorer[0] = [];
}
if (typeof monoecininjaaddressexplorer[1] === 'undefined') {
    monoecininjaaddressexplorer[1] = [];
}

if (typeof monoecininjaqueryexplorer === 'undefined') {
    var monoecininjaqueryexplorer = [[],[]];
}
if (typeof monoecininjaqueryexplorer[0] === 'undefined') {
    monoecininjaqueryexplorer[0] = [];
}
if (typeof monoecininjaqueryexplorer[1] === 'undefined') {
    monoecininjaqueryexplorer[1] = [];
}

if (typeof monoecininjatxexplorer === 'undefined') {
    var monoecininjatxexplorer = [[],[]];
}
if (typeof monoecininjatxexplorer[0] === 'undefined') {
    monoecininjatxexplorer[0] = [];
}
if (typeof monoecininjatxexplorer[1] === 'undefined') {
    monoecininjatxexplorer[1] = [];
}

function tableLocalNodesRefresh(){
    tableLocalNodes.api().ajax.reload();
    // Set it to refresh in 60sec
    setTimeout(tableLocalNodesRefresh, 60000);
};

function tableBlockConsensusRefresh(){
    tableBlockConsensus.api().ajax.reload();
    // Set it to refresh in 60sec
    setTimeout(tableLocalNodesRefresh, 150000);
};

function tableMNListRefresh(){
    tableMNList.api().ajax.reload();
    // Set it to refresh in 60sec
    setTimeout(tableMNListRefresh, 300000);
};

function mnpaymentsRefresh(){
    $.getJSON( "/api/masternodes/stats?testnet="+monoecininjatestnet, function( data ) {
        var date = new Date();
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        $('#mnpaymentsLR').text( n + ' ' + time );
        $('#mnpayments').text( Math.round(data.data.MasternodeStatsTotal.MasternodeExpectedPayment*10000)/10000 );
        $('#mnpaymentsratio').text( (Math.round(data.data.MasternodeStatsTotal.RatioPayed*10000)/100)+ '%' );
        setTimeout(mnpaymentsRefresh, 300000);
    });
};

function displaymonoeciVersion(monoeciversion,sentinelversion) {
    if (monoeciversion != "?") {
        $('#msgalert').show();
    }
    else {
        $('#msgalert').hide();
    }
    $('#currentmonoeciversion').text( monoeciversion );
    $('#currentsentinelversion').text( sentinelversion );
}

function getLatestmonoeciVersion() {
    var currentdate = new Date();
    monoeciversion = sessionStorage.getItem("currentmonoeciversion");
    sentinelversion = sessionStorage.getItem("currentsentinelversion");
    var nextdate = sessionStorage.getItem("nextmonoeciversion");
    if ((( monoeciversion === null ) || (sentinelversion === null)
            || ( sessionStorage.getItem("nextmonoeciversion") === null )
            || ( sessionStorage.getItem("nextmonoeciversion") < currentdate.getTime() )) && (monoeciversionsemaphore == false)) {
        monoeciversionsemaphore = true;
        $.getJSON( "/monoecininja-latestversion.json?nocache="+ (new Date()).getTime(), function( data ) {
            sessionStorage.setItem('currentmonoeciversion', data.version.string);
            sessionStorage.setItem('currentsentinelversion', data.sentinelversion.string);
            var currentdate = new Date();
            currentdate = new Date(currentdate.getTime() + 15*60000);
            sessionStorage.setItem('nextmonoeciversion', currentdate.getTime());
            monoeciversionsemaphore = false;
            displaymonoeciVersion(data.version.string,data.sentinelversion.string);
        });
        monoeciversion = monoeciversiondefault;
        sentinelversion = sentinelversiondefault;
    }
    else {
        if (monoeciversion === null) {
            monoeciversion = monoeciversiondefault;
        }
        if (sentinelversion === null) {
            sentinelversion = sentinelversiondefault;
        }
        displaymonoeciVersion(monoeciversion,sentinelversion);
    }
    if ((monoeciversion.length > 2) && (monoeciversion.substr(monoeciversion.length - 2) == ".0")) {
        monoeciversioncheck = monoeciversion.substr(0,monoeciversion.length-2);
    }
    else {
        monoeciversioncheck = monoeciversion;
    }
    return monoeciversioncheck;
};

function getVoteLimit() {
    $.getJSON("/data/votelimit-" + monoecininjatestnet+".json", function (data) {
        var cls = "panel-red";
        if (data.data.votelimit.nextvote.BlockTime == 0) {
            var datevotelimit = new Date(data.data.votelimit.nextsuperblock.BlockTime * 1000);
            $('#nextvotelimithr').text( "Too late! Superblock on "+datevotelimit.toLocaleString());
        }
        else {
            $('#nextvotelimithr').text(deltaTimeStampHRlong(data.data.votelimit.nextvote.BlockTime, currenttimestamp()));
            if ((data.data.votelimit.nextvote.BlockTime - currenttimestamp()) <= 86400) {
                cls = "panel-yellow";
            }
            else {
                cls = "panel-green";
            }
        }
        $('#nextvotepanel').removeClass("panel-green").removeClass("panel-red").removeClass("panel-yellow").addClass(cls);
    });
};


$(document).ready(function() {

    $('#monoecininjajsversion').text(monoecininjaversion).addClass("label-info").removeClass("label-danger");

    if (monoecininjatestnet == 1) {
        $('#testnetalert').show();
    }

    if (typeof monoecininjator !== 'undefined') {
        $('a[name=monoecininjatorurl]').attr("href", "http://" + monoecininjator + "/masternodes.html");
        $('span[name=monoecininjatordisplay]').show();
    }

    if (typeof monoecininjai2p !== 'undefined') {
        $('a[name=monoecininjai2purl]').attr("href", "http://" + monoecininjai2p + "/masternodes.html");
        $('span[name=monoecininjai2pdisplay]').show();
    }

    getLatestmonoeciVersion();
    getVoteLimit();

    var pkutxt = '<ul>';
    var ix = 0;
    for (var i = 0, ien = monoecininjamndetail[monoecininjatestnet].length; i < ien; i++) {
        if (ix == 0) {
            pkutxt += '<li>[Link]';
        } else {
            pkutxt += '<li>[' + ix + ']';
        }
        pkutxt += ' ' + monoecininjamndetail[monoecininjatestnet][i][1] + "</li>";
        ix++;
    }
    for (var i = 0, ien = monoecininjaaddressexplorer[monoecininjatestnet].length; i < ien; i++) {
        if (ix == 0) {
            pkutxt += '<li>[Link]';
        } else {
            pkutxt += '<li>[' + ix + ']';
        }
        pkutxt += ' ' + monoecininjaaddressexplorer[monoecininjatestnet][i][1] + "</li>";
        ix++;
    }
    pkutxt += '</ul>';
    $("#pubkeyurllist").html(pkutxt);

    $('#localnodes').on('xhr.dt', function (e, settings, json) {
        var date = new Date(json.data.cache.time*1000);
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        $('#localnodesLR').text(n + ' ' + time);
        $('#localnodes').DataTable().column(1).search('^(?:(?!Disabled).)*$', true, false).draw();
        $('#localnodesLRHR').text( deltaTimeStampHRlong(json.data.cache.time, currenttimestamp())+" ago");
    });
    tableLocalNodes = $('#localnodes').dataTable({
        responsive: true,
        searching: false,
        dom: "Tfrtp",
        ajax: { url: "/data/nodesstatus-"+monoecininjatestnet+".json",
            dataSrc: 'data.nodes' },
        "paging": false,
        columns: [
            {data: "NodeName"},
            {
                data: null, render: function (data, type, row) {
                if (data.NodeEnabled == 0) {
                    return '<img src="/static/status/daemon-disabled.png" width=16 height=16 /> Disabled';
                }
                else {
                    var iconurl = '<img src="/static/status/daemon-' + data.NodeProcessStatus + '.png" width=16 height=16 /> ';
                    if (data.NodeProcessStatus == 'running') {
                        return iconurl + 'Running';
                    } else if (data.NodeProcessStatus == 'stopped') {
                        return iconurl + 'Stopped';
                    } else if (data.NodeProcessStatus == 'notresponding') {
                        return iconurl + 'Not Responding';
                    } else {
                        return data.NodeProcessStatus;
                    }
                }
            }
            },
            {
                data: null, render: function (data, type, row) {
                var outtxt = '';
                if ((data.NodeEnabled != 0) && (data.NodeProcessStatus == 'running')) {
                    outtxt = data.NodeVersion;
                }
                return outtxt;
            }
            },
            {
                data: null, render: function (data, type, row) {
                var outtxt = '';
                if ((data.NodeEnabled != 0) && (data.NodeProcessStatus == 'running')) {
                    outtxt = data.NodeProtocol;
                }
                return outtxt;
            }
            },
            {
                data: null, render: function (data, type, row) {
                var outtxt = '';
                if ((data.NodeEnabled != 0) && (data.NodeProcessStatus == 'running')) {
                    outtxt = data.NodeBlocks;
                }
                return outtxt;
            }
            },
            {
                data: null, render: function (data, type, row) {
                var outtxt = '';
                if ((data.NodeEnabled != 0) && (data.NodeProcessStatus == 'running')) {
                    if (type != 'sort') {
                        if (monoecininjablockexplorer[monoecininjatestnet].length > 0) {
                            outtxt += '<a href="' + monoecininjablockexplorer[monoecininjatestnet][0][0].replace('%%b%%', data.NodeLastBlockHash) + '">' + data.NodeLastBlockHash + '</a>';
                            for (var i = 1, ien = monoecininjablockexplorer[monoecininjatestnet].length; i < ien; i++) {
                                outtxt += '<a href="' + monoecininjablockexplorer[monoecininjatestnet][i][0].replace('%%b%%', data.NodeLastBlockHash) + '">[' + i + ']</a>';
                            }
                        }
                    }
                    else {
                        outtxt = data.NodeLastBlockHash;
                    }
                }
                return outtxt;
            }
            },
            {
                data: null, render: function (data, type, row) {
                var outtxt = '';
                if ((data.NodeEnabled != 0) && (data.NodeProcessStatus == 'running')) {
                    outtxt = data.NodeConnections;
                }
                return outtxt;
            }
            }
        ]
    });
    setTimeout(tableLocalNodesRefresh, 60000);

    $('#blockconsensus').on('xhr.dt', function (e, settings, json) {
        var date = new Date(json.data.cache.time*1000);
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        $('#blockconsensusLR').text(n + ' ' + time);
        $('#blockconsensusLRHR').text( deltaTimeStampHRlong(json.data.cache.time, currenttimestamp())+" ago");
    });
    tableBlockConsensus = $('#blockconsensus').dataTable({
        dom: "Trtp",
        responsive: true,
        searching: false,
        ajax: { url: "/data/blocksconsensus-"+monoecininjatestnet+".json",
            dataSrc: 'data.blocksconsensus' },
        "paging": false,
        "order": [[0, "desc"]],
        columns: [
            {data: "BlockID"},
            {
                data: null, render: function (data, type, row) {
                return (Math.round(data.Consensus * 10000) / 100) + '%';
            }
            },
            {
                data: null, render: function (data, type, row) {
                if (data.ConsensusPubKey == '') {
                    return "<i>None</i>";
                } else {
                    return data.ConsensusPubKey;
                }
            }
            },
            {
                data: null, render: function (data, type, row) {
                var str = '<ul>';
                var sstr = '';
                for (var col in data.Others) {
                    str += '<li>';
                    if (data.Others[col].Payee == '') {
                        str += '<i>None</i>';
                    } else {
                        str += data.Others[col].Payee;
                    }
                    str += ' (' + (Math.round(data.Others[col].RatioVotes * 10000) / 100) + '% - Nodes: ';
                    sstr = '';
                    for (var uname in data.Others[col].NodeNames) {
                        if (sstr != '') {
                            sstr += ' ';
                        }
                        sstr += data.Others[col].NodeNames[uname];
                    }
                    str += sstr + ')</li>'
                }
                ;
                return str + '</ul>';
            }
            }
        ],
        "createdRow": function (row, data, index) {
            if (data.Consensus == 1) {
                $('td', row).eq(1).css({"background-color": "#8FFF8F"});
            } else {
                $('td', row).eq(1).css({"background-color": "#FF8F8F"});
            }
        }
    });
    setTimeout(tableBlockConsensusRefresh, 150000);

    chartMNVersions = $('#mnversions').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Masternode version',
            data: [['Unknown', 100]]
        }]
    });

    $('#mnregexp').on('keyup click', function () {
        $('#mnlist').DataTable().search($('#mnregexp').val(), true, false).draw();
    });

    $('#mnregexp').val(getParameter("mnregexp"));

    $('#mnlist').on('xhr.dt', function ( e, settings, json ) {
        var date = new Date(json.data.cache.time*1000);
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        var activeCount = 0;
        var uniqueIPs = [];
        $('#mnlistLR').text( n + ' ' + time);
        $('#mnlistLRHR').text( deltaTimeStampHRlong(json.data.cache.time, currenttimestamp())+" ago");
        var versioninfo = 'Unknown';
        var dataVersionCount = [];
        var mnregexp = $('#mnregexp').val();
        for ( var i=0, ien=json.data.masternodes.length ; i<ien ; i++ ) {
            if (parseInt(json.data.masternodes[i].MasternodeProtocol) > monoecimaxprotocol) {
                monoecimaxprotocol = parseInt(json.data.masternodes[i].MasternodeProtocol);
            }
            if (json.data.masternodes[i].ActiveCount > 0) {
                activeCount++;
            }
            if (uniqueIPs.indexOf(json.data.masternodes[i].MasternodeIP+":"+json.data.masternodes[i].MasternodePort) == -1) {
                uniqueIPs.push( json.data.masternodes[i].MasternodeIP+":"+json.data.masternodes[i].MasternodePort );
            }
            if ((json.data.masternodes[i].Portcheck != false) && json.data.masternodes[i].Portcheck.hasOwnProperty("SubVer")) {
                if ((json.data.masternodes[i].Portcheck.SubVer.length > 10) && (json.data.masternodes[i].Portcheck.SubVer.substring(0,9) == '/Satoshi:') && (json.data.masternodes[i].Portcheck.SubVer.substring(json.data.masternodes[i].Portcheck.SubVer.length-1) == '/')) {
                    versioninfo = json.data.masternodes[i].Portcheck.SubVer.substring(9,json.data.masternodes[i].Portcheck.SubVer.indexOf('/',10));
                }
                else if ((json.data.masternodes[i].Portcheck.SubVer.length > 7) && (json.data.masternodes[i].Portcheck.SubVer.substring(0,6) == '/Core:') && (json.data.masternodes[i].Portcheck.SubVer.substring(json.data.masternodes[i].Portcheck.SubVer.length-1) == '/')) {
                    versioninfo = json.data.masternodes[i].Portcheck.SubVer.substring(6,json.data.masternodes[i].Portcheck.SubVer.indexOf('/',6));
                }
                else if ((json.data.masternodes[i].Portcheck.SubVer.length > 11) && (json.data.masternodes[i].Portcheck.SubVer.substring(0,11) == '/Monoeci Core:') && (json.data.masternodes[i].Portcheck.SubVer.substring(json.data.masternodes[i].Portcheck.SubVer.length-1) == '/')) {
                    versioninfo = json.data.masternodes[i].Portcheck.SubVer.substring(11,json.data.masternodes[i].Portcheck.SubVer.indexOf('/',11));
                }
                else {
                    versioninfo = "Unknown";
                }
            }
            else {
                versioninfo = "Unknown";
            }
            versioninfo = versioninfo+" ("+json.data.masternodes[i].MasternodeProtocol+")";
            if (dataVersionCount.hasOwnProperty(versioninfo)) {
                dataVersionCount[versioninfo]++;
            }
            else {
                dataVersionCount[versioninfo] = 1;
            }
        }

        var dataSet = [];
        for (version in dataVersionCount) {
            if (dataVersionCount.hasOwnProperty(version)) {
                dataSet.push( [version, Math.round((dataVersionCount[version]/json.data.masternodes.length)*10000)/100] );
            }
        }
        chartMNVersions = $('#mnversions').highcharts();
        chartMNVersions.series[0].setData(dataSet,true);

        var inactiveCount = json.data.masternodes.length - activeCount;

        $('#mnactive').text( activeCount );
        $('#mninactive').text( inactiveCount );
        $('#mntotal').text( json.data.masternodes.length );
        $('#uniquemnips').text( uniqueIPs.length );

        if (mnregexp != "") {
            $('#mnlist').DataTable().search(mnregexp, true, false).draw();
        }
    } );
    tableMNList = $('#mnlist').dataTable( {
        ajax: { url: "/data/masternodeslistfull-"+monoecininjatestnet+".json",
                dataSrc: 'data.masternodes' },
        lengthMenu: [ [50, 100, 250, 500, -1], [50, 100, 250, 500, "All"] ],
        processing: true,
        pageLength: 50,
        columns: [
            { data: null, render: function ( data, type, row ) {
                var outtxt = '';
                if (type != 'sort') {
                    if ((monoecininjamndetailvin[monoecininjatestnet].length > 0) || (monoecininjatxexplorer[monoecininjatestnet].length > 0)) {
                        var ix = 0;
                        for ( var i=0, ien=monoecininjamndetailvin[monoecininjatestnet].length ; i<ien ; i++ ) {
                            if (ix == 0) {
                                outtxt += '<a href="'+monoecininjamndetailvin[monoecininjatestnet][0][0].replace('%%a%%',data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex)+'">'+data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex+'</a>';
                            }
                            else {
                                outtxt += '<a href="'+monoecininjamndetailvin[monoecininjatestnet][i][0].replace('%%a%%',data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex)+'">['+ix+']</a>';
                            }
                            ix++;
                        }
                        for ( var i=0, ien=monoecininjatxexplorer[monoecininjatestnet].length ; i<ien ; i++ ) {
                            if (ix == 0) {
                                outtxt += '<a href="'+monoecininjatxexplorer[monoecininjatestnet][0][0].replace('%%a%%',data.MasternodeOutputHash)+'">'+data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex+'</a>';
                            }
                            else {
                                outtxt += '<a href="'+monoecininjatxexplorer[monoecininjatestnet][i][0].replace('%%a%%',data.MasternodeOutputHash)+'">['+ix+']</a>';
                            }
                            ix++;
                        }
                    }
                    else {
                        outtxt = data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex;
                    }
                }
                else {
                    outtxt = data.MasternodeOutputHash+'-'+data.MasternodeOutputIndex;
                }
                return outtxt;
            } },
            { data: null, render: function ( data, type, row) {
                var outtxt = '';
                if (type != 'sort') {
                    if ((monoecininjamndetail[monoecininjatestnet].length > 0) || (monoecininjaaddressexplorer[monoecininjatestnet].length > 0)) {
                        var ix = 0;
                        for ( var i=0, ien=monoecininjamndetail[monoecininjatestnet].length ; i<ien ; i++ ) {
                            if (ix == 0) {
                                outtxt += '<a href="'+monoecininjamndetail[monoecininjatestnet][0][0].replace('%%a%%',data.MasternodePubkey)+'">'+data.MasternodePubkey+'</a>';
                            }
                            else {
                                outtxt += '<a href="'+monoecininjamndetail[monoecininjatestnet][i][0].replace('%%a%%',data.MasternodePubkey)+'">['+ix+']</a>';
                            }
                            ix++;
                        }
                        for ( var i=0, ien=monoecininjaaddressexplorer[monoecininjatestnet].length ; i<ien ; i++ ) {
                            if (ix == 0) {
                                outtxt += '<a href="'+monoecininjaaddressexplorer[monoecininjatestnet][0][0].replace('%%a%%',data.MasternodePubkey)+'">'+data.MasternodePubkey+'</a>';
                            }
                            else {
                                outtxt += '<a href="'+monoecininjaaddressexplorer[monoecininjatestnet][i][0].replace('%%a%%',data.MasternodePubkey)+'">['+ix+']</a>';
                            }
                            ix++;
                        }
                    }
                    else {
                        outtxt = data.MasternodePubkey;
                    }
                }
                else {
                    outtxt = data.MasternodePubkey;
                }
                return outtxt;
            } },
            { data: null, render: function ( data, type, row ) {
                var mnip = "";
                if ( data.MasternodeIP == "::" ) {
                    mnip = data.MasternodeTor+".onion";
                }
                else {
                    mnip = data.MasternodeIP;
                }
                return mnip+':'+data.MasternodePort;
            } },
            { data: null, render: function ( data, type, row ) {
                var txt = "";
                if (data.Portcheck != false) {
                    txt = data.Portcheck.Result;
                    if ((data.Portcheck.Result == 'closed') || (data.Portcheck.Result == 'timeout')) {
                        txt = "Closed";
                    } else if (data.Portcheck.Result == 'unknown') {
                        txt = "Pending";
                    } else if ((data.Portcheck.Result == 'open') || (data.Portcheck.Result == 'rogue')) {
                        txt = "Open";
                    }
                    if (data.Portcheck.NextCheck < currenttimestamp()) {
                        if (txt != "Pending") {
                            txt = txt + ' (Re-check pending)';
                        }
                    }
                    else {
                        txt = txt + ' (' + deltaTimeStampHR(data.Portcheck.NextCheck,currenttimestamp())+')';
                    }
                }
                else {
                    txt = "<i>Unknown</i>";
                }
                return txt;
            } },
            { data: null, render: function ( data, type, row ) {
                var versioninfo = '<i>Unknown</i>';
                if ((data.Portcheck != false) && data.Portcheck.hasOwnProperty("SubVer")) {
                    if ((data.Portcheck.SubVer.length > 10) && (data.Portcheck.SubVer.substring(0,9) == '/Satoshi:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length-1) == '/')) {
                        versioninfo = data.Portcheck.SubVer.substring(9,data.Portcheck.SubVer.indexOf('/',10));
                    }
                    else if ((data.Portcheck.SubVer.length > 7) && (data.Portcheck.SubVer.substring(0,6) == '/Core:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length-1) == '/')) {
                        versioninfo = data.Portcheck.SubVer.substring(6,data.Portcheck.SubVer.indexOf('/',6));
                    }
                    else if ((data.Portcheck.SubVer.length > 11) && (data.Portcheck.SubVer.substring(0,11) == '/Monoeci Core:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length-1) == '/')) {
                        versioninfo = data.Portcheck.SubVer.substring(11,data.Portcheck.SubVer.indexOf('/',11));
                    }
                }
                return versioninfo;
            } },
            { data: null, render: function ( data, type, row ) {
                return data.MasternodeProtocol;
            } },
            { data: null, render: function ( data, type, row) {
                var balance = parseFloat(data.Balance.Value);
                if (type == 'sort') {
                    return balance;
                }
                else {
                    var num = Math.round( balance * 1000 ) / 1000;
                    return addCommas( num.toFixed(3) );
                }
            } },
            { data: null, render: function ( data, type, row) {
                var lastpaid = parseInt(data.MasternodeLastPaid);
                if (lastpaid > 0) {
                    if (type == 'sort') {
                        return lastpaid;
                    }
                    else {
                        var outtxt = '';
                        outtxt = deltaTimeStampHR(lastpaid,currenttimestamp());
                        return outtxt;
                    }
                }
                else {
                    if (type == 'sort') {
                        return 0;
                    }
                    else {
                        return 'Never/Unknown';
                    }
                }
            } },
            { data: null, render: function ( data, type, row) {
                var activeseconds = parseInt(data.MasternodeActiveSeconds);
                if (type == 'sort') {
                    return activeseconds;
                } else if (activeseconds < 0) {
                    return 'Just now ('+activeseconds+')';
                }
                else {
                    return diffHR(activeseconds);
                }
            } },
            { data: null, render: function ( data, type, row) {
                if (type == 'sort') {
                    return data.MasternodeLastSeen;
                } else if (data.MasternodeLastSeen > 0) {
                    return deltaTimeStampHR(data.MasternodeLastSeen,currenttimestamp());
                } else {
                    return '';
                }
            } },
            { data: null, render: function ( data, type, row) {
                var activecount = parseInt(data.ActiveCount);
                var inactivecount = parseInt(data.InactiveCount);
                var unlistedcount = parseInt(data.UnlistedCount);
                var total = activecount+inactivecount+unlistedcount;
                var ratio = activecount / total;
                var result = ratio;
                if (type == 'sort') {
                    result =  ratio;
                } else {
                    if ( ratio == 1 ) {
                        result = 'Active';
                    } else if ( ratio == 0 ) {
                        result = 'Inactive';
                    } else if ( unlistedcount > 0 ) {
                        result = 'Partially Unlisted';
                    } else {
                        result = 'Partially Inactive';
                    }
                    result += ' ('+Math.round(ratio*100)+'%)';
                }
                return result;
            } },
        ],
        "createdRow": function ( row, data, index ) {
            monoeciversioncheck = getLatestmonoeciVersion();
            var color = '#FF8F8F';
            if ( data.Portcheck == false ) {
                color = '#8F8F8F';
            }
            else {
                if (( data.Portcheck.Result == 'open' ) || ( data.Portcheck.Result == 'rogue' )) {
                    color = '#8FFF8F';
                } else if (data.Portcheck.Result == 'unknown') {
                    color = '#8F8F8F';
                }
            }
            $('td',row).eq(3).css({"background-color":color,"text-align": "center"});
            color = '#8FFF8F';
            if ( data.Balance.Value < 1000 ) {
                color = '#FF8F8F';
            }
            $('td',row).eq(6).css({"background-color":color,"text-align": "right"});
            var versioninfo = "Unknown";
            if ((data.Portcheck != false) && data.Portcheck.hasOwnProperty("SubVer")) {
                if ((data.Portcheck.SubVer.length > 10) && (data.Portcheck.SubVer.substring(0, 9) == '/Satoshi:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length - 1) == '/')) {
                    versioninfo = data.Portcheck.SubVer.substring(9, data.Portcheck.SubVer.indexOf('/', 10));
                }
                else if ((data.Portcheck.SubVer.length > 7) && (data.Portcheck.SubVer.substring(0, 6) == '/Core:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length - 1) == '/')) {
                    versioninfo = data.Portcheck.SubVer.substring(6, data.Portcheck.SubVer.indexOf('/', 6));
                }
                else if ((data.Portcheck.SubVer.length > 11) && (data.Portcheck.SubVer.substring(0, 11) == '/Monoeci Core:') && (data.Portcheck.SubVer.substring(data.Portcheck.SubVer.length - 1) == '/')) {
                    versioninfo = data.Portcheck.SubVer.substring(11, data.Portcheck.SubVer.indexOf('/', 11));
                }
            }
            if ( versioninfo == "Unknown" ) {
                color = '#8F8F8F';
            }
            else if ( ( versioninfo.substring(0,5) == "0.10." ) || ( versioninfo.substring(0,7) == "0.11." ) ) {
                color = '#FF8F8F';
            }
            else if ( versioninfo == monoeciversioncheck ) {
                color = '#8FFF8F';
            }
            else {
                color = '#FFFF8F';
            }
            $('td',row).eq(4).css({"background-color":color});
            var curprotocol = parseInt(data.MasternodeProtocol);
            if ( curprotocol < 70102 ) {
                color = '#FF8F8F';
            }
            else if ( curprotocol == monoecimaxprotocol ) {
                color = '#8FFF8F';
            }
            else {
                color = '#FFFF8F';
            }
            $('td',row).eq(5).css({"background-color":color,"text-align": "right"});
            var total = data.ActiveCount+data.InactiveCount+data.UnlistedCount;
            var activecount = parseInt(data.ActiveCount);
            var inactivecount = parseInt(data.InactiveCount);
            var unlistedcount = parseInt(data.UnlistedCount);
            var total = activecount+inactivecount+unlistedcount;
            var ratio = activecount / total;
            if (ratio == 1) {
                color = '#8FFF8F';
            } else if (ratio == 0) {
                color = '#FF8F8F';
            } else if (ratio < 0.5) {
                color = '#ffcb8f';
            } else {
                color = '#FFFF8F';
            }
            $('td',row).eq(10).css({"background-color":color,"text-align": "center"});
        }
    } );
    var mnlistsize = getParameter("mnlistsize");
    if (mnlistsize != "") {
        $('#mnlist').DataTable().page.len(parseInt(mnlistsize));
    }


    setTimeout(tableMNListRefresh, 300000);

    //mnpaymentsRefresh();

});
