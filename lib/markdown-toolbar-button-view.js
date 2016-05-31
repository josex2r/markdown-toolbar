'use babel';

import GenericView from './generic-view';

export default class MarkdownToolbarButtonView extends GenericView {

    constructor(icon, action) {
        super();

        this.action = action;

        // Create root element
        this.element = document.createElement('li');
        this.element.classList.add('button');

        // Create icon
        const iconElement = document.createElement('span');
        iconElement.classList.add('fa', `fa-${icon}`);
        this.element.appendChild(iconElement);

        this.element.addEventListener('click', this._onClick.bind(this));
    }

    _onClick(e) {
        atom.commands.dispatch(this.element.parentNode, this.action);
    }

    // Tear down any state and detach
    destroy() {
        this.element.removeEventListener('click', this._onClick.bind(this));
        super.destroy();
    }

}
