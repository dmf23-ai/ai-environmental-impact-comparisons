#!/usr/bin/env python3
"""
verify-deploy.py — generate the deploy-verification spec for the calling
Claude autonomous session.

The sandbox's proxy blocks ai-environmental-impact-comparisons.vercel.app,
so this script can't actually fetch the live site. Instead it emits a
JSON spec of what to check. The autonomous-mode protocol calls for
Claude-in-Chrome to navigate to the site and run a JS check that matches
this spec.

Usage:
  python verify-deploy.py <expected-commit-sha>
  -> prints a JSON spec to stdout that the caller passes to Chrome JS.
"""
import json
import sys

EXPECTED_CHAPTER_IDS = [
    "the-hour", "the-year", "the-water", "the-trajectory",
    "in-equivalents", "training-vs-inference",
]
PATHS_TO_VERIFY = ["/", "/comparisons/", "/methods/"]

def main():
    sha = sys.argv[1] if len(sys.argv) > 1 else "(unspecified)"
    spec = {
        "expected_commit_sha": sha,
        "site_url": "https://ai-environmental-impact-comparisons.vercel.app",
        "paths": PATHS_TO_VERIFY,
        "home_expected_ids": EXPECTED_CHAPTER_IDS,
        "max_attempts": 6,
        "wait_seconds_between_attempts": 20,
        "instructions_for_claude": (
            "For each path: navigate via Claude in Chrome, "
            "check status, check expected ids on '/'. "
            "Retry up to max_attempts with wait_seconds between."
        ),
    }
    print(json.dumps(spec, indent=2))
    return 0

if __name__ == "__main__":
    sys.exit(main())
