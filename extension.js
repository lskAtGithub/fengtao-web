const vscode = require('vscode')

const CreateFilesClass = require('./pulgins/createFiles')
// const editCode = require('./pulgins/editCode')

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
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
