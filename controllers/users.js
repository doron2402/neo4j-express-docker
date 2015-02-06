var usersController = {};

var users = [
    { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

var repos = [
    { name: 'express', url: 'http://github.com/strongloop/express' }
  , { name: 'stylus', url: 'http://github.com/learnboost/stylus' }
  , { name: 'cluster', url: 'http://github.com/learnboost/cluster' }
];

var userRepos = {
    tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

usersController.getAllUsers = function(req, res, next) {
  console.log('return a list of all users');
  res.send(users);
};

usersController.getAllRepos = function(req, res, next){
  console.log('return an array of all repos');
  res.send(repos);
};

usersController.getRepoByUsername = function(req, res, next){
  var name = req.params.name;
  var user = userRepos[name];

  if (user) {
    res.send(user);
  }
  else {
    next();
  }
};

module.exports = usersController;