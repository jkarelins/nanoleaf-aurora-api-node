const { ACCESS_TOKEN } = process.env;

function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    const RECEIVED_TOKEN = auth[1];
    if (RECEIVED_TOKEN === ACCESS_TOKEN) {
      next();
    } else {
      res.status(401).send({
        message: 'Token is not valid.'
      }).end();
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
}

module.exports = auth;
