var r = require("requirejs");
r.define(["child_process", "promise"],
function(child_process, Promise) {

  var spawn = child_process.spawn;

  var G = function(config) {
    this.config = config;

    this.diff = function() {
      return new Promise(function(resolve, reject) {
        var fullResult = '';
        var child = spawn("git", ["diff", "--name-status", config.from, config.to], {
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
              if (explodedLine[0].indexOf('src') !== -1 && !explodedLine[explodedLine.length-1].endsWith('.xml')) {
                if (context[explodedLine[1]] === undefined) {
                  context[explodedLine[1]] = [];
                }
                var elementName = explodedLine.slice(2).join('/').split('.').slice(0,-1).join('.');
                context[explodedLine[1]].push(elementName);
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
  };

  

  return G;
});