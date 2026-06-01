#!/bin/bash
# push.sh — push the current main branch to origin using the fine-grained PAT.
#
# Usage:  ./push.sh
# (assumes commits are already made on local main via the plumbing pattern;
#  this script just sends them to GitHub)
#
# Returns 0 on success, nonzero on any failure.
# Logs to .claude/work-log.jsonl.
#
# Enforces a 90-second cooldown between consecutive pushes.

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

PAT_FILE=".claude/github-pat.txt"
LAST_PUSH_FILE=".claude/last-push-timestamp"
MIN_COOLDOWN_SEC=90

if [ ! -f "$PAT_FILE" ]; then
  echo "ERROR: PAT file missing at $PAT_FILE" >&2
  exit 2
fi

# Cooldown check
if [ -f "$LAST_PUSH_FILE" ]; then
  LAST_TS=$(cat "$LAST_PUSH_FILE")
  NOW_TS=$(date +%s)
  ELAPSED=$((NOW_TS - LAST_TS))
  if [ "$ELAPSED" -lt "$MIN_COOLDOWN_SEC" ]; then
    WAIT_SEC=$((MIN_COOLDOWN_SEC - ELAPSED))
    echo "Cooldown: waiting ${WAIT_SEC}s before next push..." >&2
    sleep "$WAIT_SEC"
  fi
fi

PAT=$(tr -d '[:space:]' < "$PAT_FILE")
REMOTE="https://x-access-token:${PAT}@github.com/dmf23-ai/ai-environmental-impact-comparisons.git"

# Capture local HEAD before push for logging
LOCAL_SHA=$(git rev-parse HEAD)

# Push main. Redact PAT from any error output.
PUSH_OUTPUT=$(git push "$REMOTE" main 2>&1) || {
  REDACTED=$(echo "$PUSH_OUTPUT" | sed -E "s|x-access-token:${PAT}|x-access-token:[REDACTED]|g")
  echo "ERROR: push failed:" >&2
  echo "$REDACTED" >&2
  exit 1
}

# Record timestamp
date +%s > "$LAST_PUSH_FILE"

echo "OK pushed $LOCAL_SHA"
exit 0
