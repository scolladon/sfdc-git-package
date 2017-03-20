# sfdc-git-package

Create Package.xml and destructiveChangesPre.xml from git diff between two commits

## Getting Started

Works in Unix like system.
Windows is not tested.

### Prerequisites

Git command line is required on the system where the command line is running.

### Installing

```
npm install -g sfdc-git-package
```

or

```
yarn globally add sfdc-git-package
```

## Usage

### Command Line

```
$ sgp -h

  Usage: sgp [options]

  Create Package.xml and destructiveChangesPre.xml from git

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -t, --to [sha]               commit sha to where the diff is done [HEAD]
    -f, --from [sha]             commit sha from where the diff is done [git rev-list --max-parents=0 HEAD]
    -o, --output [dir]           package.xml specific output [./output]
    -a, --api-version [version]  salesforce API version [37.0]
    -r, --repo [dir]             git repository location [./repo]
```

### Module

```
  var sgp = require('sfdc-git-package');

  sgp({
    'to':'', // commit sha to where the diff is done. Default : HEAD
    'from':'', // commit sha from where the diff is done. Default : git rev-list --max-parents=0 HEAD
    'output':'', // package.xml & destructiveChangesPre.xml specific output. Default : ./output
    'apiVersion':'', // salesforce API version. Default : 39.0
    'repo':'' // git repository location. Default : ./repo
  }, console.log);
```


## Built With

* [commander](https://github.com/tj/commander.js/) - The complete solution for node.js command-line interfaces, inspired by Ruby's commander.
* [nodegit-kit](https://github.com/thisconnect/nodegit-kit) - Complementary NodeGit helpers returning native Promises, helps with git commands such as init, add, commit, status, diff.
* [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js) - An XML builder for node.js similar to java-xmlbuilder.

## Versioning

[SemVer](http://semver.org/) is used for versioning.

## Authors

* **Sebastien Colladon** - *Initial work* - [scolladon](https://github.com/scolladon)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
