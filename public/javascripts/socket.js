var socket = io.connect('http://localhost:3000');
socket.on('message', function(message) {console.log(message);})
socket.on('update', function(m) {
    document.getElementById('cpu').style.width = m.cpu.usage+"%";
    document.getElementById('ram').style.width = m.ram.usage+"%";
    document.getElementById('mem').style.width = m.mem.p;

    document.getElementById('cpuinfo').textContent = 'cpu  : '+m.cpu.usage+"%";
    document.getElementById('raminfo').textContent = 'ram  : '+m.ram.usage+"%";
    document.getElementById('meminfo').textContent = 'disk : '+m.mem.p;
})
socket.on('console', function(m) {document.getElementById("console").innerHTML+='<br>'+m.split("\n").join("<br>\n");})

function exe(cmd){socket.emit('cmd', cmd)}
var input = document.getElementById("cmd")
input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        (input.value=="clear")?document.getElementById("console").innerHTML="":exe(input.value);
        input.value="";
    }
});
