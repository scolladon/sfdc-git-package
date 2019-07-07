'use strict';
const child_process = require('child_process');
const CleanUpRepo = require('./cleanUpRepo');
const metadata = require('./utils/metadata');

module.exports = class GitDiffHandler {
  constructor(config) {
    this.config = config;
  }
  diff() {
    return new Promise((resolve, reject) => {
      let fullResult = '';
      if(!this.config.from) {
        const firstCommitSHARaw = child_process.spawnSync('git', ['rev-list', '--max-parents=0', 'HEAD'],{
            "cwd": this.config.repo
          }).stdout;
        const firstCommitSHA = Buffer.from(firstCommitSHARaw);
        this.config.from = firstCommitSHA.toString('utf8').trim();
      }
      const child = child_process.spawn("git", ["diff", "--name-status", this.config.from, this.config.to], {
        "cwd": this.config.repo
      });
      child.stdout.on('data', data => {
        let buff = Buffer.from(data);
        fullResult += buff.toString('utf8');
      });
      child.on('close', code => {
        const diffs = {
            'package.xml' : {},
            'destructiveChangesPre.xml' : {}
          }
        fullResult.split('\n').map(line=>line.replace(/-meta.xml$/,''))
        .filter(line=>!line.endsWith('.xml'))
        .filter(line=>line.split('/').some(part=>metadata.hasOwnProperty(part)))
        .forEach(line => {

          const context = line.startsWith('D') ? diffs['destructiveChangesPre.xml'] : diffs['package.xml'];
          const explodedLine = line.split('/');
          let index = -1;
          explodedLine.some(part=>++index && metadata.hasOwnProperty(part))
          context[explodedLine[index]] = context[explodedLine[index]] || new Set();
          
          let elementName = explodedLine[index+1];
          context[explodedLine[1]].add(elementName);
        });
        if(this.config.clean === true) {
          const cur = new CleanUpRepo(this.config,diffs['package.xml']);
          cur.cleanUpRepo();
        }

        resolve(diffs);
      });
      child.stderr.on("data", data => {
        var buff = Buffer.from(data);
        reject(buff.toString('utf8'));
      });
    });
  }
}