

function android (){
	var target = document.getElementById("file-target");
	target.classList.toggle("hidden");



	// var target2 = document.getElementById("button-list");
	var target2 = document.getElementById("button-list");
	target2.classList.toggle("hidden");

}


function form_input(){
	var file_1 = document.getElementById("File_Textbox").value;
	console.log(file_1)
	alert(file_1)
	var target2 = document.getElementById("button-list");
	target2.classList.toggle("show");
	
}



function Settings(){
	var target2 = document.getElementById("button-list");
	target2.classList.toggle("show");
	
}