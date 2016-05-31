'use babel';

import buttons from './buttons';
import markdownToolbarFactory from './markdown-toolbar-factory';
import {
    CompositeDisposable
} from 'atom';

let toolbar, subscriptions;

export function activate() {
    toolbar = markdownToolbarFactory(buttons);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    subscriptions.add(atom.commands.add('atom-workspace', {
        'markdown-toolbar:toggle': () => toolbar.toggle(),
        'markdown-toolbar:position-top': () => toolbar.setPosition('top'),
        'markdown-toolbar:position-bottom': () => toolbar.setPosition('bottom'),
        'markdown-toolbar:size-small': () => toolbar.setSize('small'),
        'markdown-toolbar:size-medium': () => toolbar.setSize('medium'),
        'markdown-toolbar:size-big': () => toolbar.setSize('big')
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
