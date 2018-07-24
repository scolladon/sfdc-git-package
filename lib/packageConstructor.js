const xmlbuilder = require('xmlbuilder');
const metadata = require('./utils/metadata');

module.exports = function(config) {
  this.constructPackage = structuredDiffs => {
    return new Promise((resolve,reject) => {
      let filesContent = {};
      const sorted_packageType = Object.keys(structuredDiffs).sort();
      sorted_packageType.forEach(packageType => {
        const strucDiffPerType = structuredDiffs[packageType];
        let xml = xmlbuilder.create('Package')
                    .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
                    .dec('1.0', 'UTF-8');
        for(let structuredDiff in strucDiffPerType) {
          if(metadata[structuredDiff] !== undefined) {
            // Handle different type of package.xml build
            let type = xml.ele('types');
            for(var elem in strucDiffPerType[structuredDiff]) if(!!elem) {
                type.ele('members')
                .t(strucDiffPerType[structuredDiff][elem]);
            }
            type.ele('name').t(metadata[structuredDiff].xmlName);
          }
        }
        xml.ele('version')
        .t(config.apiVersion);
        filesContent[packageType] = xml.end({ pretty: true, indent: '  ', newline: '\n' });
      });
      resolve(filesContent);
    });
  };
};