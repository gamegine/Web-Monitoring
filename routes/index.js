var config = require('../bin/config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/server', function(req, res, next) {
	Promise.all([GetCmdData(cpu), GetCmdData(ram), GetCmdData(mem)]).then(function(data) {
		var json = {"cpu":JSON.parse(data[0]),"ram":JSON.parse(data[1]),"mem":JSON.parse(data[2])}
		res.render('server', {title:'server '+config.ssh.host,data:json});
        })
});

function GetCmdData(cmd) {
    return new Promise(function(res, rej) {
        var Client = require('ssh2').Client;
        var conn = new Client();
        conn.on('ready', function() {
            conn.exec(cmd, function(err, stream) {
                if (err) throw err;
                stream.on('data', function(data) {res("" + data)})
            });
        }).connect(config.ssh);
    });
}

var cpu ='grep \'cpu \' /proc/stat | awk \'{usage=($2+$4)*100/($2+$4+$5)} END {print "{\\"usage\\":"usage"}"}\''
var ram='free | grep Mem | awk \'{print "{\\"all\\":"$2",\\"used\\":"$3",\\"usage\\":"($3/$2*100)"}"}\''
var mem='df -hl | grep dev/sda1 | awk \'END {print "{\\"size\\":\\""$2"\\",\\"used\\":\\""$3"\\",\\"p\\":\\""$5"\\"}"}\''


module.exports = {router:router,c:GetCmdData,cpu:cpu,ram:ram,mem:mem};
