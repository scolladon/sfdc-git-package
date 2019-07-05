'use strict';
const fs = require('fs');
const path = require('path');

module.exports = class CleanUpRepo {
  constructor(config,pack) {
    this.config = config;
    this.package = pack;
  }

  cleanUpRepo(){
    const flattenPackage = []
    Object.keys(this.package).forEach(key => {
        this.package[key].forEach(el => {
          if(el !== 'undefined'){
            flattenPackage.push(el);
          }
        });
    });

    flatten(walkSync(this.config.repo+'/src')).forEach(file => {
      const filePath = path.parse(file);
      const name = filePath.dir + '/' + filePath.base
      if(flattenPackage.reduce((p,c) => p && ~name.indexOf(c),true)) {
        fs.unlinkSync(file);
      }
    })
  }
}

const walkSync = dir =>
     fs.lstatSync(dir).isDirectory()
      ? fs.readdirSync(dir).map(f => walkSync(path.join(dir, f)))
      : dir

const flatten = arr => arr.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);