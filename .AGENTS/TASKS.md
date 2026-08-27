# Paddle the Bay 2026 — Site / Operations Task Ledger

This file is the durable request ledger for the `bpad26` event-operations site and its corresponding Google Sheet.

Status convention:

- [x] implemented / materially complete
- [ ] requested and still to be implemented or deployed
- [~] partially implemented, researched, or designed but not yet complete in the live system

The live deployment is: https://iarxm.github.io/bpad26/

The repository is: https://github.com/iarxm/bpad26

The native Google Sheet is: https://docs.google.com/spreadsheets/d/1GU4_5E1IZZw8tJIYs9-1P7oSk91mnoZWKKEM4-X_0MA/edit

## 1. Core event-operations system

- [x] Build a full operational site stack for Paddle the Bay 2026.
- [x] Make the site an event-planning / event-control system rather than primarily a promotional site.
- [x] Cover the planned paddle from Malin Beg to Bundoran Boat Quay.
- [x] Treat Saturday 29 August or Sunday 30 August 2026 as selectable event days depending on wind / marine conditions.
- [x] Create an operational control/dashboard view.
- [x] Create route-options coverage.
- [x] Create contingencies coverage.
- [x] Create timing / run-of-show coverage.
- [x] Create waypoint coverage.
- [x] Create safety / emergency coverage.
- [x] Create SOP / NOP coverage.
- [x] Create access / exit point coverage.
- [x] Create AED-location coverage.
- [x] Create emergency-number and emergency-contact coverage.
- [x] Create an equipment / kit list.
- [x] Include backup / redundant kit planning.
- [x] Include a roster / accountability structure while keeping sensitive participant data out of the public site.
- [x] Include an event log structure.
- [x] Include a sources / verification register.

## 2. Spreadsheet as operational source-of-truth / manual control surface

- [x] Create a corresponding spreadsheet for manual operational data entry and updating.
- [x] Match the visual language already established in the Paddle the Bay fundraising workbook: Carlito, restrained grey section bands, compact operational tables, status fields and dashboard-like hierarchy.
- [x] Include dedicated spreadsheet tabs for CONTROL, RUN_OF_SHOW, ROUTE_OPTIONS, WAYPOINTS, HAZARDS, ACCESS_AED, CONTACTS_COMMS, EQUIPMENT, WEATHER_TIDES, SOP_NOP, CONTINGENCIES, ROSTER, EVENT_LOG and SOURCES.
- [x] Convert the operational workbook into a native Google Sheet.
- [x] Set the native Sheet locale/timezone to Ireland / Europe-Dublin.
- [x] Preserve `data/event-plan.json` as the site's public/runtime data model rather than exposing the whole Google Sheet directly.
- [x] Keep sensitive roster/internal-contact information out of `event-plan.json` / public Pages output.
- [x] Include a spreadsheet-export -> `event-plan.json` synchronization script in the repo.
- [ ] Update the Google Sheet with the latest route, timing, command-role, hazard-register and expanded-safety-plan revisions requested on 27 Aug 2026.

## 3. Repository / deployment

- [x] Use the new `iarxm/bpad26` repository instead of the older `bpad` repository.
- [x] Push the event-operations site into `bpad26`.
- [x] Keep `main` as the working source branch.
- [x] Launch the site on GitHub Pages.
- [x] Make the live site available at `https://iarxm.github.io/bpad26/`.
- [x] Configure automatic publishing from `main` through `gh-pages` / GitHub Pages.
- [x] Include `.nojekyll` for static publishing.

## 4. Route design — original requirements

- [x] Represent Malin Beg -> Bundoran Boat Quay as the primary event route.
- [x] Include route alternatives / shortened finishes rather than relying on a single all-or-nothing route.
- [x] Include Teelin as an early bailout / decision point.
- [x] Include Killybegs / Fintra as a northern-sector diversion / shortened-finish concept.
- [x] Include Mullaghmore as an alternative southern-bay control / exit option.
- [x] Include Creevy as a receiving-coast contingency access point.
- [x] Include Bundoran Boat Quay as the finish / extraction point.
- [x] Give special operational attention to St John's Point / Bullockmore.
- [x] Include the Bullockmore cardinal buoy as a St John's navigation reference.
- [x] Explicitly avoid treating headland shortcuts / tidal apexes as casual straight-line routing decisions.
- [x] Make the actual route around St John's conditional on skipper judgement, current chart, tide/stream, sea state and visibility.

