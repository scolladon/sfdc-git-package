var fs = require('fs');

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
				fs.writeFile(config.output + '/' + fileContent.fileName, fileContent.content, 'utf8', function(err) {
					err && reject(err);
					resolve(config.output + '/' + fileContent.fileName);
				});
			});
		}));
	}
};
module.exports = fu;