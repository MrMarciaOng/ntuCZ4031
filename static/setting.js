var ws = new WebSocket("ws://localhost:8888/websocket");

ws.onmessage = function(e) {
	var result = e.data;	
	$("#result").css("display", "");
	document.getElementById("result").innerHTML = result;	
}

function handleSubmit(e) {
	ws.send(JSON.stringify(e));
}