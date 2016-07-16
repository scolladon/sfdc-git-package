var r = require("requirejs");

r.define(["fs", "promise"],
function(fs,Promise){
	var fu = function(config){
		this.writeAsync = function (filesContent){
			var filesContentArray = Object.keys(filesContent).map(function (key) {
				return {
				'fileName' : key,
				'content' : filesContent[key]
				}
			});
			return Promise.all(filesContentArray.map(function(fileContent) {
				return new Promise(function(resolve,reject) {
					fs.writeFile(config.output + '/' + fileContent.fileName + '.xml', fileContent.content, function(err) {
						err && reject(err);
						resolve(fileContent.fileName);
					});
				});
			}));
		}
	};
  return fu;
});