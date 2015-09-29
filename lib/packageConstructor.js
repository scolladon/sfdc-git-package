var r = require("requirejs");
r.define(["config/config.js","xmlbuilder","promise"],
function(config,xmlbuilder,Promise){
    // TODO Fields !
    // TODO Labels !
    var metaDataItem = {
        classes : 'ApexClass',
        trigger : 'ApexTrigger',
        components : 'ApexComponent',
        staticresources : 'StaticResource',
        email : 'EmailTemplate',
        pages : 'ApexPage'
    }
    
    var G = function(){
    };
    
    G.prototype.constructPackage = function(structuredDiffs) {
        return new Promise(function(resolve,reject){
            var xml = xmlbuilder.create('Package')
                        .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
                        .dec('1.0', 'UTF-8');
            for(var structuredDiff in structuredDiffs) {
                if(metaDataItem[structuredDiff] !== undefined) {
                    var type = xml.ele('types');
                    for(var elem in structuredDiffs[structuredDiff]) if(elem) {
                        var member = type.ele('members');
                        member.t(structuredDiffs[structuredDiff][elem]);
                    }
                    type.ele('name').t(metaDataItem[structuredDiff]);
                }
            }
            resolve(xml);
        });
    }
    
    return G;
});