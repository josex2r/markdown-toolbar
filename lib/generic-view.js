'use babel';

export default class GenericView {

    constructor() {
        this.items = [];
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

    getConfig(key){
        return atom.config.get(`markdown-toolbar.${key}`);
    }

    setConfig(key, value){
        atom.config.set(`markdown-toolbar.${key}`, value);
    }

}
