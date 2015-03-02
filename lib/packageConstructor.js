var r = require("requirejs");
r.define(["config/config.js","xmlbuilder"],
function(config,xmlbuilder){
    // TODO Fields !
    // TODO Labels !
    
    //  Parse Diff
    //  Create the structure
    //  Create the XML
    //  Deploy it to target org
    
    var G = function(){
        this.metaDataItem.classes = 'ApexClass';
        this.metaDataItem.triggers = 'ApexTrigger';
        this.metaDataItem.components = 'ApexComponent';
        this.metaDataItem.staticresources = 'StaticResource';
        this.metaDataItem.email = 'EmailTemplate';
        //this.metaDataItem.objects = 'CustomObject';
        //this.metaDataItem.labels = 'CustomLabels';
        //this.metaDataItem.layouts = 'Layout';
        this.metaDataItem.pages = 'ApexPage';
    };
    
    G.prototype.metaDataItem = [];
    
    G.prototype.constructPackage = function(structuredDiffs,cb) {
        var xml = xmlbuilder.create('Package')
                    .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
                    .dec('1.0', 'UTF-8');
        for(var structuredDiff in structuredDiffs) {
            if(this.metaDataItem[structuredDiff] !== undefined) {
                var type = xml.ele('types');
                for(var elem in structuredDiffs[structuredDiff]) if(elem) {
                    var member = type.ele('members');
                    member.t(structuredDiffs[structuredDiff][elem]);
                }
                type.ele('name').t(this.metaDataItem[structuredDiff]);
            }
        }
        cb(null,xml);
    }
    
    return G;
});