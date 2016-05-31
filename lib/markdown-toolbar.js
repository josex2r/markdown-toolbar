'use babel';

import MarkdowntoolbarView from './markdown-toolbar-view';
import MarkdowntoolbarButtonGroupView from './markdown-toolbar-button-group-view';
import MarkdowntoolbarButtonView from './markdown-toolbar-button-view';
import MarkdowntoolbarDropdownView from './markdown-toolbar-dropdown-view';
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

    const headerButtons = [
        new MarkdowntoolbarButtonView('header1', 'markdown-toolbar:size-small'), // # text
        new MarkdowntoolbarButtonView('header2', 'markdown-toolbar:size-medium'), // ## text
        new MarkdowntoolbarButtonView('header3', 'markdown-toolbar:size-big'), // ### text
    ];
    const headerButtonDropdown = new MarkdowntoolbarDropdownView('font');
    headerButtonDropdown.addItems(...headerButtons);

    const textButtons = [
        headerButtonDropdown,
        new MarkdowntoolbarButtonView('bold', 'markdown-toolbar:size-small'), // **text**
        new MarkdowntoolbarButtonView('italic', 'markdown-toolbar:size-medium'), // _text_
    ];
    const textButtonGroup = new MarkdowntoolbarButtonGroupView();
    textButtonGroup.addItems(...textButtons);

    const elementButtons = [
        new MarkdowntoolbarButtonView('quote-right', 'markdown-toolbar:size-big'), // > text
        new MarkdowntoolbarButtonView('code', 'markdown-toolbar:size-big'), // `text`
        new MarkdowntoolbarButtonView('link', 'markdown-toolbar:size-big'), // [text](url)
    ];
    const elementButtonGroup = new MarkdowntoolbarButtonGroupView();
    elementButtonGroup.addItems(...elementButtons);

    const listButtons = [
        new MarkdowntoolbarButtonView('list', 'markdown-toolbar:size-big'), // - text
        new MarkdowntoolbarButtonView('list-ol', 'markdown-toolbar:size-big'), // 1. text
        new MarkdowntoolbarButtonView('tasks', 'markdown-toolbar:size-big'), // - [ ]
    ];
    const listButtonGroup = new MarkdowntoolbarButtonGroupView();
    listButtonGroup.addItems(...listButtons);

    toolbar.addItems(textButtonGroup, elementButtonGroup, listButtonGroup);
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
