'use babel';

export default class MarkdownToolbarButtonView {

    constructor(panel, icon, action) {
        this.panel = panel;
        this.action = action;

        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('button');

        // Create icon
        const iconElement = document.createElement('span');
        iconElement.classList.add('icon', `icon-${icon}`);
        this.element.appendChild(iconElement);

        this.element.addEventListener('click', this._onClick.bind(this));
    }

    _onClick(e) {
        atom.commands.dispatch(this.panel.element, this.action);
    }

    // Tear down any state and detach
    destroy() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        this.element.removeEventListener('click', this._onClick.bind(this));
        this.element = null;
    }

}
