
function  voucherManagement(app){
  const request = require("request");  
  // comment
  console.log(' #####  Loading  voucherManagement.js########');
    app.get("/useVoucher/:voucherId", 
    function(req,res) {
      var voucherName =    req.params.voucherId.trim().toLowerCase(),records;
      var voucherQuery =
          "Select Id,name,Amount__c, STATE__c from voucher__c where name in ('" +
                      voucherName +
                   "') and state__c = 'available' limit 1"; 
       
        conn.query(voucherQuery)
          .then(function(result){
            if(result.totalSize>=1){ 
              var rec = result.records[0]; 
              return  callAWS(rec.Name,'344');
            } else{ throw 'No records returned';}
          },function (err) {
            throw err;
          }) 
          .then(function(response){
            res.status(200).send(response);
          },function(err){
            throw err;
          }) 
          .catch(function(err){
            res.status(404).send(err);
          });   
    });
      
    var callAWS = function(activeVoucher, accessNumber) {
      var apiGatewayAddress = 'https://b33gn8m7q4.execute-api.us-west-1.amazonaws.com/Prod';
      return new Promise(function(resolve, reject) {
        var amount = activeVoucher.Amount__c,
          reqURL = apiGatewayAddress;
        rechargeBody = {
          "voucher": activeVoucher,
          "accessNumber": accessNumber
        };
        var reqBody = JSON.stringify(rechargeBody);
        request.post(
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
            json: true,
            url: reqURL,
            form: reqBody
          },
          function(error, response, body) {
            if(error){
              reject(error);
            }
            resolve(response); 
          }
        );
      });
  };
 
}

module.exports = voucherManagement(app);