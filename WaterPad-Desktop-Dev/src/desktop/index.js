var ip1 = "localhost"
var ip = "ws://" + ip1 +":65525"


function android (number){
	var target = document.getElementById("file-target");
	target.classList.toggle("hidden");

	// var target2 = document.getElementById("button-list");
	const sock = new WebSocket(ip);

	var target2 = document.getElementById("button-list");
	target2.classList.toggle("hidden");
		sock.addEventListener('open', function (event){
			sock.send(number);
			sock.addEventListener('message', function (message1){
				let _file = message1.data;
				console.log(_file);
				document.getElementById("File_Textbox").placeholder = _file;
			})
		})
	}



function form_input(){
	const sock = new WebSocket(ip);
	sock.addEventListener('open', function (event){
		var file_1 = document.getElementById("File_Textbox").value;
		console.log(file_1)
		// sock.send((file_1));
		// if (file_1 = "$"){sock.send(file_1_)}
		// else{sock.send(file_1)}
		
		// var target2 = document.getElementById("button-list");
		// target2.classList.toggle("show");	
	})
}




function Settings(){
	// var target2 = document.getElementById("button-list");
	// target2.classList.toggle("show");
	
}