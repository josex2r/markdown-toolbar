'use babel';

export default {
    type: 'toolbar',
    childs: [{
        type: 'group',
        childs: [{
            type: 'dropdown',
            icon: 'font',
            childs: [{
                type: 'button',
                icon: 'header1',
                action: 'markdown-toolbar:h1'
            }, {
                type: 'button',
                icon: 'header2',
                action: 'markdown-toolbar:h2'
            }, {
                type: 'button',
                icon: 'header3',
                action: 'markdown-toolbar:h3'
            }]
        }, {
            type: 'button',
            icon: 'bold',
            action: 'markdown-toolbar:bold'
        }, {
            type: 'button',
            icon: 'italic',
            action: 'markdown-toolbar:italic'
        }]
    }, {
        type: 'group',
        childs: [{
            type: 'button',
            icon: 'quote-right',
            action: 'markdown-toolbar:quote'
        }, {
            type: 'button',
            icon: 'code',
            action: 'markdown-toolbar:code'
        }, {
            type: 'button',
            icon: 'link',
            action: 'markdown-toolbar:link'
        }]
    }, {
        type: 'group',
        childs: [{
            type: 'button',
            icon: 'list',
            action: 'markdown-toolbar:list-unordered'
        }, {
            type: 'button',
            icon: 'list-ol',
            action: 'markdown-toolbar:list-ordered'
        }, {
            type: 'button',
            icon: 'tasks',
            action: 'markdown-toolbar:list-task'
        }]
    }]
};
