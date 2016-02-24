var r = require("requirejs");

r.config({
    nodeRequire: require
});

r(["lib/gitDiffHandler.js","config/config.js","lib/packageConstructor","fs", "promise"],
function(gitDiff,config,pack,fs,Promise){

    // TODO handle input : repo, branch, commit from, commit to, versions
    // then remove those from config except for default values
    var writePackage = function(fileContent) {
        return new Promise(function(resolve,reject) {
            fs.writeFile(fileContent.fileName + '.xml', fileContent.content, function(err) {
                err && reject(err);
                resolve(fileContent.fileName);
            });
        });
    }

    var writeAsync = function (filesContent){
        var filesContentArray = Object.keys(filesContent).map(function (key) {
            return {
                'fileName' : key,
                'content' : filesContent[key]
            }
        });
        return Promise.all(filesContentArray.map(writePackage));
    }

    var git = new gitDiff();
    var pc = new pack();

    git.pull()
    .then(git.diff)
    .then(pc.constructPackage)
    .then(writeAsync)
    .catch(function(err){console.log(err)})
    .done(function(res){
        res.forEach(function(name){
            console.log('done ' + name + '.xml')
        });
    });
});
