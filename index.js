var app = require('./app');
var mw = require('./middlewares');
var controllers = require('./controllers');
// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

app.use('/api',
  mw.apiKeyAuthentication.checkForApiKey,
  mw.apiKeyAuthentication.printHello
);

// we now can assume the api key is valid,
// and simply expose the data
app.get('/api/users', controllers.users.getAllUsers);



app.get('/api/repos', controllers.users.getAllRepos);

app.get('/api/user/:name/repos', controllers.users.getRepoByUsername);

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}