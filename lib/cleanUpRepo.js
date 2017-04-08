const fs = require('fs');
const path = require('path');

module.exports = function(config,package) {
  let walkSync = dir =>
     fs.lstatSync(dir).isDirectory()
      ? fs.readdirSync(dir).map(f => walkSync(path.join(dir, f)))
      : dir

  const flatten = arr => arr.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
  );

  this.cleanUpRepo = function(){
    let files = walkSync(config.repo+'/src');
    files = flatten(files);

    let flattenPackage = []

    Object.keys(package).forEach(function(key) {
        package[key].forEach(function(el){
          if(el !== 'undefined'){
            flattenPackage.push(el);
          }
        });
    });

    files.forEach(function(file){
      let name = path.parse(file).base.replace(/\.[^/.]+$/, '');
      if(flattenPackage.indexOf(name) === -1){
        fs.unlinkSync(file);
      }
    })
  }
};