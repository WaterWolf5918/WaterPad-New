const hostname = self.location.hostname;
const socket = io(`ws://${hostname}:4000`,{
	reconnectionAttempts : 2,
	reconnectionDelay : 259,
});

socket.on('connect', () => { socket.emit('connected', 'Client'); });
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
		console.log(blocks);
		for(let i=0;i<blocks;i++) {
			console.log(`${i}: ${blocks-1}`);
			socket.emit('checkImage',`${i}`);
		}
	})
	socket.on('ImageGood',(image) => {
		console.log(`${image} : Good`)
		appendBlock(image)
	})
	socket.on('ImageBad',(image) => {
		console.log(`${image} : Bad`)
		appendBlock('_f')
	})
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