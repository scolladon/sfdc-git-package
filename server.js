var r = require("requirejs");

r.config({
    nodeRequire: require
});

r(["lib/gitDiffHandler.js","config/config.js","lib/packageConstructor","fs", "promise"], 
function(gitDiff,config,pack,fs,Promise){
    
    var writePackage = function(xml) {
        return new Promise(function(resolve,reject) {
            fs.writeFile(config.package, xml.end({ pretty: true, indent: '  ', newline: '\n' }), function(err) {
                err && reject(err);
                resolve('Check the '+ config.package +' file ;)');
            }); 
        });
    }
    
    var git = new gitDiff();
    var pc = new pack();
    
    git.pull()
    .then(git.diff)
    .then(pc.constructPackage)
    .then(writePackage)
    .catch(function(err){console.log(err)})
    .done(function(res){console.log(res)});
});
