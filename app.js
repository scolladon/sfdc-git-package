var r = require("requirejs");

r.config({
    nodeRequire: require
});

r(["lib/orchestrator.js","commander","./package.json"],
function(orch,program,pjson){

	program
		.version(pjson.version)
		.option('-b, --branch [name]', 'branch on which the diff is done [master]', 'master')
		.option('-t, --to [sha]', 'commit sha from where the diff is done [HEAD]', 'HEAD')
		.option('-f, --from [sha]', 'commit sha from where the diff is done [git rev-list --max-parents=0 HEAD]', '`git rev-list --max-parents=0 HEAD`')
		.option('-o, --output [dir]', 'package.xml specific output [./output]', './output')
		.option('-a, --api-version [version]', 'salesforce API version [37.0]', '37.0')
		.option('-r, --repo [dir]', 'git repository location [./repo]', './repo')
		.parse(process.argv);

	console.log(program.output);
	orch(program);

	/*
    repo : "./repo",
    branch : "master",
    commitFrom : "eeebc831103252d253601530bf284da8bf1ea710",
    commitTo : "HEAD",
    version : "36.0"
	*/
});