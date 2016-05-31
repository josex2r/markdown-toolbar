'use babel';

export default class MarkdownToolbarButtonView {

    constructor() {
        this.items = [];

        // Create root element
        this.element = document.createElement('ul');
        this.element.classList.add('button-group');
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
        this.element.appendChild(newItem.element);
    }

    addItems() {
        [...arguments].forEach(this.addItem.bind(this));
    }

}
