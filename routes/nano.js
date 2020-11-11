const { Router } = require("express");
const router = new Router();
const axios = require("axios");

const auth = require("../middleware/auth");

const {
  NANO_API_VERS, 
  NANO_TOKEN, 
} = process.env;

router.put('/', auth, (req, res, next) => {
  const { urlToFitApi, dataToSend } = req.body;
  if (urlToFitApi && dataToSend) {
    axios.put(`${NANO_URL}/${NANO_API_VERS}/${NANO_TOKEN}/${urlToFitApi}`, dataToSend)
      .then(nanoRes => {
        res.send({
          nanoleafOn: true
        });
      }).catch(next);
  } else {
    res.status(400).send({
      message: 'Please, check your request'
    })
  }
});

module.exports = router;