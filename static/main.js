const OPERATORS = {
	"<=": "is less than or equal to",
	">=": "is larger than or equal to",
	">": "is larger than",
	"<": "is less than",
	"=": "is equal to",
	"-": "minus",
	"\\+": "plus"
};

var ws = new WebSocket("ws://localhost:8888/websocket");

// ws.onopen = function() {
// 	// speak("Hello");
// }

ws.onmessage = function(e) {
	console.log(e.data)
	var result = formatResult(e.data);
	result = formatWhitespace(result);
	document.getElementById("result").innerHTML = result
	
}

function handleSubmit(e) {
	ws.send(JSON.stringify(e));
}


function formatResult(text) {
	Object.keys(OPERATORS).forEach(key => {
		text = text.replace(new RegExp(key, 'g'), OPERATORS[key]);
	})

	return text;
}

function formatWhitespace(text) {
	return text.replace(new RegExp('\\n', 'g'), '<br>');
}


