var r = require("requirejs");
r.define(["config/config.js","xmlbuilder","promise","./metadata"],
function(config,xmlbuilder,Promise,MetadataHelper){
    
    var G = function(){
    };
    
    var metadata = new MetadataHelper().definition;
    
    G.prototype.constructPackage = function(structuredDiffs) {
        return new Promise(function(resolve,reject){
            var xml = xmlbuilder.create('Package')
                        .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
                        .dec('1.0', 'UTF-8');
            for(var structuredDiff in structuredDiffs) {
                if(metadata[structuredDiff] !== undefined) {
                    var type = xml.ele('types');
                    for(var elem in structuredDiffs[structuredDiff]) if(elem) {
                        var member = type.ele('members');
                        member.t(structuredDiffs[structuredDiff][elem]);
                    }
                    type.ele('name').t(metadata[structuredDiff].xmlName);
                }
            }
            resolve(xml);
        });
    };
    
    // TODO handle destructive change
    
    return G;
});