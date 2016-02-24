var r = require("requirejs");
r.define(["config/config.js", "child_process", "promise"],
function(config, child_process, Promise) {

  var spawn = child_process.spawn;

  var G = function() {};

  G.prototype.pull = function() {
    return new Promise(function(resolve, reject) {
      var child = spawn(config.command, ["pull", "origin", "master"], {
        "cwd": config.repo
      });
      child.on('close', function(code) {
        resolve();
      });
    });
  }

  G.prototype.diff = function() {
    return new Promise(function(resolve, reject) {
      var fullResult = '';
      var child = spawn(config.command, [config.command_arg, config.command_option, config.commitFrom, config.commitTo], {
        "cwd": config.repo
      });
      child.stdout.on('data', function(data) {
        var buff = new Buffer(data);
        fullResult += buff.toString('utf8');
      });
      child.on('close', function(code) {
        var diffs = {
              package : {},
              destructiveChanges : {}
            },
            lines = fullResult.split('\n');
        lines.forEach(function(line) {
          var context = null;
          if (line.indexOf('D') !== 0) {
            context = diffs.package;
          } else if(line.indexOf('D') === 0) {
            context = diffs.destructiveChanges;
          }

          if(context != null) {
            var explodedLine = line.split('/');
            if (explodedLine[0].indexOf('src') !== -1 && explodedLine.length === 3) {
              if (context[explodedLine[1]] === undefined) {
                context[explodedLine[1]] = [];
              }
              context[explodedLine[1]].push(explodedLine[2].split('.')[0]);
            }
          }
        });
        resolve(diffs);
      });
      child.stderr.on("data", function(data) {
        var buff = new Buffer(data);
        reject(buff.toString('utf8'));
      });
    });
  };

  return G;
});