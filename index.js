var gitDiff = require('./lib/gitDiffHandler.js');
var pack = require('./lib/packageConstructor');
var fileUtils = require('./lib/utils/fileUtils');

/*
var config = {
  'to':'', // commit sha to where the diff is done. Default : HEAD
  'from':'', // commit sha from where the diff is done. Default : git rev-list --max-parents=0 HEAD
  'output':'', // package.xml & destructiveChangesPre.xml specific output. Default : ./output
  'apiVersion':'', // salesforce API version. Default : 39.0
  'repo':'' // git repository location. Default : ./repo
}
*/


var orchestrator = function(config) {

  var git = new gitDiff(config);
  var pc = new pack(config);
  var fu = new fileUtils(config);

  git.diff()
  .then(pc.constructPackage)
  .then(fu.writeAsync)
  .then(function(res){
    if(res){
      res.forEach(function(name){
        console.log(name + ' created');
      });
    }
  })
  .catch(function(err){console.error(err)})
}

module.exports = orchestrator;