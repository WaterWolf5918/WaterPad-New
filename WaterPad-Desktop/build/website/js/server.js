




let water = true
function apple(button){
	const block = button
	let ip = self.location.hostname
		// alert(ip)
		let ip2 = "ws://" + ip +":3000"
		const sock = new WebSocket(ip2);
		sock.addEventListener('open', function (event){
			sock.send(block)
			sock.close
		})
	}





// 	if (button == 1){
// 		alert("1")
// 	}
// 	else if (button == 2){
// 		alert("2")
// 	}
// 	else if (button == 3){
// 		alert("3")
// 	}
// 	else if (button == 4){
// 		alert("4")
// 	}
// 	else if (button == 5){
// 		alert("5")
// 	}
// 	else if (button == 6){
// 		alert("6")
// 	}
// 	else if (button == 7){
// 		alert("7")
// 	}
// 	else if (button == 8){
// 		alert("8")
// 	}
// 	else if (button == 9){
// 		alert("9")
// 	}
// 	else if (button == 10){
// 		alert("10")
// 		alert(db_button)
// 	}
// 	else{
// 		alert("[Error Code 20] Please Report This On GitHub")
// 	}
// }






/*Error Code 20 
 Button Is Not A Valid Number
*/

