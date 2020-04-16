const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
const mariadb = require('mariadb');
const EventEmitter = require('events').EventEmitter;
const ev = new EventEmitter();
//const keys = JSON.parse(fs.readFileSync('../keys/keyList.json'));
const keys = JSON.parse(process.env['MARIA']);
const pool = mariadb.createPool({
	host:keys.mariadb[0],
	user:'root',
	password:keys.mariadb[1],
	port:3306,
	database:'my_database'
});
//rowDatabase();
async function rowDatabase(){
	let conn;
	let rows; 
	try{
		console.log(rows.length);
		console.log(rows[0].openLimit);

		for(let key in rows[0]){
			console.log(key);
		}
	}catch(err){
		console.log(err);
	}finally{
		if(conn){
			conn.end();
			return rows;
		}
	}
}
var socketCon = false;
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socketCon = true;
	console.log(socketCon);
	ev.on('log',logText=>{
		io.emit('message',logText);
	})
	socket.on('disconnect',()=>{
		console.log('disconnect');
		socketCon = false;
	});
});
function wsLog(logText){
	console.log('log');
	if(socketCon){
		ev.emit('log',logText);	
	}
	time = new Date();
}
http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
var time;
time = new Date();
setInterval(()=>{wsLog(time)},3000)
