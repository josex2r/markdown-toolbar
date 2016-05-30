'use babel';

import MarkdowntoolbarView from './markdown-toolbar-view';
import MarkdowntoolbarButtonView from './markdown-toolbar-button-view';
import {
    CompositeDisposable
} from 'atom';

let toolbar, subscriptions;

export function activate() {
    toolbar = new MarkdowntoolbarView();

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

	const buttons = [
		new MarkdowntoolbarButtonView(toolbar, 'comment', 'markdown-toolbar:size-small'),
		new MarkdowntoolbarButtonView(toolbar, 'database', 'markdown-toolbar:size-medium'),
		new MarkdowntoolbarButtonView(toolbar, 'package', 'markdown-toolbar:size-big')
	];
	toolbar.addItems(...buttons);
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
