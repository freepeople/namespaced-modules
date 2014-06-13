'use strict';

var fs = require('fs');
var dir = './tasks/';
var tasks = fs.readdirSync(dir);
var gulp = require('gulp'); //for sublime
// load gulp tasks from directory
tasks.forEach(function (task) {
    require(dir + task);

});