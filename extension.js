const vscode = require('vscode');
async function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.repeatSelection',
    async function () {
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        // 保存剪贴板原来的内容
        let originalClipboardText = await vscode.env.clipboard.readText();
        vscode.commands
          .executeCommand('editor.action.clipboardCopyAction')
          .then(() => {
            vscode.commands
              .executeCommand('editor.action.clipboardPasteAction')
              .then(() => {
                editor.edit(async (editBuilder) => {
                  editBuilder.insert(selection.end, text);
                  // 恢复剪贴板原来的内容
                  await vscode.env.clipboard.writeText(originalClipboardText);
                });
              });
          });
      }
    },
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;
