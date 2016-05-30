'use babel';

export default class MarkdownToolbarView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('markdown-toolbar');
        this.element.classList.add('status-bar-right');

        // Create box wrapper
        const boxWrapper = document.createElement('div');
        boxWrapper.classList.add('inline-block', 'text', 'text-info');
        this.element.appendChild(boxWrapper);

        // Create box icon
        const boxIcon = document.createElement('span');
        boxIcon.classList.add('icon', 'icon-package');
        boxWrapper.appendChild(boxIcon);
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

    setPosition(position) {
        atom.config.set('markdown-toolbar.position', position);
        this.updatePosition(position);
    }

    setSize(size) {
        atom.config.set('markdown-toolbar.size', size);
        this.updateSize(size);
    }

    updatePosition(position) {
        const item = {
            item: this.element
        };

        position = position || atom.config.get('markdown-toolbar.position');

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
        size = size || atom.config.get('markdown-toolbar.size');
        this.element.classList.remove('small', 'medium', 'big');
        this.element.classList.add(size);
    }

}
