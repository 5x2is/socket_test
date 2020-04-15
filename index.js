const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http);
const mariadb = require('mariadb');
//const keys = JSON.parse(fs.readFileSync('../keys/keyList.json'));
const keys = JSON.parse(process.env['MARIA']);
const pool = mariadb.createPool({
	host:keys.mariadb[0],
	user:'root',
	password:keys.mariadb[1],
	port:3306,
	database:'my_database'
});
rowDatabase();
console.log('end');
function rowDatabase(){
	let conn;
	let rows; 
	try{
		conn = pool.getConnection();
		rows = conn.query('select * from positions');
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
/*
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socket.on('message',(msg)=>{
		io.emit('message',msg);
		rowDatabase(msg).then((rows)=>{
			io.emit('message',JSON.stringify(rows,null));
		});
	});
});
http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
*/
