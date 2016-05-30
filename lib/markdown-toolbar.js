'use babel';

import MarkdownToolbarView from './markdown-toolbar-view';
import {
    CompositeDisposable
} from 'atom';

let toolBar, subscriptions;

export function activate() {
    toolBar = new MarkdownToolbarView();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    subscriptions.add(atom.commands.add('atom-workspace', {
        'markdown-toolbar:toggle': () => toolBar.toggle(),
        'markdown-toolbar:position-top': () => toolBar.setPosition('top'),
        'markdown-toolbar:position-bottom': () => toolBar.setPosition('bottom')
    }));
}

export function deactivate() {
    toolBar.destroy();
    toolBar = null;
    subscriptions.dispose();
}

export const config = {
    visible: {
        type: 'boolean',
        default: true,
        order: 1
    },
    iconSize: {
        type: 'string',
        default: '24px',
        enum: ['12px', '16px', '24px', '32px'],
        order: 2
    },
    position: {
        type: 'string',
        default: 'top',
        enum: ['top', 'bottom'],
        order: 3
    }
};
