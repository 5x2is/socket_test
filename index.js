const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
//const keys = JSON.parse(fs.readFileSync('../keys/keyList.json'));
var socketCon = false;
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socketCon = true;
	socket.on('disconnect',()=>{
		socketCon = false;
	});
});
function wsLog(logText){
	if(socketCon){
		io.emit('message',logText);
	}
}
http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
var time = 0;