## 5. Route-map revisions requested after initial launch

- [ ] Change the default map framing so the whole of Donegal Bay and the entire primary route are visible at once at an appropriate zoom.
- [~] Redesign the primary route geometry so the plotted polyline follows water around the Donegal coastline rather than drawing straight chords through land/headlands. Revised geometry has been designed/researched but is not yet deployed.
- [ ] Update route waypoints/control points as necessary so no displayed route segment crosses a land boundary.
- [ ] Recalculate / update the displayed primary-route distance after the water-only geometry is committed. The revised planning geometry was estimated at roughly 41 km rather than the earlier ~38 km chorded geometry.
- [ ] Check all alternative route polylines for the same land-crossing issue.
- [ ] Make the map retain a useful whole-bay overview when switching between route options, rather than over-zooming to the selected polyline.

## 6. Site-header wording

- [ ] Remove the phrase `- not a navigational tool` from the site-header subtitle line.
- [x] Preserve substantive safety qualification elsewhere in the site / README so removing that particular subtitle wording does not imply that the planning line supersedes current charts or skipper judgement.

## 7. Run of show / launch-time scenarios

- [x] Initial run-of-show tab exists.
- [~] Redesign the launch model so actual paddling can begin anywhere from 06:30 to 09:00 using three planning intervals; specified but not yet deployed.
- [ ] Use the three launch scenarios: 06:30, 07:45 and 09:00.
- [ ] For each launch scenario, show a 7-10 hour possible paddle duration depending on wind / conditions.
- [ ] Show the resulting finish envelope for 06:30 launch: 13:30-16:30.
- [ ] Show the resulting finish envelope for 07:45 launch: 14:45-17:45.
- [ ] Show the resulting finish envelope for 09:00 launch: 16:00-19:00.
- [ ] Explicitly model the first ~25 km as a slow / cruisy coastal phase rather than an aggressive early pace target.
- [ ] Add a ~25 km timing/conditions gate at which remaining ETA is recalculated from actual wind, pace and group condition.
- [ ] Reflect these scenarios both in the Google Sheet and the public site.

## 8. Expanded safety plan

- [x] Existing site and Sheet contain hazard, SOP/NOP, contingency, emergency-comms and equipment safety material.
- [~] A fuller safety-plan architecture has been designed/researched but has not yet been added as its own complete tab/view.
- [ ] Add a dedicated expanded `SAFETY_PLAN` (or equivalently named) Google Sheet tab.
- [ ] Add an expanded safety-plan view/section to the site.
- [ ] Define command hierarchy and decision authority.
- [ ] Define pre-launch safety checks.
- [ ] Define paddler accountability / buddy or pod procedure.
- [ ] Define safety-boat positioning and recovery responsibilities.
- [ ] Define routine on-water headcounts / position reports.
- [ ] Define incident escalation states.
- [ ] Define person-in-water / separated-paddler response.
- [ ] Define casualty recovery / transfer procedure.
- [ ] Define serious medical incident procedure.
- [ ] Define hypothermia / immersion response.
- [ ] Define equipment failure / board failure / paddle failure response.
- [ ] Define safety-boat failure response.
- [ ] Define reduced-visibility / group-control response.
- [ ] Define collision / marine-traffic response.
- [ ] Define lost-comms response and redundant communications.
- [ ] Define route shortening / extraction procedure.
- [ ] Define post-incident accountability / event termination procedure.

## 9. Named event roles

- [ ] Add Carlston as `Safety & Skipper Lead` / final on-water safety authority.
- [ ] Add Carlston to the internal contacts/command structure while leaving his mobile number as a private/manual-entry field unless explicitly provided for private use.
- [ ] Add Barry Sweeney as `Land Contact`.
- [ ] Define Barry Sweeney's land-contact responsibilities: hold float plan, expected timing window, route/access information and shore-side contact/escalation chain.
- [ ] Keep Barry's private mobile number out of the public site unless explicitly authorised.

## 10. AED verification / mapping

