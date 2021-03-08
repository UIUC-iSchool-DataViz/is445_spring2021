#!/bin/bash
MESSAGE="Auto-commit: $(date)"
REPO_PATH="/Users/jillnaiman/is445_spring2021"
cd $REPO_PATH
git add -A
git commit -m "$MESSAGE"
