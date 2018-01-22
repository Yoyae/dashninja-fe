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
var monoecininjatestnethost = 'test.monoecininja.pl';
var monoecininjatestnetexplorer = 'test.explorer.monoecininja.pl';

// Tor onion hostname
var monoecininjator = 'seuhd5sihasshuqh.onion';
var monoecininjai2p = 'dzjzoefy7fx57h5xkdknikvfv3ckbxu2bx5wryn6taud343g2jma.b32.i2p';

// Coin logos
var monoecininjacoin = ['MONOECI','tMONOECI'];

// URLs
// Block info
// ["https://explorer.monoecininja.pl/block/%%b%%","Monoeci Blockchain Explorer"] TODO
var monoecininjablockexplorer = [[["http://chainz.cryptoid.info/monoeci/block.dws?%%b%%.htm","cryptoID Monoeci Blockchain Explorer"]],
                          [["https://test.explorer.monoecininja.pl/block/%%b%%","Monoeci Ninja Testnet Blockchain Explorer"],
                           ["http://test.explorer.darkcoin.qa/block/%%b%%","Official Testnet Monoeci Blockchain Explorer"],
                           ["http://test.insight.masternode.io:3001/block/%%b%%","coingun's Testnet Monoeci Blockchain Explorer"]]];

// Address info
var monoecininjamndetail = [[["/mndetails.html?mnpubkey=%%a%%","Monoeci Ninja Masternode Detail"],
                          ["https://www.monoecicentral.org/masternodes/%%a%%","Monoeci Central Masternode Monitoring"]],
                         [["/mndetails.html?mnpubkey=%%a%%","Monoeci Ninja Testnet Masternode Detail"]]];
var monoecininjamndetailvin = [[["/mndetails.html?mnoutput=%%a%%","Monoeci Ninja Masternode Detail"]],
                            [["/mndetails.html?mnoutput=%%a%%","Monoeci Ninja Testnet Masternode Detail"]]];

// ["https://explorer.monoecininja.pl/address/%%a%%","Monoeci Blockchain Explorer"],
var monoecininjaaddressexplorer = [[["https://chainz.cryptoid.info/monoeci/address.dws?%%a%%.htm","cryptoID Monoeci Blockchain Explorer"]],
                                [["https://test.explorer.monoecininja.pl/address/%%a%%","Monoeci Ninja Testnet Blockchain Explorer"],
                                 ["http://test.explorer.darkcoin.qa/address/%%a%%","Official Testnet Monoeci Blockchain Explorer"],
                                 ["http://test.insight.masternode.io:3001/address/%%a%%","coingun's Testnet Monoeci Blockchain Explorer"]]];
// ["http://explorer.monoecininja.pl/tx/%%a%%","Monoeci Blockchain Explorer"],
var monoecininjatxexplorer = [[["https://chainz.cryptoid.info/monoeci/tx.dws?%%a%%.htm","cryptoID Monoeci Blockchain Explorer"]],
                           [["http://test.explorer.monoecininja.pl/tx/%%a%%","Monoeci Ninja Testnet Blockchain Explorer"],
                            ["http://test.explorer.darkcoin.qa/tx/%%a%%","Official Testnet Monoeci Blockchain Explorer"]]];

// Search query
// ["https://explorer.monoecininja.pl/search?q=%%q%%","Monoeci Blockchain Explorer"],
var monoecininjaqueryexplorer = [[["https://chainz.cryptoid.info/monoeci/search.dws?q=%%q%%","cryptoID Monoeci Blockchain Explorer"]],
                            [["https://test.explorer.monoecininja.pl/search?q=%%q%%","Monoeci Ninja Testnet Blockchain Explorer"],
                             ["http://test.explorer.darkcoin.qa/search?q=%%q%%","Official Testnet Monoeci Blockchain Explorer"]]];

var monoecininjamasternodemonitoring = ["/masternodes.html?mnregexp=%%p%%#mnversions","/masternodes.html?mnregexp=%%p%%#mnversions"];

var monoecininjabudgetdetail = ["/budgetdetails.html?budgetid=%%b%%","/budgetdetails.html?budgetid=%%b%%"];

var monoecininjagovernanceproposaldetail = ["/proposaldetails.html?proposalhash=%%b%%","/proposaldetails.html?proposalhash=%%b%%"];

// Blocks per day
var monoeciblocksperday = 553;