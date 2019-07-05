'use strict';
const GitDiffHandler = require('./lib/gitDiffHandler.js');
const PackageConstructor = require('./lib/packageConstructor');
const FileUtils = require('./lib/utils/fileUtils');

module.exports = (config) => {

  return new Promise((resolve, reject) => {

    if(typeof config.to === 'undefined' || config.to === null
    || typeof config.from === 'undefined' || config.from === null
    || typeof config.apiVersion === 'undefined' || config.apiVersion === null
    || typeof config.output === 'undefined' || config.output === null
    || typeof config.repo === 'undefined' || config.repo === null) {
      return reject('Not enough config options');
    }

    const git = new GitDiffHandler(config);
    const pc = new PackageConstructor(config);
    const fu = new FileUtils(config);

    git.diff()
    .then(structuredDiffs=>pc.constructPackage(structuredDiffs))
    .then(filesContent=>fu.writeAsync(filesContent))
    .then(res => {
      resolve(res);
    })
    .catch(err=>reject(err))
  });
};