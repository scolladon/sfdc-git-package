var r = require("requirejs");

r.config({
    nodeRequire: require
});

r(["lib/gitDiffHandler.js","config/config.js","lib/packageConstructor","fs"], 
function(gitDiff,config,pack,fs){
    var git = new gitDiff();
    git.pull(function(err){
        if(err) {console.log(err); return;}
        git.diff(function(err,diffs) {
            if(err){console.log(err); return}
            var pc = new pack();
            pc.constructPackage(diffs,function(err, xml){
                if(err) {console.log(err);return;}
                fs.writeFile(config.package, xml.end({ pretty: true, indent: '  ', newline: '\n' }), function(err) {
                    if(err) {console.log(err);}
                    console.log('Check the '+ config.package +' file');
                }); 
            });
        });
    });
   
});
