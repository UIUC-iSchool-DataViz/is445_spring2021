auto_commit.sh
=======================================
#!/bin/bash
MESSAGE="Auto-commit: $(date)"
REPO_PATH="/Users/jillnaiman/is445_spring2021"
git -C "$REPO_PATH" add -A
git -C "$REPO_PATH" commit -m "$MESSAGE"
