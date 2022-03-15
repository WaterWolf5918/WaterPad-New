/** Adds a notification to the notification list
 * @param {Notification} notification The notification to push onto the notification list
*/
export function pushNotification(notification) {
    /*
        Options to do cool stuff:
        * Add it to an array to use later
        * Idk :=(
    **/
    
}


// $(document).ready(function(){
// 	// document.getElementById('updateNote').className = "Note"; 
// 	// checkVer()
// });

// async function checkVer(){
// 	var version;

// 	$.get(waterpadVersion,(data) =>{
// 		version = data.split('#');

// 		let v1 = $("#WaterPad-Text").text().split('- ');
// 		console.log(version[1] + v1[1]);

// 		if (version[1] > v1[1]){
// 			document.getElementById('updateNote').className = "Note"; 
// 	}});
// 	await sleep(300000);
// document.getElementById('updateNote').className = "hidden";
// }



/** The class for Notifications */
export class Notification {
    buttons = [];
    text = '';
    backgroundColor = [];

    constructor(text, backgroundColor) {
        this.text = text;
        this.backgroundColor = backgroundColor;
    }

    addButton(text, link) {
        this.buttons.push({
            text: text,
            link: link
        });
    }
}