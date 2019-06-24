var config = require('../bin/config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/server', function(req, res, next) {
  GetCmdData("echo test").then(function(data){res.render('index', { title: data });})
});

module.exports = router;

function GetCmdData(cmd){return new Promise(function(res,rej){
var Client = require('ssh2').Client;
var conn = new Client();
conn.on('ready', function() {
  conn.exec(cmd, function(err, stream) {
    if (err) throw err;
    stream.on('data', function(data) {res(""+data)})
  });}).connect(config.ssh);
});}
