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
	console.log('connected');
});
http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
