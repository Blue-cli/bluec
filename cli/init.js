const path = require('path'),
	fs = require('fs'),
	shell = require('shelljs/global');

const exec = require('child_process').exec;

const templateFolder = `${__dirname}/../templates`,
	localFolder = process.cwd();

module.exports = function(name, options) {
	const template = options.template,
		currTemplatePath = `${templateFolder}/src/${template}`,
		currFolderPath = `${localFolder}/${name}/src`;

	if (!fs.existsSync(currFolderPath)) {
		// Create folder
		mkdir('-p', `${name}/src`);
		
		if (fs.existsSync(currTemplatePath)) {
			// Copy the template folder
			cp('-R', `${currTemplatePath}/*`, `${currFolderPath}`);
		}
	} else {
		console.log('The folder exists');
	}
};