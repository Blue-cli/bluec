#!/usr/bin/env node

const program = require('commander');

const about = require('./utils/about');

const initCmd = require('./cli/init'),
	genarateCmd = require('./cli/generate'),
	buildCmd = require('./cli/build');

program
	.version(about.getVersion(), '-v, --version')
	.description(about.getDescription());

program
	.command('info')
	.action(function () {
		about.showInfo();
	});

program
	.command('init <name>')
	.description('Init a basic project')
	.alias('i')
	.option('-t, --template <template>', 'project template', /^(mp|h5)$/i, 'mp')
	.action(initCmd);

program
	.command('build')
	.description('Build project')
	.alias('b')
	.option('-w, --watch', 'Watch Mode')
	.action(buildCmd);

program.parse(process.argv);