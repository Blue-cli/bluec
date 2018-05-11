const clear = require('clear'),
	chalk = require('chalk'),
	figlet = require('figlet');
	
const package = require('../package.json');

const About = {
	// Show basic information
	showInfo: function () {
		console.log(
			chalk.blueBright(
				figlet.textSync('Blue-CLI', { horizontalLayout: 'full' })
			)
		);

		console.log(
			chalk.blueBright(`v${package.version}`)
		);

		console.log(
			chalk.yellow(package.description)
		);
	},

	// Get the version of the CLI
	getVersion: function () {
		return package.version;
	},

	// Get the description of the CLI
	getDescription: function () {
		return package.description;
	},
};

module.exports = About;