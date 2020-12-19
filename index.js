var express = require('express');
var app = express();
const fs = require('fs');
const nunjucks = require('nunjucks');
const { exec } = require("child_process");

// Enable HTML template middleware
//app.engine('html', require('ejs').renderFile);

nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');

// Enable static CSS styles
app.use(express.static('static'));

app.use('/apps', express.static('apps'))

app.get('/', function (req, res) {
	var files = fs.readdirSync('apps')
	var barhtml = ""
	var apparray = []
	files.forEach(file => {
		//barhtml += '<a href="#"><img width="60" src="/apps/'+file+'/icon.png"></a>';
		apparray.push(file);
	})

	//var sidebarhtml = encodeURIComponent(barhtml);

	res.render('index.html', {apps:apparray});
});

// start chrome
exec("chrome/chrome-linux/chrome --app=http://localhost:9000/ --start-maximized &", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

var server = app.listen(9000, function () {
	var port = server.address().port;
	console.log('Webserver listening on port ', port);
  
});