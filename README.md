# Paddle the Bay 2026 — Event Operations

Crew-facing static operations site for the Malin Beg → Bundoran Boat Quay paddle.

## Run locally

```bash
python -m http.server 8080
# open http://localhost:8080
```

No build process is required. It is GitHub Pages / Netlify / Cloudflare Pages compatible.

## Data model

`data/event-plan.json` is the site's canonical read-only fallback dataset.

The native operational control spreadsheet is maintained separately as a Google Sheet. The workbook copy at `data/event-operations.xlsx` can be refreshed from an export of that Sheet and converted to `data/event-plan.json` with `scripts/sync_from_xlsx.py`.

Keep sensitive `ROSTER` / internal contacts private. Do not publish participant phone numbers, emergency contacts or medical information.

## Safety design

The route map is deliberately a planning line. It does not encode a navigationally authoritative track around St John's Point/Bullockmore or any other headland. A fixed line can be unsafe when wind, swell, tidal stream or visibility changes. The current chart and Safety Lead/skipper decision always override the site.

Emergency activation: 112/999 and ask for Coast Guard; marine distress/calling on VHF Channel 16.

## Spreadsheet update → site update

Export the Google Sheet as XLSX and replace `data/event-operations.xlsx`, then run:

```bash
python scripts/sync_from_xlsx.py
```

This regenerates the operational portions of `data/event-plan.json`. Commit/deploy after review.
