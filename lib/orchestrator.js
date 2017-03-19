var gitDiff = require('./gitDiffHandler.js');
var pack = require('./packageConstructor');
var fileUtils = require('./utils/fileUtils');


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
