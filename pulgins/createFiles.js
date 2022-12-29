const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

const createContent = require('../templateCode/create').content
const componentsContent = require('../templateCode/components').content
const editContent = require('../templateCode/edit').content
const detailContent = require('../templateCode/detail').content
const listContent = require('../templateCode/list').content

const contents = {
  createContent,
  componentsContent,
  editContent,
  detailContent,
  listContent,
}

class CreateFiles {
  constructor() {
    this.types = []
  }

  async create(uri) {
    if (!uri) {
      vscode.window.showErrorMessage('未找到插入文件的路径')
      return
    }
    const keyinContent = await this.userKeyinFilesNameAndParams()
    const hasKeyinTypes = keyinContent.includes(',')
    let fileName = ''
    if (hasKeyinTypes) {
      const keyinArr = keyinContent.split(',')
      fileName = keyinArr[0]
      this.types = []
      keyinArr.map((item, index) => index && this.types.push(item))
    } else {
      fileName = keyinContent
    }
    if (!fileName) {
      return
    }
    try {
      vscode.window.showInformationMessage(uri.fsPath)
      this.createFilesEvent(uri.fsPath, fileName, hasKeyinTypes)
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error.message}`)
      return
    }
  }

  userKeyinFilesNameAndParams() {
    return vscode.window.showInputBox({
      ignoreFocusOut: true,
      placeHolder: `请输入文件名`,
      validateInput(name) {
        if (!name) {
          return '文件名不能为空'
        }
        if (/[\\/:*?"<>|]/.test(name)) {
          return '文件名中包含无效字符'
        }
        if (/[\s]/.test(name)) {
          return '文件名不允许空格'
        }
        return null
      },
      prompt: `文件名`,
    })
  }
  createFilesEvent(dir, fileName, hasType) {
    const dirname = path.join(dir, fileName)
    if (fs.existsSync(dirname)) {
      vscode.window.showErrorMessage('文件名已存在, 创建失败')
      return
    }
    fs.mkdirSync(dirname)
    if (hasType) {
      this.types.forEach((item) => {
        this.createPage(dirname, item)
      })
      if (this.types.includes('create')) this.createPage(dirname, 'components')
    } else {
      this.createPage(dirname, 'default')
    }
    vscode.window.showInformationMessage(`${fileName} successfully created`)
  }

  createPage(path, typeItem) {
    if (typeItem === 'default') {
      fs.mkdirSync(`${path}\\list`)
      fs.writeFileSync(`${path}\\list\\index.vue`, listContent)
      fs.mkdirSync(`${path}\\create`)
      fs.writeFileSync(`${path}\\create\\index.vue`, createContent)
      fs.mkdirSync(`${path}\\edit`)
      fs.writeFileSync(`${path}\\edit\\index.vue`, editContent)
      fs.mkdirSync(`${path}\\detail`)
      fs.writeFileSync(`${path}\\detail\\index.vue`, detailContent)
      fs.mkdirSync(`${path}\\components`)
      fs.writeFileSync(
        `${path}\\components\\CreateEditModule.vue`,
        componentsContent
      )
    } else {
      fs.mkdirSync(`${path}\\${typeItem}`)
      fs.writeFileSync(
        `${path}\\${typeItem}\\index.vue`,
        contents[`${typeItem}Content`]
      )
    }
  }
}

module.exports = CreateFiles
