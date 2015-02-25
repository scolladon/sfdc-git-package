var r = require("requirejs");
r.define(["config/config.js","child_process"],
function(config,child_process){
    // TODO string replace %27
    var spawn = child_process.spawn;
    
    var G = function(){};
    
    var diffs = {};
    
    G.prototype.pull = function(cb) {
        var child = spawn(config.command, ["pull", "origin" ,"master"], {"cwd":config.repo});
        child.on('close', function (code) {
            cb();
        });
        child.stderr.on("data", function (data) {
            cb(new Buffer(data).toString('utf8'));
        });
        child.stdout.on('data', function (data) {
        });
    }
    
    G.prototype.diff = function(cb) {
        var fullResult = '';
        var child = spawn(config.command, ["diff", "--name-status", config.commitFrom, config.commitTo], {"cwd":config.repo});
        child.stdout.on('data', function (data) {
            var buff = new Buffer(data);
            fullResult += buff.toString('utf8');
        });
        child.on('close', function (code) {
            constructDiff();
            cb(null,diffs);
        });
        child.stderr.on("data", function (data) {
            var buff = new Buffer(data);
            cb(buff.toString('utf8'));
        });
        
        var constructDiff = function(){
            var lines = fullResult.split('\n');
            for(var i = 0 ; i < lines.length ; ++i) {
                var line = lines[i];
                if(line.indexOf('D') !== 0) {
                    var explodedLine = line.split('/');
                    if(explodedLine[0].indexOf('src') !== -1 && explodedLine.length === 3) {
                        if(diffs[explodedLine[1]] === undefined) {
                            diffs[explodedLine[1]] = [];
                        }
                        diffs[explodedLine[1]].push(explodedLine[2].split('.')[0]);
                    }
                }
            } 
        }
    };
    
    return G;
});