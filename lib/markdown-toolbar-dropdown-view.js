'use babel';

export default class MarkdownToolbarDropdownView {

    constructor(icon) {
        this.items = [];

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

    // Tear down any state and detach
    destroy() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        this.element = null;
    }

    addItem(newItem) {
        this.items.push(newItem);
        // Append child to parent
        this.content.appendChild(newItem.element);
    }

    addItems() {
        [...arguments].forEach(this.addItem.bind(this));
    }

}
