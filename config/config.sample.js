var r = require("requirejs");
r.define({
    command : "git",
    arg : "diff --name-status",
    repo : "repo",
    package : "package.xml",
    branch : "master",
    commitFrom : "Start",
    commitTo : "End"
    /*
        cd config.repo
        git clone yourrepo
        git config core.quotepath off
        git config core.autocrlf true
        git config i18n.logoutputencoding utf8
        git config --unset svn.pathnameencoding

    */
});