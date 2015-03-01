var express = require('express');
var glob = require("glob");
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/public/'));



function getPlaylist(filename) {
	var playlist = fs.readdirSync(filename).map(function(child) {

		return {
			name: path.basename(child),
			path: 'music/' + child
		};
	});

	return playlist;
}

app.get('/getList', function (req, res){
	var data = {
		playlist: getPlaylist("public/music")
	}
	console.log(data);

	res.json(data);
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server running at port: ", (process.env.PORT || 3000));
})