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

// Either indicate if we are we on testnet (=1) or on mainnet (=0)
//var monoecininjatestnet = 0;
// OR indicate the hostname for testnet (if the hostname the page is running is equal to this, it will switch to testnet)
var monoecininjatestnethost = 'test.monoecininja.pl'; //TODO
var monoecininjatestnetexplorer = 'test.explorer.monoecininja.pl'; //TODO

// Tor onion hostname
//var monoecininjator = 'seuhd5sihasshuqh.onion'; //TODO
//var monoecininjai2p = 'dzjzoefy7fx57h5xkdknikvfv3ckbxu2bx5wryn6taud343g2jma.b32.i2p'; //TODO

// Coin logos
var monoecininjacoin = ['XMCC','tXMCC'];

// Block explorer
var monoecininjablockexplorer = [[["http://block.monacocoin.net:8080/block/%%b%%","Official Monoeci Blockchain Explorer"],
                           ["http://163.172.135.190:3001/insight/block/%%b%%","Official Monoeci (insight) Blockchain Explorer"],
						   ["http://xmcc.altexplorer.co/block/%%b%%","altexplorer Monoeci Blockchain Explorer"]],
                           []];

// Address info
var monoecininjamndetail = [[["/mndetails.html?mnpubkey=%%a%%","Monoeci Ninja Masternode Detail"]],
                         [["/mndetails.html?mnpubkey=%%a%%","Monoeci Ninja Testnet Masternode Detail"]]];
var monoecininjamndetailvin = [[["/mndetails.html?mnoutput=%%a%%","Monoeci Ninja Masternode Detail"]],
                            [["/mndetails.html?mnoutput=%%a%%","Monoeci Ninja Testnet Masternode Detail"]]];

// Address explorer
var monoecininjaaddressexplorer = [[["http://block.monacocoin.net:8080/address/%%b%%","Official Monoeci Blockchain Explorer"],
                           ["http://163.172.135.190:3001/insight/address/%%b%%","Official Monoeci (insight) Blockchain Explorer"],
						   ["http://xmcc.altexplorer.co/address/%%b%%","altexplorer Monoeci Blockchain Explorer"]],
                           []];

// Transaction explorer
var monoecininjatxexplorer = [[["http://block.monacocoin.net:8080/tx/%%b%%","Official Monoeci Blockchain Explorer"],
                           ["http://163.172.135.190:3001/insight/tx/%%b%%","Official Monoeci (insight) Blockchain Explorer"],
						   ["http://xmcc.altexplorer.co/tx/%%b%%","altexplorer Monoeci Blockchain Explorer"]],
                           []];

// Search query
var monoecininjaqueryexplorer = [[],[]];

var monoecininjamasternodemonitoring = ["/masternodes.html?mnregexp=%%p%%#mnversions","/masternodes.html?mnregexp=%%p%%#mnversions"];

var monoecininjabudgetdetail = ["/budgetdetails.html?budgetid=%%b%%","/budgetdetails.html?budgetid=%%b%%"];

var monoecininjagovernanceproposaldetail = ["/proposaldetails.html?proposalhash=%%b%%","/proposaldetails.html?proposalhash=%%b%%"];

// Blocks per day
var monoeciblocksperday = 720;