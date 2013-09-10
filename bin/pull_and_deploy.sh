#!/bin/bash
#Tool to push to Dokku
git fetch
git checkout -b dist
git checkout -- .
git merge origin master
grunt build
git add .
git commit -m "Release $(date +%Y%m%d)"
git push $1 dist
