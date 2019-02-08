

function routeHere(app) {
  console.log(' #####  Loading  route.js########');

  var fs = require("fs");

var done = false;
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  app.post("/echo", function(req, res) {
    res.send(req.body);
  });

  app.get("/", function(req, res) {
    //res.send("Welcome To My Project!!!!!");
    res.status(200).json({'response':'Welcome to my project'});
  });
  app.get("/token", function(req, res) {
     res.send({'token':'ATG2033'});
  });

  // frontend routes =========================================================
  // route to handle all angular requests

  app.get("/oauthcallback.html", function(req, res) {
    res.sendfile("./public/oauthcallback.html");
  });

//   app.get("/servlet/servlet.FileDownload", function(req, res) {
//     var fileName = req.query.file;
//     res.sendfile("./public/img/" + fileName + ".jpg");
//   });

  /*
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');


	});
*/
};

 

module.exports = routeHere(app);
