const fs = require('fs');
const os = require('os');
const path = require('path');
const vscode = require('vscode');
const exec = require('child_process').exec;

const util = {
    /**
     * getProjectPath(uri) 
     * getProjectPath(document)
     * getProjectPath() 
     * @param {*} document 
     */
    getProjectPath(document) {
        if (!document) {
            document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
        }
        if (!document) {
            this.showError('no doc');
            return '';
        }
        const currentFile = (document.uri ? document.uri : document).fsPath;
        let projectPath = null;

        let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
        if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
            const rootPath = workspaceFolders[0];
            var files = fs.readdirSync(rootPath);
            workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
            // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
        }
        workspaceFolders.forEach(folder => {
            if (currentFile.indexOf(folder) === 0) {
                projectPath = folder;
            }
        })
        if (!projectPath) {
            this.showError('Path error');
            return '';
        }
        return projectPath;
    },
    getProjectName: function(projectPath) {
        return path.basename(projectPath);
    },
    getPluginPath() {
    },
    /**
     * @param {*} word
     */
    upperFirstLetter: function(word) {
        return (word || '').replace(/^\w/, m => m.toUpperCase());
    },
    /**
     * @param {*} word 
     */
    lowerFirstLeter: function(word) {
        return (word || '').replace(/^\w/, m => m.toLowerCase());
    },
    log: function(...args) {
        console.log(...args);
    },
    error: function(...args) {
        console.error(...args);
    },
    showError: function(info) {
        vscode.window.showErrorMessage(info);
    },
    showInfo: function(info) {
        vscode.window.showInformationMessage(info);
    },
    findStrInFolder: function(folderPath, str) {
    },
    /**
     * @param filePath
     * @param reg
     */
    findStrInFile: function(filePath, reg) {
        const content = fs.readFileSync(filePath, 'utf-8');
        reg = typeof reg === 'string' ? new RegExp(reg, 'm') : reg;
        if (content.search(reg) < 0) return {row: 0, col: 0};
        const rows = content.split(os.EOL);
        for(let i = 0; i < rows.length; i++) {
            let col = rows[i].search(reg);
            if(col >= 0) {
                return {row: i, col};
            }
        }
        return {row: 0, col: 0};
    },
    getStrRangeInFile: function(filePath, str) {
        var pos = this.findStrInFile(filePath, str);
        return new vscode.Range(new vscode.Position(pos.row, pos.col), new vscode.Position(pos.row, pos.col + str.length));
    },
    checkVersion: function(version1, version2) {
        version1 = parseInt(version1.replace(/\./g, ''));
        version2 = parseInt(version2.replace(/\./g, ''));
        return version1 > version2;
    },
    /**
     * @param context
     * @param relativePath 
     */
    getExtensionFileAbsolutePath: function(context, relativePath) {
        return path.join(context.extensionPath, relativePath);
    },
    /**
     * @param context
     * @param relativePath
     */
    getExtensionFileVscodeResource: function(context, relativePath) {
        const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
        return diskPath.with({ scheme: 'vscode-resource' }).toString();
    },
    openFileInFinder: function(filePath) {
        if (!fs.existsSync(filePath)) {
            this.showError('filePath: ' + filePath);
        }
        if (fs.statSync(filePath).isDirectory()) {
            exec(`open ${filePath}`);
        } else {
            const fileName = path.basename(filePath);
            filePath = path.dirname(filePath);
            exec(`open ${filePath}`);
        }
    },
    /**
     * @param {*} path
     * @param {*} text
     */
    openFileInVscode: function(path, text) {
        let options = undefined;
        if (text) {
            const selection = this.getStrRangeInFile(path, text);
            options = { selection };
        }
        vscode.window.showTextDocument(vscode.Uri.file(path), options);
    },
    openJarByJdGui: function(jarPath) {
        const jdGuiPath = vscode.workspace.getConfiguration().get('eggHelper.jdGuiPath');
        if (!jdGuiPath) {
            this.showError('JD-GUI err');
            return;
        }
        if (!fs.existsSync(jdGuiPath)) {
            this.showError('JD-GUI err');
            return;
        }
        if (!fs.existsSync(jarPath)) {
            this.showError('jar: ' + jarPath);
            return;
        }
        exec(`open ${jarPath} -a ${jdGuiPath}`);
    },
    openUrlInBrowser: function(url) {
        exec(`open '${url}'`);
    },
    /**
     * @param {*} absolutePath
     */
    clearRequireCache(absolutePath) {
        const root = require.cache[absolutePath];
        if (!root) return;
        if (root.children) {
            root.children.forEach(item => {
                this.clearRequireCache(item.id);
            });
        }
        delete require.cache[absolutePath];
    },
    /**
     * @param {*} modulePath 
     */
    dynamicRequire(modulePath) {
        this.clearRequireCache(modulePath);
        return require(modulePath);
    },
    /**
     * @param {*} filePath 
     */
    readProperties(filePath) {
        const content =  fs.readFileSync(filePath, 'utf-8');
        let rows = content.split(os.EOL);
        rows = rows.filter(row => row && row.trim() && !/^#/.test(row));
        const result = {};
        rows.forEach(row => {
            let temp = row.split('=');
            result[temp[0].trim()] = temp[1].trim();
        });
        return result;
    },
    /**
     * @param {*} obj1 
     * @param {*} obj2 
     */
    jsonEquals(obj1, obj2) {
        let s1 = this.formatToSpecialJSON(obj1, '', true);
        let s2 = this.formatToSpecialJSON(obj2, '', true);
        return s1 === s2;
    }
};

module.exports = util;