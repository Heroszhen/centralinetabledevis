#! /bin/bash
#push to github

git add -A 
git commit -m "maj"
git push origin master

if [ -n "$1" ]
then
    if [ $1 = "archive" ]
    then
        ng build --prod
    fi
fi
