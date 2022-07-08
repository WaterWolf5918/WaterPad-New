const hostname = self.location.hostname;
const socket = io(`ws://${hostname}:4000`,{
	reconnectionAttempts : 30,
	reconnectionDelay : 259,
});

socket.on('connect', () => { socket.emit('connected', 'Client'); });
socket.on('webRefresh', () => { 
console.log('[Socket] Got Refresh Packet')
socket.emit('webRefresh','ok')
location.reload()
})

window.onload = function() { webBuildBlocks(); }


function appendBlock(i){
	const buttonList = document.getElementById('button-list');
	const b1 = document.createElement('img'); 	// creates a new image element
	b1.setAttribute('src',`image/image-${i}.png`); // sets the images element src
	b1.setAttribute('alt',i); 					// sets the images element alt
	b1.setAttribute('class','button'); 			// sets the images element class
	buttonList.appendChild(b1); 				//appends image to button list
}




function webBuildBlocks() {
	socket.emit('blocks');
	socket.on('blocks',(data) =>{
		const blocks = data;
		for(let i=0;i<blocks;i++) {
			socket.emit('checkImage',`${i}`);
		}
	})
	let list = {bad:[],good:[]}

	socket.on('ImageGood',(image) => {
		list.good.push(`${image} [Good]`)
		appendBlock(image)
	})
	socket.on('ImageBad',(image) => {
		list.good.push(`${image} [Bad]`)
		appendBlock('_f')
	})
	console.log(list)
}

socket.on('disconnect',() => { console.error('Socket disconnected'); });

function apple(button) {
	// let hostname = self.location.hostname
	// let socket = io(`ws://${hostname}:4000`);
	console.log(button);
	socket.on('connect',() => {
		socket.emit('buttonClick', button);
		socket.destroy();
	});
};