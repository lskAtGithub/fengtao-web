const vscode = require('vscode')

const CreateFilesClass = require('./pulgins/createFiles')

const CreateFiles = new CreateFilesClass()

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let CreatePages = vscode.commands.registerCommand(
    'fengtao-web.createFiles',
    function (uri) {
      CreateFiles.create(uri)
    }
  )

  context.subscriptions.push(CreatePages)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
