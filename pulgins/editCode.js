const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const util = require('../utils/index')

function getWebViewContent(context, templatePath) {
  const resourcePath = util.getExtensionFileAbsolutePath(context, templatePath)
  const dirPath = path.dirname(resourcePath)
  let html = fs.readFileSync(resourcePath, 'utf-8')
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      return (
        $1 +
        vscode.Uri.file(path.resolve(dirPath, $2))
          .with({ scheme: 'vscode-resource' })
          .toString() +
        '"'
      )
    }
  )
  return html
}

const registerEditCode = (context) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('fengtao-web.editCode', function () {
      const panel = vscode.window.createWebviewPanel(
        'editCode', // viewType
        '可视化生成代码配置', // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
          enableScripts: true, // 启用JS，默认禁用
          retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        }
      )
      panel.webview.html = getWebViewContent(context, '/view/index.html')
    })
  )
}

module.exports = registerEditCode
