const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
const mariadb = require('mariadb');
//const keys = JSON.parse(fs.readFileSync('../keys/keyList.json'));
const keys = JSON.parse(process.env['MARIA']);
mariadb.createConnection({
	host:keys.mariadb[0],
	user:'root',
	password:keys.mariadb[1],
	port:3306
}).then(conn=>{
	conn.query('select 1',[2]).then(rows=>{
		console.log(rows);
		conn.end;
	})
}).catch(err=>{
	console.log(err);
	console.log('error');
})
/*
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socket.on('message',(msg)=>{
		io.emit('message',msg);
	});
});
var count = 0;
function sendLog(){
	io.emit('message',count);
	count++;
}

http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
*/
