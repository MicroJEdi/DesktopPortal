var fs = require('fs'); 
var express = require('express');
var app = express();
var http = require('http').Server(app);

var desktopDir = '/Users/Micro/Desktop/FileSystem/';

app.use(express.static(desktopDir));

app.get('/', function(req, res){
    res.sendFile(desktopDir + 'index.html');
});

app.get('/getPathJason', function(req, res){
	fs.readdir('/Users/Micro/Desktop/', {withFileTypes: false}, (err, items) => {
		//let items = fs.readdirSync('/Users/Orndorf/Desktop/', { withFileTypes: true })
	    //.filter(dirent => dirent.isDirectory())
	    //.map(dirent => dirent.name);
	    console.log(items);

    	res.send(items);
	});
});

app.get(/files/, function(req, res){	
	console.log(decodeURI(req.path).replace("%23","#"));
	fs.readdir(('/Users/Micro/Desktop/'+decodeURI(req.path).replace("%23","#").substring(7)), (err, items) => {
		console.log(err);
		if(err == null)
		{
			console.log(items);
	    	res.send(items);
		}
		else
		{
			//res.sendFile((desktopDir+decodeURI(req.path).replace("%23","#").substring(7)));
			res.send("File, not directory")
		}
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});