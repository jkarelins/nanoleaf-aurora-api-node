function findNewNanoIp () {
  return new Promise((resolve, reject) => {
    console.log('was here in Promise')
    var resultArr = [];
    const evilscan = require('evilscan');
  
    const options = {
        target:'192.168.1.2-192.168.1.255',
        port:'16021',
        status:'O', // Timeout, Refused, Open, Unreachable
        // banner:true
    };
    
    const scanner = new evilscan(options);
    
    scanner.on('result',function(data) {
        resultArr.push(data);
        // console.log(data);
    });
    
    scanner.on('error',function(err) {
      reject(err);
    });
    
    scanner.on('done',function() {
        // finished !
        resolve(resultArr);
      });
    
    scanner.run();
  });
}

module.exports = findNewNanoIp;