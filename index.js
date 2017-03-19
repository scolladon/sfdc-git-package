var program = require('commander');
var orchestrator = require('./lib/orchestrator.js');
var pjson = require('./package.json');


program
	.description(pjson.description)
	.version(pjson.version)
	.option('-t, --to [sha]', 'commit sha to where the diff is done [HEAD]', 'HEAD')
	.option('-f, --from [sha]', 'commit sha from where the diff is done [git rev-list --max-parents=0 HEAD]', '')
	.option('-o, --output [dir]', 'package.xml specific output [./output]', './output')
	.option('-a, --api-version [version]', 'salesforce API version [37.0]', '37.0')
	.option('-r, --repo [dir]', 'git repository location [./repo]', './repo')
	.parse(process.argv);

orchestrator(program);
