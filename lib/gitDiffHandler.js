'use strict';
const child_process = require('child_process');
const CleanUpRepo = require('./cleanUpRepo');

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
            },
            lines = fullResult.split('\n');
        lines.forEach(line => {
          let context = null;
          if (line.indexOf('D') !== 0) {
            context = diffs['package.xml'];
          } else {
            context = diffs['destructiveChangesPre.xml'];
          }
          let explodedLine = line.split('/');
          if (explodedLine[0].indexOf('src') !== -1 && !explodedLine[explodedLine.length-1].endsWith('.xml')) {
            if (context[explodedLine[1]] === undefined) {
              context[explodedLine[1]] = [];
            }
            let elementName = explodedLine.slice(2).join('/').split('.').slice(0,-1).join('.');
            if(explodedLine[1] == 'aura') {
              elementName = elementName.split('/').shift();
            }
            if(context[explodedLine[1]].indexOf(elementName) === -1) {
              context[explodedLine[1]].push(elementName);
            }
          }
        });
        // TODO handle Custom Object Contents (fields, fieldsets, weblink), workflows and Custom Labels remove
        const cur = new CleanUpRepo(this.config,diffs['package.xml']);
        cur.cleanUpRepo();

        resolve(diffs);
      });
      child.stderr.on("data", data => {
        var buff = Buffer.from(data);
        reject(buff.toString('utf8'));
      });
    });
  }
}