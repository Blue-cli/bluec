const path = require('path'),
	fs = require('fs'),
	inquirer = require('inquirer'),
	shell = require('shelljs/global');

const exec = require('child_process').exec;

const templateFolder = `${__dirname}/../templates`,
	localFolder = process.cwd();

var template = '';

function askQuestions (folderName, template) {
	const questions = [];

	// project name
	questions.push({
		name: 'name',
		type: 'input',
		message: 'Enter your project name:',
		default: folderName,
		validate: function( value ) {
			if (value.length) {
				return true;
			} else {
				return 'Please enter your project name.';
			}
		}
	});
	
	// wechat mini program
	if (template === 'mp') {
		// appid
		questions.push({
			name: 'appid',
			type: 'input',
			message: 'Enter your mini-program appid:',
			default: 'touristappid',
			validate: function( value ) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter your mini-program appid.';
				}
			}
		});

		// description
		questions.push({
			name: 'description',
			type: 'input',
			message: 'Enter your mini-program description:',
			default: 'Project config file',
			validate: function( value ) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter your mini-program description.';
				}
			}
		});

		// lib
		questions.push({
			name: 'libversion',
			type: 'input',
			message: 'Enter your lib version:',
			default: '2.0.2',
			validate: function( value ) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter your lib version.';
				}
			}
		});
	}

	// preprocessor
	questions.push({
		name: 'preprocessor',
		type: 'list',
		message: 'Choose your favorite preprocessor:',
		choices: ['SCSS', 'SASS', 'LESS'],
		validate: function( value ) {
			if (value.length) {
				return true;
			} else {
				return 'Please choose your favorite preprocessor.';
			}
		}
	});
		
	return inquirer.prompt(questions);
}

function generateWechatMiniProgram (name, answers) {

	const currTemplatePath = `${templateFolder}/src/${template}`,
			currFolderPath = `${localFolder}/${name}/src`,
			preprocessor = answers.preprocessor.toLowerCase();

	const miniprogramConfigFileName = 'project.config.json';

	if (!fs.existsSync(currFolderPath)) {
		// Create folder
		mkdir('-p', `${name}/src`);
		
		if (fs.existsSync(currTemplatePath)) {

			// Copy the template folder
			cp('-R', `${currTemplatePath}/*`, `${currFolderPath}`);

			// Enter the source folder
			cd(`${name}/src`);

			// Replace variables
			sed('-i', '__MINI_PROGRAM_NAME__', answers.name, miniprogramConfigFileName);

			sed('-i', '__MINI_PROGRAM_APPID__', answers.appid, miniprogramConfigFileName);

			sed('-i', '__MINI_PROGRAM_DESC__', answers.description, miniprogramConfigFileName);

			sed('-i', '__MINI_PROGRAM_LIB__', answers.libversion, miniprogramConfigFileName);

			// Rename css file
			mv('app.wxss', `app.${preprocessor}`);
		}
	} else {
		console.log('The folder exists');
	}
}

module.exports = function(folderName, options) {
	template = options.template;

	askQuestions(folderName, template)

	.then(answers => {
		generateWechatMiniProgram(folderName, answers);
	});
};