require('dotenv').config();
require('console-stamp')(console, { pattern: 'dd/mm HH:MM:ss' });

const express = require('express');
const axios = require('axios');
const evilscan = require('evilscan');
const app = express();
// Production port
// const port = 4000;

// Development port
const port = 5000;
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');

const nanoRoute = require("./routes/nano");
// const scannerRoute = require("./routes/scanner");
// const findNewNanoIp = require('./helpers/nano-search-ip');

const {
  NANO_API_VERS, 
  NANO_TOKEN, 
} = process.env;

global.NANO_URL = '';

app.use(require("cors")());
app.use(require("body-parser").json());
app.use(logger);
app.use('/nano', nanoRoute);
// app.use('/scanner', scannerRoute);

app.get('/home-status', auth, async (req, res, next) => {
  if (!NANO_URL) {
    findIpAndGetStatus(req, res, next);
  } else {
    getHouseStatus(req, res, next);
  }
  // Make more requests and get all home status!
  // Then send to fronend
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// Function to scan networn and found new NanoLeaf IP Address
function findNewNanoIp () {
  return new Promise((resolve, reject) => {
    var resultArr = [];
  
    const options = {
        target:'192.168.1.2-192.168.1.255',
        port:'16021',
        status:'O', // Timeout, Refused, Open, Unreachable
        // banner:true
    };
    
    const scanner = new evilscan(options);
    
    scanner.on('result',function(data) {
      resultArr.push(data);
    });
    
    scanner.on('error',function(err) {
      reject(err);
    });
    
    scanner.on('done',function() {
        resolve(resultArr);
      });
    
    scanner.run();
  });
}

function getHouseStatus(req, res, next) {
  axios.get(`${NANO_URL}/${NANO_API_VERS}/${NANO_TOKEN}/state`)
  .then(nanoRes => {
    res.send({
      nanoleaf: nanoRes.data
    })
  }).catch(err => {
    findIpAndGetStatus(req, res, next);
  });
}

function findIpAndGetStatus(req, res, next) {
  findNewNanoIp().then(newIpArr => {
    NANO_URL = `http://${newIpArr[0].ip}:16021`;
    getHouseStatus(req, res, next);
  }).catch(err => {
    console.log(err);
    next();
  });
}