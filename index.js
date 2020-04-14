const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
app.get('/',(req,res)=>{
	//res.send('hello ずら');
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socket.on('message',(msg)=>{
//		console.log(msg);
		io.emit('message',msg);
	});
//	setInterval(sendLog,2000);
});
var count = 0;
function sendLog(){
	io.emit('message',count);
	count++;
}

http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
