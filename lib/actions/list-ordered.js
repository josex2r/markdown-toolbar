'use babel';

export default function(editor) {
    const selection = editor.getSelectedText();

    editor.insertText(`1. ${selection}`);
}