- [x] Include initial AED/access entries for Malin Beg, Teelin, Killybegs sector, Bundoran and other route access locations.
- [x] Include the Glencolmcille AED source for Malinbeg / Teelin verification.
- [x] Include Donegal Bay Community First Responders as a regional AED-verification source in the spreadsheet source register.
- [~] Identify an interactive regional AED map suitable for verification: Donegal Bay Community First Responders' AED map. It has been researched but is not yet surfaced prominently in the site.
- [ ] Add a clear link to the verified/regional AED map from the Access/AED section of the site.
- [ ] Add the AED-map link and verification guidance to the updated Google Sheet.
- [ ] Verify the exact cabinet location/access status for each route-relevant public AED shortly before the event.
- [ ] Distinguish public-access / 24-hour AEDs from AEDs accessible only during opening/lifeguard hours where the source provides that distinction.
- [ ] Retain the principle that an event-carried checked AED is preferable to depending solely on an unverified shore cabinet.

## 11. Emergency-services communication plan

- [x] Site includes `112 / 999 -> COAST GUARD`.
- [x] Site includes marine VHF Channel 16.
- [x] Site includes Malin Head MRSC contact details.
- [x] Site includes Bundoran RNLI station contact, distinguished from emergency activation.
- [~] A fuller emergency-call information card has been designed from Irish maritime guidance but is not yet deployed.
- [ ] Add an explicit emergency-services communication card to the site and Sheet.
- [ ] Include `WHO`: Paddle the Bay group / safety boat identity and VHF callsign if assigned.
- [ ] Include `WHERE`: current WGS84 GPS latitude/longitude.
- [ ] Include `WHERE`: nearest named route waypoint / headland / pier as a human-readable secondary location.
- [ ] Include drift direction / movement when relevant.
- [ ] Include `WHAT`: concise nature of the problem / distress.
- [ ] Include `HELP`: assistance required.
- [ ] Include `PEOPLE`: total people involved, number of casualties, number in the water, and consciousness/breathing status where relevant.
- [ ] Include `CONDITIONS`: wind, sea/swell and visibility relevant to rescuers.
- [ ] Include `RESOURCES`: safety boat, first-aid kit, AED, VHF, PLB/beacon or other resources already on scene.
- [ ] Include `INTENT`: holding position, recovering casualty, drifting, or moving toward a named extraction point.
- [ ] Include an immediately readable MAYDAY / PAN-PAN decision cue based on the seriousness/urgency of the situation.
- [ ] Make current GPS position easy for the safety-boat/skipper to read/transmit without translating from a vague map position under stress.

## 12. Hazard register reclassification

- [x] Initial single hazard register exists.
- [~] New two-register classification has been conceptually designed but is not yet deployed.
- [ ] Replace the single public hazard presentation with two clearly separated registers: `SAFETY HAZARDS` and `OPERATIONAL / ROUTE CONSTRAINTS`.

### Safety hazards — intended register

- [ ] Group separation / loss of visual contact.
- [ ] Serious illness / injury / medical event.
- [ ] Immersion / hypothermia / cold exposure.
- [ ] Fatigue severe enough to degrade safe paddling capability.
- [ ] Critical board / paddle / leash or other equipment failure where control/recovery is compromised.
- [ ] Safety-boat mechanical / operational failure.
- [ ] Collision / marine traffic hazard.
- [ ] Visibility degradation severe enough to lose reliable group / escort control.
- [ ] Thunder / lightning.
- [ ] Loss of emergency communications / inability to transmit an accurate position.
- [ ] Difficult casualty extraction where delay meaningfully changes medical risk.

### Operational / route constraints — intended register

- [ ] Tidal acceleration / compression around headlands, principally as a speed / distance / route-choice constraint for this event.
- [ ] Rock geometry around headlands where it mainly forces a wider paddle line.
- [ ] Bullockmore / St John's shoals / rocks / cardinal-buoy geometry as route/time constraints under normal controllable conditions.
- [ ] Wind increase / cross-offshore component where its principal effect is poorer VMG, drift correction and a longer paddle.
- [ ] Muckross / other headland offing requirements.
- [ ] Harbour / pier depth or access constraints.
- [ ] Finish-area / public-event logistics.
- [ ] Safety-boat access inconvenience caused by rocks / close-coast geometry where this remains minor rather than casualty-critical.

