const gitDiff = require('./lib/gitDiffHandler.js');
const pack = require('./lib/packageConstructor');
const fileUtils = require('./lib/utils/fileUtils');

module.exports = function(config, logger) {

  if (typeof config.diff === 'undefined' || config.diff === null) {
    if (!(
          typeof config.to === 'undefined' || config.to === null
          || typeof config.from === 'undefined' || config.from === null
        )
    ) {
      config.diff = '' + config.from + '..' + config.to;
    }
  }

  if(typeof config.diff === 'undefined' || config.diff === null
  || typeof config.apiVersion === 'undefined' || config.apiVersion === null
  || typeof config.output === 'undefined' || config.output === null
  || typeof config.repo === 'undefined' || config.repo === null) {
    logger('Not enough config options');
    return;
  }

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