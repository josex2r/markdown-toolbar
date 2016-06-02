'use babel';

export default function(editor) {
    const selection = editor.getSelectedText();

    editor.insertText(`_${selection}_`);
    if (!selection){
        editor.moveLeft();
    }
}
