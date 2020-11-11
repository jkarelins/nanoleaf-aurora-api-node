const { Router } = require("express");
const router = new Router();
const axios = require("axios");
 

// Route to find new NANO IP
router.get('/', (req, res, next) => {

  var evilscan = require('evilscan');

  var options = {
      target:'192.168.1.2-192.168.1.255',
      port:'16021',
      status:'O', // Timeout, Refused, Open, Unreachable
      // banner:true
  };
  
  var scanner = new evilscan(options);
  
  scanner.on('result',function(data) {
      // fired when item is matching options
      console.log(data);
  });
  
  scanner.on('error',function(err) {
      throw new Error(data.toString());
  });
  
  scanner.on('done',function() {
      // finished !
      res.send({done: true})
  });
  
  scanner.run();
  
})

module.exports = router;


