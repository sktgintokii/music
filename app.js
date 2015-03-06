var express = require('express');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var app = express();

app.use(express.static(__dirname + '/public/'));
app.use(multer({
	dest: './public/music',
	rename: function(fieldname, filename){
		return filename;
	}
}));


function getPlaylist(filename) {
	var playlist = [];
	var p = fs.readdirSync(filename).map(function(child) {

		return {
			name: path.basename(child),
			path: 'music/' + child
		};
	});

	for (var i = 0; i < p.length; i++){
		if (p[i].name[0] !== "."){
			playlist = playlist.concat(p[i]);
		}
	}

	return playlist;
}

app.post('/upload', function (req, res){
	console.log(req.files);
	res.sendfile("public/upload.html");
});

app.get('/getList', function (req, res){
	var data = {
		playlist: getPlaylist("public/music")
	}

	res.json(data);
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server running at port: ", (process.env.PORT || 3000));
})