### Escalation principle

- [ ] Document that an operational constraint can become a safety hazard when magnitude/context changes. Example: cross-offshore wind is normally a time/VMG problem, but becomes a safety issue if the paddler group can no longer maintain control or the safety boat can no longer reliably recover a paddler.
- [ ] Reflect the user's event-specific judgement that rock/tidal/headland geometry is generally a routing/time issue for this competent team, without deleting the separate possibility that difficult safety-boat casualty access can become safety-relevant during an incident.

## 13. Weather / tide / decision architecture

- [x] Include a weather/tide decision log.
- [x] Include Saturday/Sunday comparison fields.
- [x] Include decision gates before the event and event morning.
- [x] Include marine-warning, wind/gust, sea/swell, visibility and thunder fields.
- [x] Include sunrise/sunset/daylight planning.
- [x] Include tide-reference information with warning that reference-station tide height is not the same as local tidal stream around a headland.
- [ ] Reconcile the weather/wind language with the new two-register model so moderate cross/offshore wind is not automatically presented as a life-safety hazard when it is only increasing paddle time, while preserving a safety escalation threshold for loss of control/recovery margin.

## 14. Equipment / redundancy

- [x] SUP per paddler.
- [x] Spare board planning.
- [x] Primary paddles plus spare paddles.
- [x] PFD / buoyancy-aid planning.
- [x] Leash-system planning.
- [x] Thermal / dry clothing planning.
- [x] Hydration / carbohydrate / electrolyte planning.
- [x] Waterproof VHF redundancy.
- [x] PLB / distress-beacon planning.
- [x] Waterproof mobile-phone backup.
- [x] Safety-craft navigation / communications system.
- [x] Tow / recovery equipment.
- [x] First-aid / trauma kit.
- [x] AED planning.
- [x] Hypothermia kit.
- [x] Printed route / contacts / roster backup.
- [x] Vehicle-key / fuel / driver redundancy.
- [x] Repair kit / pump / hardware backup.

## 15. Privacy / public-vs-crew data separation

- [x] Keep `event-plan.json` as a curated public dataset rather than exposing the whole Sheet.
- [x] Keep participant emergency contacts and medical information out of public Pages.
- [x] Keep internal mobile numbers as manual/private fields.
- [x] Make the Google Sheet the richer crew-facing operational document.
- [ ] Ensure Carlston / Barry role additions follow the same privacy split when deployed.

## 16. Current highest-priority implementation batch

The following is the outstanding batch from the latest user revision and should be treated as the next implementation target:

- [ ] Deploy water-only route geometry and whole-Donegal-Bay map framing.
- [ ] Remove `- not a navigational tool` from the header subtitle.
- [ ] Deploy the 06:30 / 07:45 / 09:00 launch scenarios and 7-10 h finish envelopes.
- [ ] Add the first-25-km cruisy-phase / recalculation logic.
- [ ] Add the expanded full safety-plan tab/view.
- [ ] Add Carlston as Safety & Skipper Lead.
- [ ] Add Barry Sweeney as Land Contact.
- [ ] Surface the verified/regional AED map and improve AED verification status.
- [ ] Add the emergency-services location/problem communication card.
- [ ] Split hazards from route/time constraints.
- [ ] Move headland/tide/rock/shoal constraints and ordinary cross-offshore-drift/time effects into the operational-constraints register.
- [ ] Update the native Google Sheet.
- [ ] Update `data/event-plan.json`.
- [ ] Update the site rendering.
- [ ] Verify GitHub Pages redeploys successfully after the changes.

## 17. Maintenance rule for future agents

When the user makes a new site/operations request:

1. Add the request to this ledger before or alongside implementation.
2. Decompose it into testable items rather than recording only a vague parent request.
3. Mark `[x]` only after the change exists in the actual repo / Google Sheet / live Pages surface as applicable.
4. Use `[~]` where research/design is complete but deployment is not.
5. Never mark a Google-Sheet request complete solely because the equivalent text exists in `event-plan.json`, or vice versa.
6. Preserve the public-vs-private data boundary: public `event-plan.json` must not absorb private roster/contact/medical fields.
7. Recheck live deployment after site changes rather than assuming a successful commit equals a successful Pages deployment.
