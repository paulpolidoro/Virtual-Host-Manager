const {Menu} = require('electron');
const electron = require('electron');
const app = electron.app;
const i18n = new (require('./translations/i18n.js'));

const template = [
    {
        label: i18n.__('File'),
        submenu: [
            {label: i18n.__('Close'), role: 'close'},
        ]
    },
    {
        label: i18n.__('Edit'),
        submenu: [
            {label: i18n.__('Undo'), role: 'undo'},
            {label: i18n.__('Redo'), role: 'redo'},
            {label: i18n.__('Cut'), role: 'cut'},
            {label: i18n.__('Copy'), role: 'copy'},
            {label: i18n.__('Paste'), role: 'paste'},
            {label: i18n.__('Select all'), role: 'selectall'}
        ]
    },
    {
        label: i18n.__('Help'),
        submenu: [
            {
                label: i18n.__('About'),
                click() {
                    require('electron').shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);