const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.repeatSelection', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = editor.selection;
            let text = editor.document.getText(selection);
            vscode.commands.executeCommand('editor.action.clipboardCopyAction').then(() => {
                vscode.commands.executeCommand('editor.action.clipboardPasteAction').then(() => {
                    editor.edit(editBuilder => {
                        editBuilder.insert(selection.end, text);
                    });
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;
