// TODO handle Custom Object Contents and Custom Labels remove
const git = require('nodegit-kit');

module.exports = function(config) {

  this.diff = function() {
    return new Promise(function(resolve, reject) {
      git.open(config.repo)
      .then(function(repo){
        return git.log(repo, { sort: 'reverse' })
        .then(function(history){
          if(!config.from) {
            config.from = history[history.size()-1];
          }
          return git.diff(repo, config.from, config.to);
        })
        .then(function(diffs){
          let structuredDiffs = {
            'package.xml' : {},
            'destructiveChangesPre.xml' : {}
          };

          diffs.forEach(function(aDiff) {
            let context = null;
            if (aDiff.status !== 'deleted') {
              context = structuredDiffs['package.xml'];
            } else {
              context = structuredDiffs['destructiveChangesPre.xml'];
            }
            const explodedLine = aDiff.path.split('/');
            if (explodedLine[0].indexOf('src') !== -1 && !explodedLine[explodedLine.length-1].endsWith('.xml')) {
              if (context[explodedLine[1]] === undefined) {
                context[explodedLine[1]] = [];
              }
              const elementName = explodedLine.slice(2).join('/').split('.').slice(0,-1).join('.');
              context[explodedLine[1]].push(elementName);
            }
          });
          resolve(structuredDiffs);
        });
      });
    });
  };
};