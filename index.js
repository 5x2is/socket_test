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
	port:3306
});
async function rowDatabase(queryText){
	let conn;
	try{
		conn = await pool.getConnection();
		const rows = await conn.query(queryText);
		console.log(rows);
	}catch(err){
		console.log(err);
	}finally{
		if(conn){
			return conn.end();
		}
	}
}
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
io.on('connection',(socket)=>{
	socket.on('message',(msg)=>{
		rowDatabase('SHOW DATABASE');
		//io.emit('message',msg);
	});
});

http.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
