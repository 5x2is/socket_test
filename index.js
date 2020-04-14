const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
	//res.send('hello ずら');
	res.sendFile(__dirname+'/index.html');
});
app.listen(PORT,()=>{
	console.log('server listening port:'+PORT);
});
