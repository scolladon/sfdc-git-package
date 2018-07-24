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

  this.cleanUpRepo = () => {
    let files = walkSync(config.repo+'/src');
    files = flatten(files);

    let flattenPackage = []

    Object.keys(package).forEach(key => {
        package[key].forEach(el => {
          if(el !== 'undefined'){
            flattenPackage.push(el);
          }
        });
    });

    files.forEach(file => {
      let filePath = path.parse(file);
      //let name = filePath.base.replace(/\.[^/.]+$/, '').replace(/\..*\-meta/,'');
      let name = filePath.dir + '/' + filePath.base
      let found = false;
      for(let i = flattenPackage.length - 1 ; i >= 0 ; --i) {
        if(name.indexOf(flattenPackage[i]) !== -1) {
          found = true;
          break;
        }
      }
      if(!found) {
        fs.unlinkSync(file);
      }
    })
  }
};