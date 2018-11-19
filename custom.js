const {dialog} = require('electron').remote;

const fs = require('fs');
require('jquery-contextmenu');

const myConsole = new require('console').Console(process.stdout, process.stderr);

const sudo = require('sudo-prompt');

var options = {
    name: 'VirtualHosts',
    //icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
};

function listarHosts() {
    alert(require('electron').remote.app.getLocale());

    fs.readdir('.', (err, dir) => {
        for (let filePath of dir) {
            var host = filePath.toLowerCase();

            if (host.search('.html') > 0) {
                host = host.replace('.html', '');
                $("#list_host").append('<li>' + host + '</li>');
            }
        }
    });
}

function salvar() {
    sudo.exec('echo hello', options,
        function (error, stdout, stderr) {
            if (error) throw error;
            console.log('stdout: ' + stdout);
        }
    );
}

function procurar() {
    $("#document_root").val(dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Abrir',
        defaultPath: '/var/www/html'
    }));
}

var arquivo = '/etc/apache2/sites-available/crismoe.net.conf'

//var arquivo = './texto.txt';

function ler() {
    fs.readFile(arquivo, 'utf-8', function (err, data) {
        if (err) throw err;
        $("#texto").html(data);
    });
}

function ler2() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(arquivo)
    });

    lineReader.on('line', function (line) {
        line = line.toLowerCase();

        var str = "";

        if (line.search('serveradmin') > 0) {
            str = line.replace('serveradmin ', '');
            $("#texto").append(str + '<br>');
        }

        if (line.search('servername') > 0) {
            str = line.replace('servername ', '');
            $("#texto").append(str + '<br>');
        }

        if (line.search('serveralias') > 0) {
            str = line.replace('serveralias ', '');
            $("#texto").append(str + '<br>');
        }

        if (line.search('documentroot') > 0) {
            str = line.replace('documentroot ', '');
            $("#texto").append(str + '<br>');
        }

    });
}

$(function () {
    $.contextMenu({
        selector: 'li',
        callback: function (key, options) {
            if (key === 'goto') {
                require('electron').shell.openExternal('https://electronjs.org')
            }
        },
        items: {
            "goto": {name: 'Ir para', icon: 'fa-globe'},
            "edit": {name: "Editar", icon: "edit"},
            "sep1": "---------",
            "delete": {name: "Apagar", icon: "delete"},
        }
    });

    $('.context-menu-one').on('click', function (e) {
        console.log('clicked', this);
    })
});