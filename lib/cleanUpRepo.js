const fs = require('fs');
const path = require('path');

module.exports = function(config,package) {
  let walkSync = function(dir) {
    return fs.lstatSync(dir).isDirectory()
      ? fs.readdirSync(dir).map(f => walkSync(path.join(dir, f)))
      : dir;
  }
  let deepFlatten = function(arr) {
    return flatten(           // return shalowly flattened array
      arr.map(x=>             // with each x in array
        Array.isArray(x)      // is x an array?
          ? deepFlatten(x)    // if yes, return deeply flattened x
          : x                 // if no, return just x
      )
    )
  }

  let flatten = function(arr) {
    return [].concat(...arr)
  }

  this.cleanUpRepo = function(){
    let files = walkSync(config.repo+'/src');
    files = deepFlatten(files);

    let flattenPackage = []

    Object.keys(package).forEach(function(key) {
        package[key].forEach(function(el){
          if(el !== 'undefined'){
            flattenPackage.push(el);
          }
        });
    });

    console.log(flattenPackage)

    files.forEach(function(file){
      let name = path.parse(file).base.replace(/\.[^/.]+$/, '');
      if(flattenPackage.indexOf(name) === -1){
        fs.unlinkSync(file);
      }
    })
  }
};