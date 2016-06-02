'use babel';

export default function(editor) {
    const selection = editor.getSelectedText();
    const buffer = editor.getBuffer();

    editor.insertText(`**${selection}**`);
    if (!selection){
        editor.moveLeft(2);
    }
}
