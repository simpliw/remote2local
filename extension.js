// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const clipboardy = require('clipboardy');
const extractRequire = require('./util/extractRequire');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "remote2local" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.remote2localFromCopy', function () {
        // The code you place here will be executed every time your command is executed
        let clipContent = clipboardy.readSync();
        const curWindow = vscode.window;
        const editor = curWindow.activeTextEditor;
        let content = editor.document.getText();
        let workspaceEdit = new vscode.WorkspaceEdit()
        // Display a message box to the user
        if(!clipContent.length) {
            curWindow.showInformationMessage("There's nothing on the clipboard!");
            return;
        }
        let arrRequire = extractRequire(clipContent);
        let len = arrRequire.length;
        while(len--) {
            let obj = arrRequire[len];
            let index = content.indexOf(obj.replacePath);
            if(index !== -1) {
                workspaceEdit.replace(editor.document.uri, new Range(index, index + length), obj.targetPath)
            }
        }


    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;