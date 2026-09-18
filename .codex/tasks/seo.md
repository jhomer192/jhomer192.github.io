# Personal and project SEO — 2026-09-18

## Accepted plan
Preserve live production content, improve all 11 app landing pages with visible initial HTML and reciprocal links, strengthen portfolio navigation and personal-work connections, then verify builds and desktop/mobile interactions. Prepare local commits only; publishing requires final approval.

## Baseline
Search Console read directly in the signed-in browser on 2026-09-18. Performance chart covers 2026-07-27 through 2026-09-16: 57 impressions, 5 clicks, 8.8% CTR, average position 10.9. All 5 clicks went to the homepage. The displayed queries included “jack homer” (1 click/10 impressions) and “wikipedia link finder” (0/1); query totals are incomplete because Search Console withholds some queries.

Indexing report: 28 indexed, 11 discovered/currently not indexed (the 11 app URLs), 1 crawled/currently not indexed (projects/color-analysis). Both sitemaps successful: 29 portfolio URLs and 11 apps. Nine app entry documents contained no meaningful initial body text. This does not establish the cause of Google's indexing choices.

Production portfolio baseline: develop 781d8d0, 16 commits ahead of main b889012; local main fast-forwarded to preserve deployed content. No deployment workflow changes requested.

## Review adjustments
Keep all landing copy visible without JavaScript. Preserve editor viewport layout while allowing access to copy; allow clearance for fixed bottom navigation. Avoid globally shortest-path guarantees and absolute privacy claims. Preserve app/write-up self-canonicals and existing query/hash routing.

## Measurement after publication
Use the existing authenticated browser to compare equal 28-day periods: name-query performance, project impressions/clicks, and app indexing. Record actual observations rather than promise ranking or indexing. No scheduled automation or external posting is part of this change.

## Implementation and validation
Implemented static landing content across all 11 apps and contextual portfolio links, clearer project action labels, distinct write-up titles, and removal of stale Tabletop Portal counts. Preserved current production content in every repository. Three independent reviewers examined the plan and the work; identified duplicate title, preview base-path, and no-JavaScript layout issues were fixed and rechecked.

All ten configured app builds passed; Sticker Maker is plain HTML/JavaScript and passed syntax checks. Unit tests: Wikipedia Solver 28, Meme Generator 29, Songrank 12, Tabletop Portal 6 — 75 total passing. Applicable lint/type checks passed except existing failures in untouched components: WikiGame has five setState-in-effect errors; Nuzlocke has four hook/compiler errors. Existing warnings remain in some repositories. No lint rules or tests were removed.

Browser checks cover each app at 1440px and 390px with JavaScript on and off (44 combinations). Initial Sticker Maker checks raced its pre-existing first-install service-worker reload; repeat checks passed both with the service worker disabled and, separately, with it active after reload. Songrank was rebuilt with NEXT_PUBLIC_BASE_PATH=/songrank; final preview assets return 200 and styling is correct. Meme's no-JavaScript empty mount is zero height while the active editor remains viewport-sized. Every app has readable content, no horizontal overflow, valid JSON-LD, one correct self-canonical, a description, and links to its project write-up.

Interaction checks: Connections current/legacy creation and sharing URLs plus malformed payloads; WikiGame daily game start; Birthday simulation; Game of Life controls; Meme upload/caption/PNG download; Nuzlocke persisted run and hash route; Clocktower player creation; Songrank setup navigation; Sticker Maker upload/erase with active service worker; Tabletop Portal game details. No live Spotify authorization or external game session was initiated.

Portfolio: 30 HTML entry pages checked for metadata, headings, structured data and local links; desktop/mobile navigation and chart/list toggle passed with no page errors or overflow. JavaScript syntax and git diff whitespace checks passed. Sitemap regenerated after the content commit so lastmod matches repository history; deploy-time generation is unchanged.

## App commits (local main, not published)

| Repository | Commit |
| --- | --- |
| connections-maker | `de684f9` |
| wikipedia-game-solver | `8bd2a41` |
| wikigame | `0b7f68e` |
| birthday-paradox | `5f4bb38` |
| game-of-life | `970b6a3` |
| meme-generator | `b4033f4` |
| nuzlocke-tracker | `ee45069` |
| clocktower | `bed7363` |
| songrank | `8f06e1e` |
| polygon-stickers | `b850e93` |
| board-game-portal | `ca9fe13` |

## Publication boundary (superseded by authorization below)
No commits have been pushed and no site has been deployed. The accepted plan reserved publication for final approval. When authorized, check remote heads for concurrent changes before publishing. Six apps have Pages workflows supporting main (Connections, WikiGame, Game of Life, Nuzlocke, Clocktower, Songrank); the other apps use branch-based/static publication and must follow their own Pages configuration. Never run deploy scripts as a test. Verify actual deployed HTML and app behavior afterward; then use Search Console directly for measurement. Do not ask Jack to export analytics.

## Authorized publication — 2026-09-18
Jack explicitly authorized pushing and deploying all prepared changes and prioritized the bare-name query “Jack Homer.” Publish current source/artifacts, verify every live app and portfolio page, inspect the homepage in Search Console and request indexing after deployment, and check existing identity links. Do not claim or guarantee a #1 ranking. No outreach messages are authorized.

## Published and verified — 2026-09-18
The portfolio and all 11 applications are published. Every app returns HTTP 200 with the new static guide and correct self-canonical; referenced local styles/scripts load. Live portfolio desktop/mobile checks pass with working chart/list navigation, no horizontal overflow, and no page errors. Source changes and generated artifact publications preserved remote work. Public GitHub profile already names Jack Homer and links to jackhomer.com; all 11 project READMEs now explicitly link the author name to the personal homepage. App sitemap lastmod dates now match the actual 2026-09-18 content changes.

Successful deployment runs:
- Portfolio: 35402946662
- Connections Maker: 35402913010
- Wikipedia Game Solver: 35402942950
- WikiGame: 35402917819
- Birthday Paradox: 35402965998
- Game of Life: 35402997815
- Meme Generator: 35402970934
- Nuzlocke Tracker: 35402947910
- Clocktower: 35402932735
- Songrank: 35402935352
- Sticker Maker: 35402940408
- Tabletop Portal: 35402965215

Search Console exact-query baseline for “jack homer” (2026-07-27–2026-09-16): 1 click, 10 impressions, 10% CTR, average position 21.5. This is a small historical sample, not a new ranking measurement. Homepage inspection says “URL is on Google”; the live test passed with “URL is available to Google” and “Page can be indexed.” Manual indexing requests failed twice with Google's “Oops! Something went wrong” / “We had a problem submitting your indexing request. Please try again later.” No successful queue submission is claimed. Existing successful sitemaps remain available for normal discovery; Google controls recrawl timing and rankings.

Author-link source commits:
- connections-maker: `01ca388`
- wikipedia-game-solver: `a2757cb`
- wikigame: `d286e2d`
- birthday-paradox: `8931677`
- game-of-life: `c1c7ad6`
- meme-generator: `39d4b28`
- nuzlocke-tracker: `a9ed90f`
- clocktower: `f57ba09`
- songrank: `6bab3be`
- polygon-stickers: `b41c3db`
- board-game-portal: `615336b`
