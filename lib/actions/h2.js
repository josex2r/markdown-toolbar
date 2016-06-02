'use babel';

export default function(editor) {
    const selection = editor.getSelectedText();

    editor.moveToBeginningOfLine();
    editor.insertText(`## `);
    editor.moveToEndOfLine();
}
