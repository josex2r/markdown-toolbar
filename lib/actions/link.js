'use babel';

export default function(editor) {
    const selection = editor.getSelectedText();

    editor.insertText(`[${selection}](url)`);
    if (!selection){
        editor.moveLeft(6);
    }
}
