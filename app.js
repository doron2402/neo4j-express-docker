//Set Global
if (!global.__base) {
  global.__base = __dirname + '/';
}

var express = require('express');

module.exports = express();
