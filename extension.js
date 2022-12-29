const vscode = require('vscode')

const CreateFilesClass = require('./pulgins/createFiles')
const registerEditCode = require('./pulgins/editCode')

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
  
  // 创建页面
  context.subscriptions.push(CreatePages)

  // 代码编辑
  registerEditCode(context)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
