var apiKeyAuthentication = {};

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ['foo', 'bar', 'baz'];

apiKeyAuthentication.checkForApiKey = function(req, res, next) {
  var key;
  if (req.query['api-key']) {
    key = req.query['api-key'];
  } else if(req.headers['api-key']) {
    key = req.headers['api-key'];
  } else {
    console.error('missing api key');
  }

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
};

apiKeyAuthentication.printHello = function(req, res, next) {
  console.log('Hello');
  next();
};

module.exports = apiKeyAuthentication;