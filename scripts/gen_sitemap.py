#!/usr/bin/env python3
"""Regenerate sitemap.xml from the pages that actually exist.

Run by the deploy workflow before staging, so adding a project directory is
enough to get it into the sitemap — there is no second list to keep in step.

Every index.html under the repo root becomes a URL, except pages that opt out
with <meta name="robots" content="noindex"> (404.html does). lastmod comes from
the file's last commit that changed more than the ?v= cache buster; changefreq
and priority are omitted deliberately, as Google ignores both.

    python3 scripts/gen_sitemap.py [--check]

--check exits non-zero if the committed sitemap is stale, for local use.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://jackhomer.com"
SKIP_DIRS = {".git", ".github", "node_modules", "_site", "scripts", "assets"}


def pages() -> list[Path]:
    out = []
    for p in sorted(ROOT.rglob("index.html")):
        rel = p.relative_to(ROOT)
        if SKIP_DIRS & set(rel.parts):
            continue
        if 'name="robots" content="noindex"' in p.read_text(errors="ignore"):
            continue
        out.append(p)
    return out


def loc_for(p: Path) -> str:
    rel = p.relative_to(ROOT).parent.as_posix()
    return f"{BASE}/" if rel == "." else f"{BASE}/{rel}/"


# Cache busters on the shared stylesheet/script, e.g. /assets/atlas.css?v=39.
VERSION = re.compile(r"\.(css|js)\?v=\d+")


def _git(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "--literal-pathspecs", *args], cwd=ROOT,
                          capture_output=True, text=True, errors="replace")


def _content(rev: str, rel: str) -> str | None:
    r = _git("show", f"{rev}:{rel}")
    return VERSION.sub(r".\1", r.stdout) if r.returncode == 0 else None


def lastmod(p: Path) -> str:
    """Date of the last commit that changed what the page says.

    Commits that only bump the ?v=NN cache buster touch every page at once;
    counting them would stamp the whole site with that day's date and teach
    Google to ignore lastmod. Each commit is judged by comparing the page with
    its first parent's copy, so merges and reordered lines are counted too.
    """
    rel = p.relative_to(ROOT).as_posix()
    log = _git("log", "--format=%H %cs", "--", rel)
    if log.returncode != 0:
        raise SystemExit(f"git log failed for {rel}: {log.stderr.strip()}")
    for line in log.stdout.splitlines():
        sha, date = line.split()
        if _content(sha, rel) != _content(f"{sha}^", rel):
            return date
    return ""


def build() -> str:
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in pages():
        d = lastmod(p)
        stamp = f"<lastmod>{d}</lastmod>" if d else ""
        lines.append(f"  <url><loc>{loc_for(p)}</loc>{stamp}</url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main() -> int:
    if _git("rev-parse", "--is-shallow-repository").stdout.strip() != "false":
        print("needs full git history for lastmod (checkout fetch-depth: 0)")
        return 1
    xml = build()
    target = ROOT / "sitemap.xml"
    if "--check" in sys.argv:
        current = target.read_text() if target.exists() else ""
        if current != xml:
            print("sitemap.xml is stale — run: python3 scripts/gen_sitemap.py")
            return 1
        print(f"sitemap.xml up to date ({xml.count('<url>')} urls)")
        return 0
    target.write_text(xml)
    print(f"wrote sitemap.xml, {xml.count('<url>')} urls")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
