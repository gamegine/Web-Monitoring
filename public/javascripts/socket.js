var socket = io.connect('http://localhost:3000');
socket.on('message', function(message) {
	console.log(message);
})
socket.on('update', function(m) {
	console.log(m);
document.getElementById('data').textContent = JSON.stringify(m);

document.getElementById('cpu').style.width = m.cpu.usage+"%";
document.getElementById('ram').style.width = m.ram.usage+"%";
document.getElementById('mem').style.width = m.mem.p;


document.getElementById('cpu').textContent = m.cpu.usage+"%";
document.getElementById('ram').textContent = m.ram.usage+"%";
document.getElementById('mem').textContent = m.mem.p;
})
