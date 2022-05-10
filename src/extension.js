const vscode = require('vscode')

/**
 * @param {*} context
 */
exports.activate = function (context) {
	console.log(vscode)
	require('./completion')(context)
	require('./hover')(context)
}

exports.deactivate = function () {
	console.log('deactivate')
}
