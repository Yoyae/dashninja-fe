# Monoeci Ninja Front-End (monoecininja-fe)

Initial code by Alexandre (aka elbereth) Devilliers (https://github.com/elbereth/dashninja-fe)

Check the running live website at https://www.monoecininja.pl

This is part of what makes the Monoeci Ninja monitoring application.
It contains:
- Public REST API (using PHP and Phalcon framework)
- Public web pages (using static HTML5/CSS/Javascript)

## Requirement:
* You will need a running website, official at https://monoecininja.pl uses nginx

For the REST API:
* PHP v5.6 with mysqli (works/tested with PHP 7.1)
* Phalcon v2.0.x (should work with any version) up to v3.2.x
* MySQL database with Monoeci Ninja Database (check monoecininja-db repository)

## Optional:
* Monoeci Ninja Control script installed and running (to have a populated database)

## Install:
* Go to the root of your website for Monoeci monitoring (ex: cd /home/monoecininja2/www/)
* Get latest code from github:
```shell
git clone https://github.com/Yoyae/monoecininja-fe.git
```

* Configure php to answer only to calls to api/index.php rewriting to end-point api/

* Add api/cron.php script to your crontab, activate for main and/or test net, both for blocks24h and for masternode full list

## Configuration:
* Todo...
