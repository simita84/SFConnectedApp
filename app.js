
var express = require('express');
var jsforce = require('jsforce');
var PORT 		    = process.env.PORT || 8080
var path = require('path');
var modules          = require('./modules');
var session = require('express-session');
var config           = require("./config")
 
app = express();

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   //.get('/', (req, res) => res.render('pages/index')) 

 
require('./app/route');
app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`); 
  // Connect to Vlocity Org
  //sfServices.connectToSFOrg();
  conn = new jsforce.Connection({
    oauth2 : {
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl       : 'https://login.salesforce.com',
      clientId       : config.clientId,
      clientSecret   : config.clientSecret ,
      redirectUri    : config.redirectUri
    }
  });
  conn.login( config.un, config.pwd, function(err, userInfo) {
     
    if (err) { 
      
      return console.error(err); 
    
    }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
     //conn.instanceUrl
     //conn.accessToken
     //conn.refreshToken
     //conn.describeSObject());
     //conn.describeGlobal());
     
     //conn.oauth2.loginUrl: 'https://login.salesforce.com',
     //conn.oauth2.authzServiceUrl: 'https://login.salesforce.com/services/oauth2/authorize',
     //conn.oauth2.tokenServiceUrl: 'https://login.salesforce.com/services/oauth2/token',
     //conn.oauth2.revokeServiceUrl: 'https://login.salesforce.com/services/oauth2/revoke',
     //conn.oauth2.clientId: '3MVG9sG9Z3Q1Rlbd3c_sjicbWaEJdyAOaaZmwaSxe.M7PT5IE91C.rqZI3EGPsIsUZlUBpNMTkbB36ttltE1A',
     //conn.oauth2.clientSecret: '3842882359057356741',
     //conn.oauth2.redirectUri: 'https://localhost:3000/callback' 
    
    // User property
    //console.log(userInfo);
    //  console.log("User ID: " + userInfo.id);
    //  console.log("Org ID: " + userInfo.organizationId); 
    //console.log("Org ID: " + userInfo.url);
  });
   

});


modules.moduleList.forEach(function(name) {
	console.log("loading Module: " + name);
  	try {
  		require(name);
  	} catch (err) {
  		console.log("Could not load module " + name);
  		console.log("module load err  " + err);  
  	}
});


exports = module.exports = app;