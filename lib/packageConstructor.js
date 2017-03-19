var xmlbuilder = require('xmlbuilder');
var metadata = require('./utils/metadata');

var G = function(config){
  this.config = config;
  this.constructPackage = function(structuredDiffs) {
    return new Promise(function(resolve,reject){
      var filesContent = {};

      var sorted_packageType = Object.keys(structuredDiffs).sort();

      for(var packageType in structuredDiffs) if(Object.keys(structuredDiffs[packageType]).length  > 0 ) {
        var strucDiffPerType = structuredDiffs[packageType];
        var xml = xmlbuilder.create('Package')
                    .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
                    .dec('1.0', 'UTF-8');
        for(var structuredDiff in strucDiffPerType) {
          if(metadata[structuredDiff] !== undefined) {
            // Handle different type of package.xml build
            var type = xml.ele('types');
            for(var elem in strucDiffPerType[structuredDiff]) if(elem) {
                type.ele('members')
                .t(strucDiffPerType[structuredDiff][elem]);
            }
            type.ele('name').t(metadata[structuredDiff].xmlName);
          }
        }
        xml.ele('version')
        .t(config.apiVersion);
        filesContent[packageType] = xml.end({ pretty: true, indent: '  ', newline: '\n' });
      }
      resolve(filesContent);
    });
  };
};

module.exports = G;