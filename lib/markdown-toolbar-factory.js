'use babel';

import MarkdownToolbarView from './markdown-toolbar-view';
import MarkdownToolbarButtonGroupView from './markdown-toolbar-button-group-view';
import MarkdownToolbarButtonView from './markdown-toolbar-button-view';
import MarkdownToolbarDropdownView from './markdown-toolbar-dropdown-view';

function getInstance(type, icon, action) {
    let instance;

    switch(type) {
        case 'toolbar':
            instance = new MarkdownToolbarView();
            break;
        case 'group':
            instance = new MarkdownToolbarButtonGroupView();
            break;
        case 'dropdown':
            instance = new MarkdownToolbarDropdownView(icon);
            break;
        case 'button':
            instance = new MarkdownToolbarButtonView(icon, action);
            break;
    }

    return instance;
}

function getElementInstances(parent, element) {
    const instance = new getInstance(element.type, element.icon, element.action);

    if (element.childs) {
        const childInstances = element.childs.map((childElement) => {
            return getElementInstances(instance, childElement);
        });

        instance.addItems(...childInstances);
    }

    if (parent) {
        parent.addItem(instance);
    }

    return instance;
}

export default (data) => {
    return getElementInstances(null, data);
}
