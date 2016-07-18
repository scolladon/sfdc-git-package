var r = require("requirejs");
r.define(function(){
    var G = function(){
    };
    G.prototype.definition = {  
       /*"installedPackages":{  
          "xmlName":"InstalledPackage",
          "children":{  
    
          }
       },*/
       "labels":{  
          "xmlName":"CustomLabels",
          "children":{  
             "customLabels":"CustomLabel"
          }
       },
       "staticresources":{  
          "xmlName":"StaticResource",
          "children":{  
    
          }
       },
       "scontrols":{  
          "xmlName":"Scontrol",
          "children":{  
    
          }
       },
       "components":{  
          "xmlName":"ApexComponent",
          "children":{  
    
          }
       },
       "pages":{  
          "xmlName":"ApexPage",
          "children":{  
    
          }
       },
       "queues":{  
          "xmlName":"Queue",
          "children":{  
    
          }
       },
       "objects":{  
          "xmlName":"CustomObject",
          "children":{  
             "actionOverrides":"ActionOverride",
             "fields":"CustomField",
             "businessProcesses":"BusinessProcess",
             "recordTypes":"RecordType",
             "webLinks":"WebLink",
             "validationRules":"ValidationRule",
             "namedFilters":"NamedFilter",
             "sharingReasons":"SharingReason",
             "listViews":"ListView",
             "fieldSets":"FieldSet",
             "sharingRecalculations":"SharingRecalculation",
             "compactLayouts":"CompactLayout"
          }
       },
       "reportTypes":{  
          "xmlName":"ReportType",
          "children":{  
    
          }
       },
       "reports":{  
          "xmlName":"Report",
          "children":{  
    
          }
       },
       "dashboards":{  
          "xmlName":"Dashboard",
          "children":{  
    
          }
       },
       "analyticSnapshots":{  
          "xmlName":"AnalyticSnapshot",
          "children":{  
    
          }
       },
       "layouts":{  
          "xmlName":"Layout",
          "children":{  
    
          }
       },
       "portals":{  
          "xmlName":"Portal",
          "children":{  
    
          }
       },
       "documents":{  
          "xmlName":"Document",
          "children":{  
    
          }
       },
       "weblinks":{  
          "xmlName":"CustomPageWebLink",
          "children":{  
    
          }
       },
       "quickActions":{  
          "xmlName":"QuickAction",
          "children":{  
    
          }
       },
       "flexipages":{  
          "xmlName":"FlexiPage",
          "children":{  
    
          }
       },
       "tabs":{  
          "xmlName":"CustomTab",
          "children":{  
    
          }
       },
       "customApplicationComponents":{  
          "xmlName":"CustomApplicationComponent",
          "children":{  
    
          }
       },
       "applications":{  
          "xmlName":"CustomApplication",
          "children":{  
    
          }
       },
       "letterhead":{  
          "xmlName":"Letterhead",
          "children":{  
    
          }
       },
       "email":{  
          "xmlName":"EmailTemplate",
          "children":{  
    
          }
       },
       "workflows":{  
          "xmlName":"Workflow",
          "children":{  
             "alerts":"WorkflowAlert",
             "tasks":"WorkflowTask",
             "outboundMessages":"WorkflowOutboundMessage",
             "fieldUpdates":"WorkflowFieldUpdate",
             "rules":"WorkflowRule",
             "emailRecipients":"WorkflowEmailRecipient",
             "timeTriggers":"WorkflowTimeTrigger",
             "actionReferences":"WorkflowActionReference"
          }
       },
       "assignmentRules":{  
          "xmlName":"AssignmentRules",
          "children":{  
    
          }
       },
       "autoResponseRules":{  
          "xmlName":"AutoResponseRules",
          "children":{  
    
          }
       },
       "escalationRules":{  
          "xmlName":"EscalationRules",
          "children":{  
    
          }
       },
       "roles":{  
          "xmlName":"Role",
          "children":{  
    
          }
       },
       "groups":{  
          "xmlName":"Group",
          "children":{  
    
          }
       },
       "postTemplates":{  
          "xmlName":"PostTemplate",
          "children":{  
    
          }
       },
       "approvalProcesses":{  
          "xmlName":"ApprovalProcess",
          "children":{  
    
          }
       },
       "homePageComponents":{  
          "xmlName":"HomePageComponent",
          "children":{  
    
          }
       },
       "homePageLayouts":{  
          "xmlName":"HomePageLayout",
          "children":{  
    
          }
       },
       "objectTranslations":{  
          "xmlName":"CustomObjectTranslation",
          "children":{  
    
          }
       },
       "flows":{  
          "xmlName":"Flow",
          "children":{  
    
          }
       },
       "classes":{  
          "xmlName":"ApexClass",
          "children":{  
    
          }
       },
       "triggers":{  
          "xmlName":"ApexTrigger",
          "children":{  
    
          }
       },
       "profiles":{  
          "xmlName":"Profile",
          "children":{  
    
          }
       },
       "permissionsets":{  
          "xmlName":"PermissionSet",
          "children":{  
    
          }
       },
       "datacategorygroups":{  
          "xmlName":"DataCategoryGroup",
          "children":{  
    
          }
       },
       "remoteSiteSettings":{  
          "xmlName":"RemoteSiteSetting",
          "children":{  
    
          }
       },
       "authproviders":{  
          "xmlName":"AuthProvider",
          "children":{  
    
          }
       },
       "leadSharingRules":{  
          "xmlName":"LeadSharingRules",
          "children":{  
    
          }
       },
       "campaignSharingRules":{  
          "xmlName":"CampaignSharingRules",
          "children":{  
    
          }
       },
       "caseSharingRules":{  
          "xmlName":"CaseSharingRules",
          "children":{  
    
          }
       },
       "contactSharingRules":{  
          "xmlName":"ContactSharingRules",
          "children":{  
    
          }
       },
       "opportunitySharingRules":{  
          "xmlName":"OpportunitySharingRules",
          "children":{  
    
          }
       },
       "accountSharingRules":{  
          "xmlName":"AccountSharingRules",
          "children":{  
    
          }
       },
       "customObjectSharingRules":{  
          "xmlName":"CustomObjectSharingRules",
          "children":{  
    
          }
       },
       "communities":{  
          "xmlName":"Community",
          "children":{  
    
          }
       },
       "callCenters":{  
          "xmlName":"CallCenter",
          "children":{  
    
          }
       },
       "connectedApps":{  
          "xmlName":"ConnectedApp",
          "children":{  
    
          }
       },
       "samlssoconfigs":{  
          "xmlName":"SamlSsoConfig",
          "children":{  
    
          }
       },
       "synonymDictionaries":{  
          "xmlName":"SynonymDictionary",
          "children":{  
    
          }
       },
       "settings":{  
          "xmlName":"Settings",
          "children":{  
    
          }
       },
       "aura":{  
          "xmlName":"AuraDefinitionBundle",
          "children":{  
    
          }
       },
       "SharingRules":{  
          "xmlName":"SharingRules",
          "children":{  
             "sharingTerritoryRules":"SharingTerritoryRule"
          }
       }
    }
    return G;
});