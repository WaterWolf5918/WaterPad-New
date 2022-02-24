var ip1 = self.location.hostname
var ip = "ws://" + ip1 +":65525"




let water = true
function apple(button){
	const block = button
		// alert(ip)
		const sock = new WebSocket(ip);
		sock.addEventListener('open', function (event){
			sock.send(parseInt(block))
			sock.close
		})
	}
