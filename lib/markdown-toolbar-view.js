'use babel';

import GenericView from './generic-view';

export default class MarkdownToolbarView extends GenericView {

    items: []

    constructor() {
        super();

        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('markdown-toolbar');
        this.element.classList.add('status-bar-right');

        // Observe toolbar size
        atom.config.observe(`markdown-toolbar.size`, (newValue) => {
            this.updateSize(newValue);
        });

        // Observe position change
        atom.config.observe(`markdown-toolbar.position`, (newValue) => {
            this.updatePosition(newValue);
        });

        // Listen file change to toggle toolbar
        if (this.getConfig('autoToggle')) {
            // Observe active editor
            atom.workspace.observeActivePaneItem(editor => {
                if (editor) {
                    const title = editor.getTitle();
                    // Check markdown file
                    title.match(/\.md$/i) ? this.show() : this.hide();
                }
            });
        }
    }

    // Tear down any state and detach
    destroy() {
        this.hide();
        this.element.remove();
    }

    hide() {
        if (this.panel != null) {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.panel.destroy();
            this.panel = null;
        }
    }

    show() {
        this.hide();
        this.updatePosition();
        this.updateSize();
    }

    toggle() {
        if (this.element.parentNode) {
            this.hide();
        } else {
            this.show();
        }
    }

    updatePosition(position) {
        const item = {
            item: this.element
        };

        position = position || this.getConfig('position');

        this.element.classList.remove('top', 'bottom');

        switch (position) {
            case 'top':
                this.panel = atom.workspace.addTopPanel(item);
                break;
            case 'bottom':
                this.panel = atom.workspace.addBottomPanel(item);
                break;
        }

        this.element.classList.add(`${position.toLowerCase()}`);
    }

    updateSize(size) {
        size = size || this.getConfig('size');
        this.element.classList.remove('small', 'medium', 'big');
        this.element.classList.add(size);
    }

}
