var r = require("requirejs");

r.define(["lib/gitDiffHandler.js","lib/packageConstructor","lib/utils/fileUtils", "promise"],
function(gitDiff,pack,fileUtils,Promise){

    var execute = function(config) {

        var git = new gitDiff(config);
        var pc = new pack(config);
        var fu = new fileUtils(config);

        git.diff()
        .then(pc.constructPackage)
        .then(fu.writeAsync)
        .catch(function(err){console.log(err)})
        .done(function(res){
            res.forEach(function(name){
                console.log('done ' + name + '.xml')
            });
        });
    }

    return execute;
});
