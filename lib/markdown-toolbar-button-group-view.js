'use babel';

import GenericView from './generic-view';

export default class MarkdownToolbarButtonView extends GenericView {

    constructor() {
        super();

        // Create root element
        this.element = document.createElement('ul');
        this.element.classList.add('button-group');
    }

}
