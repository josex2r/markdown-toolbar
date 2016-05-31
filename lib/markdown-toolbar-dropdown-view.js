'use babel';

import GenericView from './generic-view';

export default class MarkdownToolbarDropdownView extends GenericView {

    constructor(icon) {
        super();

        // Create root element
        this.element = document.createElement('li');
        this.element.classList.add('button', 'dropdown');

        // Create icon
        const iconElement = document.createElement('span');
        iconElement.classList.add('fa', `fa-${icon}`);
        this.element.appendChild(iconElement);

        // Create dropdown content
        this.content = document.createElement('ul');
        this.content.classList.add('dropdown-content');
        this.element.appendChild(this.content);
    }

    addItem(newItem) {
        this.items.push(newItem);
        // Append child to parent
        this.content.appendChild(newItem.element);
    }

}
