#!/usr/bin/env python3
"""Regenerate sitemap.xml from the pages that actually exist.

Run by the deploy workflow before staging, so adding a project directory is
enough to get it into the sitemap — there is no second list to keep in step.

Every index.html under the repo root becomes a URL, except pages that opt out
with <meta name="robots" content="noindex"> (404.html does). lastmod comes from
the file's own last commit, which is the date Google actually uses; changefreq
and priority are omitted deliberately, as Google ignores both.

    python3 scripts/gen_sitemap.py [--check]

--check exits non-zero if the committed sitemap is stale, for local use.
"""
from __future__ import annotations

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


def lastmod(p: Path) -> str:
    r = subprocess.run(["git", "log", "-1", "--format=%cs", "--", str(p)],
                       cwd=ROOT, capture_output=True, text=True)
    return r.stdout.strip()


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
