const gitDiff = require('./lib/gitDiffHandler.js');
const pack = require('./lib/packageConstructor');
const fileUtils = require('./lib/utils/fileUtils');

module.exports = function(config, logger) {

  const git = new gitDiff(config);
  const pc = new pack(config);
  const fu = new fileUtils(config);

  git.diff()
  .then(pc.constructPackage)
  .then(fu.writeAsync)
  .then(function(res){
    if(res){
      res.forEach(function(name){
        logger(name + ' created');
      });
    }
  })
  .catch(function(err){logger(err)})
};