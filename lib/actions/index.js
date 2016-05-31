'use babel';

import bold from './bold';

const actions = {
    bold
};

/**
 * Calls a function defined in this directory, if error it show a notification.
 */
export default function(action) {
    const fn = actions[action];
    const editor = atom.workspace.getActiveTextEditor();

    // Check if function and editor exists
    if (fn && editor) {
        // Calls action
        fn.call(this, editor);
    } else {
        // Show error notification
        atom.notifications.addError('Action does not exist', {
            dismissable: true
        });
    }
}
