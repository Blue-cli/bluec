const path = require('path'),
	shell = require('shelljs/global'),
	sass = require('node-sass');

const localFolder = process.cwd();


function generateWebpackConfig () {
	
}

module.exports = function(options) {
	// Is watch mode
	const isWatchMode = !!options.watch;

	// Matched CSS file
	const matchedCSSFile = ls("src/app.*ss")[0];

	// Get CSS file extension
	const CSSExt = matchedCSSFile ? path.extname(matchedCSSFile).toLowerCase() : '.css';

	if (CSSExt === '.scss') {
		
	}
};