'use babel';

import buttons from './buttons';
import markdownToolbarFactory from './markdown-toolbar-factory';
import actions from './actions';
import {
    CompositeDisposable
} from 'atom';

let toolbar, subscriptions;

function camelize(string) {
    string = string.replace(/(?:^|[-_])(\w)/g, (_, c) => {
        return c ? c.toUpperCase () : '';
    });
    return string.charAt(0).toLowerCase() + string.substr(1);
}

/**
 * Calls a function defined in this directory, if error it show a notification.
 */
function actionDispatcher(action) {
    const fn = actions[camelize(action)];
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

export function activate() {
    toolbar = markdownToolbarFactory(buttons);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    subscriptions.add(atom.commands.add('atom-workspace', {
        'markdown-toolbar:toggle': () => toolbar.toggle(),

        // Toolbar view
        'markdown-toolbar:position-top': () => toolbar.setPosition('top'),
        'markdown-toolbar:position-bottom': () => toolbar.setPosition('bottom'),
        'markdown-toolbar:size-small': () => toolbar.setSize('small'),
        'markdown-toolbar:size-medium': () => toolbar.setSize('medium'),
        'markdown-toolbar:size-big': () => toolbar.setSize('big'),

        // Button actions
        'markdown-toolbar:h1': () => actionDispatcher('h1'),
        'markdown-toolbar:h2': () => actionDispatcher('h2'),
        'markdown-toolbar:h3': () => actionDispatcher('h3'),
        'markdown-toolbar:bold': () => actionDispatcher('bold'),
        'markdown-toolbar:italic': () => actionDispatcher('italic'),
        'markdown-toolbar:quote': () => actionDispatcher('quote'),
        'markdown-toolbar:code': () => actionDispatcher('code'),
        'markdown-toolbar:link': () => actionDispatcher('link'),
        'markdown-toolbar:list-ordered': () => actionDispatcher('list-ordered'),
        'markdown-toolbar:list-unordered': () => actionDispatcher('list-unordered'),
        'markdown-toolbar:list-task': () => actionDispatcher('list-task'),
    }));
}

export function deactivate() {
    toolbar.destroy();
    toolbar = null;
    subscriptions.dispose();
}

export const config = {
    visible: {
        type: 'boolean',
        default: true,
        order: 1
    },
    size: {
        type: 'string',
        default: 'small',
        enum: ['small', 'medium', 'big'],
        order: 2
    },
    position: {
        type: 'string',
        default: 'top',
        enum: ['top', 'bottom'],
        order: 3
    }
};
