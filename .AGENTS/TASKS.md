# Paddle the Bay 2026 — Site / Operations Task Ledger

This is the durable request ledger for the `bpad26` event-operations site and its corresponding Google Sheet.

Status:
- [x] implemented / materially complete in the relevant live surface
- [~] implemented in planning form or partially complete, with a material verification/audit step still outstanding
- [ ] requested and still outstanding

Live site: https://iarxm.github.io/bpad26/  
Repository: https://github.com/iarxm/bpad26  
Native Google Sheet: https://docs.google.com/spreadsheets/d/1GU4_5E1IZZw8tJIYs9-1P7oSk91mnoZWKKEM4-X_0MA/edit

## 1. Chronological request history from the project thread

### Initial event-operations build
- [x] Build a full Paddle the Bay 2026 event-operations website rather than only a promotional/fundraising page.
- [x] Build a corresponding spreadsheet for manual entry/control in the visual style of the existing fundraising workbook.
- [x] Cover route options, contingencies, times, waypoints, safety/emergencies, SOP/NOP, AED/access exits, emergency contacts, equipment and backup kits.
- [x] Make Malin Beg / Silver Strand → Bundoran Boat Quay the primary event concept.
- [x] Treat Saturday 29 August / Sunday 30 August 2026 as conditions-dependent candidate event days in the initial plan.
- [x] Give particular attention to tidal/headland geometry and St John's Point.
- [x] Include Bullockmore West Cardinal as a shared St John's control reference.
- [x] Include route shortening / bailout concepts: Teelin, Killybegs/Fintra and receiving-coast alternatives.
- [x] Keep actual route/offing conditional on current chart, conditions and skipper judgement.

### Spreadsheet / repository architecture
- [x] Create the event-operations workbook with dedicated operational tabs.
- [x] Convert the workbook into a native Google Sheet.
- [x] Set Sheet locale/timezone to Ireland / Europe-Dublin.
- [x] Move the project from the older `bpad` repo to `iarxm/bpad26`.
- [x] Keep `data/event-plan.json` as the curated public runtime data model.
- [x] Keep private roster/medical/internal phone information out of the public Pages dataset.
- [x] Include a spreadsheet-export → JSON sync utility.
- [x] Launch the static site on GitHub Pages.
- [x] Configure automatic `main` → `gh-pages` → Pages publishing.

### First live-site refinement batch
- [x] Zoom/frame the route map so the whole Donegal Bay operating area and route are visible.
- [~] Replace misleading land-crossing/simple chord geometry with a water-oriented planning route; final marine-chart/event-day track verification remains mandatory.
- [ ] Independently water-audit and plot exact alternative B/C/D geometries.
- [x] Remove the `- not a navigational tool` wording from the header/subtitle while retaining substantive skipper/current-chart qualification elsewhere.
- [x] Redesign the run of show so actual paddling can start at three intervals from 06:30–09:00.
- [x] Use launch scenarios 06:30 / 07:45 / 09:00.
- [x] Give each launch a 7–10 h duration envelope.
- [x] Show finish envelopes 13:30–16:30 / 14:45–17:45 / 16:00–19:00.
- [x] Explicitly treat the first ~25 km as slow/cruisy rather than an early pace target.
- [x] Add a ~25 km ETA/conditions recalculation gate.
- [x] Add a dedicated expanded Safety Plan to both site and Sheet.
- [x] Add Carlston as Safety & Skipper Lead / final on-water safety-navigation authority.
- [x] Add Barry Sweeney as Land Contact / float-plan and shore escalation lead.
- [x] Keep Carlston/Barry private phone numbers off the public site.
- [x] Find and surface a regional AED map for route-area verification.
- [x] Add an emergency-services information card explaining what to communicate and how to state position.
- [x] Add MAYDAY / PAN-PAN urgency cues.
- [x] Add a browser/device geolocation helper showing WGS84 coordinates and nearest listed waypoint.
- [x] Split the old single hazard register into `Safety hazards` and `Operational / route constraints`.
- [x] Put ordinary headland/tide/rock/shoal routing effects in the operational-constraints register when their effect is mainly extra distance/time/access inconvenience.
- [x] Put ordinary wind increase / cross-offshore drift in operational constraints when its effect is mainly VMG/time.
- [x] Document escalation: an operational constraint becomes a safety hazard when group control, reliable recovery, communications or another required margin is lost.
- [x] Treat routine safety-boat access inconvenience around rock/shore geometry as an operational constraint unless it materially delays casualty access.

### Durable project management
- [x] Create `.AGENTS/TASKS.md`.
- [x] Use `[x]`, `[~]`, `[ ]` status semantics.
- [x] Require future agents to update this ledger with new requests.
- [x] Require completion status to reflect actual Sheet/repo/live deployment rather than merely drafted content.
- [x] Verify that site changes propagate through the GitHub Pages pipeline.

### Route optimisation requests
- [x] Add the route chart itself to the site.
- [x] Optimise route distance by using the shortest useful chords after clearance rather than tracing every bay/coast contour.
- [x] Avoid steering unnecessarily toward headland apexes where a paddler could enter close-in tidal dynamics.
- [x] Retain Bullockmore as a useful common St John's reference because dropping it saves little practical distance.
- [x] Revise the initially very offshore route closer to land to improve extraction/support proximity.
- [x] Use a `coastal-access-balanced` concept: comparatively near the northern coast, outward only around exposed/headland/shoal/tidal sectors, then efficient bay crossing.
- [x] Update the primary planning distance to approximately 38.5 km for the current closer-coast geometry.
- [~] Primary route control coordinates are planning geometry; Carlston/current chart/event-day observations still determine actual offing and shallow-water/tidal clearance.

## 2. Core site stack
- [x] Static HTML/CSS/JS site with no build requirement.
- [x] Leaflet / OpenStreetMap operational route view.
- [x] Control dashboard.
- [x] Route-options view.
- [x] Run-of-show view.
- [x] Dedicated Safety Plan view.
- [x] Separate Hazards / Constraints view.
- [x] Access / AED view.
- [x] Emergency / Comms view.
- [x] Equipment view.
- [x] Sources / verification view.
- [x] Responsive/mobile presentation.
- [x] Restrained professional visual language compatible with the fundraising workbook style.
- [x] Whole-bay map framing retained when switching route concepts.
- [x] Static route chart displayed below the interactive map.

## 3. Google Sheet operational control surface
- [x] `CONTROL`.
- [x] `RUN_OF_SHOW`.
- [x] `ROUTE_OPTIONS`.
- [x] `WAYPOINTS`.
- [x] `HAZARDS`.
- [x] `ACCESS_AED`.
- [x] `CONTACTS_COMMS`.
- [x] `EQUIPMENT`.
- [x] `WEATHER_TIDES`.
- [x] `SOP_NOP`.
- [x] `SAFETY_PLAN`.
- [x] `CONTINGENCIES`.
- [x] `ROSTER`.
- [x] `EVENT_LOG`.
- [x] `SOURCES`.
- [x] Carlito / compact operational formatting.
- [x] Updated primary route and current distance.
- [x] Updated launch scenarios / finish envelopes.
- [x] Updated hazard/constraint classification.
- [x] Updated Carlston / Barry roles.
- [x] Updated emergency call-card information.
- [x] Updated regional AED map/source links.
- [x] Updated SOP/NOP language so ordinary drift/time cost is separated from loss of safety margin.

## 4. Current primary route — Route A
- [x] Start: Silver Strand / Malin Beg.
- [x] Use nearer-shore coastal-access controls during the northern phase.
- [x] Keep useful proximity to the Teelin extraction sector without requiring the route to enter the pier.
- [x] Move outward for Muckross/headland clearance rather than aiming at the apex.
- [x] Use Bullockmore West Cardinal as the St John's control reference.
- [x] Use the efficient open-bay chord after Bullockmore.
- [x] Transition through a Bundoran outer approach before Boat Quay.
- [x] Current planning distance ≈38.5 km.
- [~] Planning coordinates must be checked against current marine chart / tidal stream / sea state before event-day navigation.
- [ ] Record final event-day route/offing after Carlston's chart/conditions review.

### Current Route A control sequence
- [x] WP01 — Silver Strand / Malin Beg.
- [x] CA01 — Malin Beg sea-room point.
- [x] CA02 — Slieve League coastal corridor 1.
- [x] CA03 — Slieve League / Teelin coastal corridor 2.
- [x] CA04 — Teelin outer access corridor.
- [x] CA05 — Muckross west/south offing.
- [x] CA06 — Muckross east / St John's approach.
- [x] WP04 — Bullockmore West Cardinal.
- [x] CA07 — Bundoran outer approach.
- [x] WP09 — Bundoran Boat Quay.

## 5. Alternative / shortened routes
- [x] Route B concept: Bullockmore → Mullaghmore → Bundoran.
- [x] Route C concept: shortened Killybegs / Fintra finish.
- [x] Route D concept: early Teelin finish.
- [x] Hide misleading alternative polylines until individually audited.
- [ ] Audit Route B water-only geometry / distance.
- [ ] Audit Route C water-only geometry / distance.
- [ ] Audit Route D water-only geometry / distance.
- [ ] Re-enable plotted alternative polylines only after audit.

## 6. Run of show / pacing
- [x] 06:30 launch scenario, 13:30–16:30 finish envelope.
- [x] 07:45 launch scenario, 14:45–17:45 finish envelope.
- [x] 09:00 launch scenario, 16:00–19:00 finish envelope.
- [x] Use relative timing after launch instead of hard-coding downstream clock times.
- [x] First ~25 km deliberately cruisy.
- [x] ~25 km pace / conditions / ETA recalculation.
- [x] Update Barry with changed ETA / route / extraction plan.
- [x] Keep full 7–10 h envelope dependent on wind/VMG/group state.
- [ ] Enter final chosen launch scenario on event day.

## 7. Expanded Safety Plan
### Command
- [x] Carlston — Safety & Skipper Lead.
- [x] Carlston controls final launch, actual route/offing, continuation, diversion, recovery and termination.
- [x] Barry Sweeney — Land Contact.
- [x] Barry holds float plan, launch/finish envelope, accountability state, extraction/AED list and shore escalation chain.

### Pre-launch
- [x] Roster / pod / buddy accountability.
- [x] Safety-boat fuel/mechanical/recovery check.
- [x] Chart/plotter/GPS check.
- [x] Primary + backup VHF check.
- [x] Event AED / first aid / hypothermia kit check.
- [x] Spare board / paddles / repair capability.
- [x] Exit / driver / vehicle chain.
- [x] Float plan to Barry.

### Normal operations
- [x] Lead / sweep / pod structure.
- [x] Headcount after major gates/stops/issues.
- [x] Predictable safety-boat support position.
- [x] Cruisy first ~25 km.
- [x] Fuel/hydrate by elapsed time.
- [x] Barry position / decision updates.

### Incident states
- [x] GREEN normal operations.
- [x] AMBER operational constraint/minor incident.
- [x] RED loss of control/recovery margin / serious incident.

### Emergency / abnormal procedures
- [x] Separated paddler / person in water.
- [x] Casualty recovery / transfer.
- [x] Serious medical event.
- [x] Immersion / hypothermia.
- [x] Board / paddle / leash failure.
- [x] Safety-boat failure.
- [x] Reduced visibility / group-control loss.
- [x] Collision / marine traffic.
- [x] Lost emergency communications.
- [x] Route shortening / extraction.
- [x] Event termination / final accountability.

## 8. Safety hazards
- [x] Group separation / loss of visual control.
- [x] Serious illness / injury / medical event.
- [x] Immersion / hypothermia.
- [x] Fatigue severe enough to degrade capability.
- [x] Critical board / paddle / leash failure.
- [x] Safety-boat failure.
- [x] Collision / marine traffic.
- [x] Visibility loss severe enough to lose control.
- [x] Thunder / lightning.
- [x] Loss of emergency communications / accurate position.
- [x] Casualty extraction delay.

## 9. Operational / route constraints
- [x] Tidal acceleration / compression around headlands.
- [x] Rock geometry forcing route / safety-boat inconvenience.
- [x] Bullockmore / St John's shoal/cardinal geometry.
- [x] Wind increase / cross-offshore component as VMG/time cost while controllable.
- [x] Muckross / headland offing requirements.
- [x] Harbour / pier depth/access.
- [x] Finish-area/public-event logistics.
- [x] Routine safety-boat access inconvenience near coast.
- [x] Explicit safety escalation threshold when control/recovery margin is lost.

## 10. Emergency services / communications
- [x] `112 / 999 → COAST GUARD`.
- [x] VHF Channel 16.
- [x] Malin Head MRSC contact.
- [x] Bundoran RNLI station contact distinguished from emergency activation.
- [x] MAYDAY cue for grave/imminent danger.
- [x] PAN-PAN cue for urgent but not presently grave/imminent situations.
- [x] WHO field.
- [x] WHERE — WGS84 latitude/longitude.
- [x] WHERE — nearest named waypoint/headland/pier.
- [x] Drift/movement if relevant.
- [x] WHAT.
- [x] HELP.
- [x] PEOPLE / casualties / people in water / consciousness-breathing as relevant.
- [x] CONDITIONS.
- [x] RESOURCES already on scene.
- [x] INTENT.
- [x] Browser/device `Use this device's position` helper.
- [x] Nearest listed waypoint calculation.
- [ ] Confirm safety-boat VHF callsign / working channel if one will be used.
- [ ] Print / laminate an offline emergency card for the crew.

## 11. AED / extraction planning
- [x] Regional Donegal Bay Community First Responders AED map surfaced.
- [x] Explain public-access / restricted-hours AED distinction.
- [x] Malin Beg locality AED verification entry.
- [x] Teelin locality AED verification entry.
- [x] Killybegs / Island House AED verification entry.
- [x] Bundoran Main Beach seasonal/lifeguard AED entry.
- [x] Bundoran Boat Quay / RNLI finish interface.
- [x] Creevy receiving-coast option.
- [x] Mullaghmore alternative option.
- [x] Retain event-carried checked AED as preferred rather than relying exclusively on shore cabinets.
- [ ] Re-verify exact cabinet locations / access / service status immediately before event.
- [ ] Enter actual event AED custodian/location in crew Sheet.
- [ ] Confirm vehicle rendezvous / landing practicality for each intended extraction point.

## 12. Equipment / redundancy
- [x] SUP per paddler + backup board.
- [x] Primary paddles + spares.
- [x] PFD / buoyancy aids.
- [x] Appropriate leash systems.
- [x] Thermal / dry equipment.
- [x] Carbohydrate / hydration / electrolyte reserve.
- [x] Redundant waterproof VHF.
- [x] PLB / satellite distress beacon.
- [x] Waterproof phone backup.
- [x] Current chart / plotter / GPS.
- [x] Tow / recovery lines + cutting tool.
- [x] First-aid / trauma kit.
- [x] Checked event AED.
- [x] Hypothermia kit.
- [x] Printed route / contacts / roster / emergency card.
- [x] Vehicle key / fuel / driver redundancy.
- [x] Repair / pump / fin-leash hardware.

## 13. Weather / tide / decision architecture
- [x] Marine warning check.
- [x] Wind / gust / direction review.
- [x] Sea / swell / visibility review.
- [x] Thunder/lightning veto.
- [x] Tide reference / headland-stream distinction.
- [x] Event-day final decision.
- [x] Moderate manageable wind/drift treated as operational time/VMG issue rather than automatically a life-safety hazard.
- [x] Safety veto retained when wind/sea removes group control or reliable recovery.
- [ ] Enter final event-day actuals / observations.
- [ ] Record final selected St John's/Bullockmore line.

## 14. Privacy / public vs crew data
- [x] Public site uses curated `event-plan.json`.
- [x] Private roster/medical fields remain out of public Pages.
- [x] Carlston / Barry names and roles may be public operational information.
- [x] Carlston / Barry mobile numbers remain crew-only unless explicitly authorised otherwise.
- [x] Google Sheet remains richer than public site.
- [x] Public device-position helper calculates locally in the user's browser; it does not require storing the user's position in `event-plan.json`.

## 15. Deployment / verification
- [x] `iarxm/bpad26` is canonical repo.
- [x] `main` is working source branch.
- [x] GitHub Pages enabled.
- [x] Automatic publish workflow exists.
- [x] `.nojekyll` present.
- [x] Previous deployment pipeline verified end-to-end.
- [x] Current expanded timing/safety/route changes pushed to `main` and Pages.
- [ ] Inspect live mobile and desktop presentation after each substantive revision batch and log defects here.

## 16. Known outstanding work before latest revision
- [ ] Exact marine-chart/event-day validation of Route A offing and shallow-water/tidal clearance.
- [ ] Route B exact water-only geometry audit.
- [ ] Route C exact water-only geometry audit.
- [ ] Route D exact water-only geometry audit.
- [ ] Event-day AED cabinet/service/access re-verification.
- [ ] Final crew names/numbers/callsigns/working channel in private Sheet.
- [ ] Final driver / vehicle / rendezvous assignment.
- [ ] Final weather/tide/visibility observations.
- [ ] Final launch scenario.
- [ ] Final float-plan issue to Barry.
- [ ] Printed/offline crew pack.

## 17. Maintenance rule for future agents
1. Add each new site/operations request to this ledger before or alongside implementation.
2. Preserve original operational intent, not merely latest wording.
3. Decompose requests into testable items.
4. Mark `[x]` only when the change exists in the relevant actual surface: repo, Google Sheet and/or live Pages.
5. Use `[~]` where implementation is a planning approximation or still needs real-world verification/audit.
6. Do not mark a Sheet request complete merely because an equivalent exists in `event-plan.json`, or vice versa.
7. Preserve the public/private data boundary.
8. For route changes, distinguish planning geometry from event-day navigation and retain skipper/current-chart authority.
9. Recheck the Pages workflow/live site after substantive site changes.
10. Prefer small coherent commits during active revision so the live site can be inspected incrementally.

## 18. Sunday operationalisation + live-site simplification batch — requested 27 Aug 2026

### A. Event day
- [ ] Change the working paddle day from Saturday-preferred to **Sunday 30 August 2026** throughout the operational site data.
- [ ] Change the Control dashboard day indicator to Sunday.
- [ ] Change the Google Sheet control/day fields to Sunday.
- [ ] Preserve weather/conditions as final GO/HOLD/NO-GO authority even though Sunday is the scheduled day.

### B. Actions at the very beginning / before water launch
- [ ] Add a prominent `BEFORE WATER` / `START ACTIONS` checklist to the Operations dashboard.
- [ ] Require a formal whole-team safety/route/comms brief before water launch.
- [ ] Activate live-location sharing with BCC / designated shore recipients before launch.
- [ ] Confirm the land side can actually see the live-location feed before launch.
- [ ] Initiate communications with Barry Sweeney as Lead on Land before launch.
- [ ] Send Barry the selected route, launch time, expected finish envelope and current accountability state.
- [ ] Establish Barry as the land recipient for scheduled waypoint reports.
- [ ] Confirm the event AED is present/checked before water launch.
- [ ] Confirm primary + backup communications before water launch.
- [ ] Confirm the first planned waypoint/reporting gate before launch.

### C. Land-contact / waypoint reporting protocol
- [ ] Define a standard check-in with Barry at each operational reporting waypoint.
- [ ] Each waypoint report should include waypoint/name, time, group status, current position, conditions, revised ETA and any route/extraction change.
- [ ] Add a northern-leg midpoint reporting waypoint approximately halfway between the Teelin/Slieve League sector and St John's/Bullockmore.
- [ ] Add an open-bay midpoint reporting waypoint approximately halfway between Bullockmore and the receiving-coast/Bundoran approach.
- [ ] Mark communication/reporting waypoints distinctly on the route map.
- [ ] Integrate waypoint-to-Barry reporting into Run of Show / normal operations.
- [ ] Add reporting-waypoint fields to the Google Sheet.

### D. Equipment additions
- [ ] Add USB battery packs / power banks to the equipment inventory.
- [ ] Add waterproof phone cases/pouches to the equipment inventory.
- [ ] Treat charged battery packs as part of the pre-launch communications check.
- [ ] Treat waterproof phone protection as required for phones relied on for tracking/comms/navigation backup.
- [ ] Add the same items to the Google Sheet equipment tab.

### E. Google Sheet + shared live-location links
- [ ] Add a clear link from the public operations site to the native Event Operations Google Sheet.
- [ ] Add a clear link to the selected live-location-sharing service.
- [ ] Use Google Maps Location Sharing as the initial service unless the crew deliberately chooses another provider.
- [ ] Add a placeholder/config field for the actual event live-location share URL/recipient setup created before launch.
- [ ] Avoid publishing a private tracking link permanently if it gives live access beyond the intended recipients.
- [ ] Add the tracking-service / event-share fields to the crew Google Sheet.

### F. Alternative exits / beaches
- [ ] Expand the exit strategy beyond the current pier/harbour list to include suitable beaches/shore access points.
- [ ] Add Muckross Trá Bán as a candidate shore extraction point subject to event-day landing assessment.
- [ ] Keep Muckross Trá na nGlór differentiated from Trá Bán because access/sea behaviour differs.
- [ ] Add Fintra Beach as a candidate Killybegs-sector extraction point.
- [ ] Add St John's Point / Coral Beach (Trabane/St John's beach sector) as a candidate land extraction/support point, with landing practicality verified before reliance.
- [ ] Keep St John's lighthouse/road end as a land-support reference even where it is not a guaranteed water landing.
- [ ] Add Mullaghmore Harbour as an alternative extraction point.
- [ ] Add Mullaghmore beach/shore access as an additional alternative subject to sea state.
- [ ] Add suitable receiving-coast exits on the Mullaghmore → Bundoran strip.
- [ ] Include Tullan Strand as a receiving-coast contingency but flag that it is not a routine safe swimming beach and landing suitability is sea-state dependent.
- [ ] Include Bundoran Main Beach as a receiving-coast contingency subject to rocks/reef/shorebreak and local assessment.
- [ ] Retain Creevy Pier as a road-accessible receiving-coast option.
- [ ] Retain Bundoran Boat Quay as preferred finish/extraction.
- [ ] Add source/verification notes for each exit.
- [ ] Clearly distinguish `candidate extraction` from `verified event-day extraction`.

### G. AED / exit visual map
- [ ] Add an interactive map directly to the AED / Exits page.
- [ ] Plot route-relevant AED verification points where coordinates are known.
- [ ] Plot candidate exit / extraction points on the same map.
- [ ] Visually distinguish AED, beach/shore exit, harbour/pier exit, land-support-only reference and finish.
- [ ] Preserve the external Donegal Bay CFR AED map link as a verification source.
- [ ] Make the map fit the full operational area without hiding the Donegal Bay relationship.

### H. Site navigation regrouping
- [ ] Reorganise operational tabs into `1 CONTROLS`, `2 EMERGENCY`, and `3 OTHER` groups.
- [ ] `CONTROLS`: Control / Route / Inventory.
- [ ] `EMERGENCY`: Emergency Comms / AED + Exits / Safety Risk Inventory.
- [ ] `OTHER`: Run of Show / Weather / Sources and other lightweight operational references.
- [ ] Keep the core monitoring surfaces as the primary **Operations Dash**.
- [ ] Reduce tab clutter on the operations surface.

### I. Documentation separation
- [ ] Move detailed Safety Plan content out of the primary operational tab row into a separate `Documentation` area.
- [ ] Move detailed SOP/NOP/EAP material into `Documentation`.
- [ ] Keep concise actionable safety controls on the Operations Dash.
- [ ] Add a clear Operations ↔ Documentation navigation mechanism.
- [ ] Documentation should remain easy to open without dominating the real-time operating interface.
- [ ] Preserve full safety detail rather than deleting it during simplification.

### J. Weather forecasting / GPT update surface
- [ ] Add a dedicated Weather tab to the site.
- [ ] Design the Weather tab for rapid updates while the paddle is underway.
- [ ] Include links to multiple authoritative sources rather than a single consumer forecast.
- [ ] Include Met Éireann Sea Area Forecast.
- [ ] Include Met Éireann warnings.
- [ ] Include Marine Institute Irish weather/data buoy observations.
- [ ] Include a coastal/local observations source where useful.
- [ ] Include fields for timestamp, source, wind direction/speed/gust, sea/swell, visibility, precipitation/thunder and trend.
- [ ] Include an operational interpretation field: continue / monitor / reassess / shorten / hold / abort.
- [ ] Include a compact prompt/template that can be given to GPT to refresh the weather picture from authoritative sources while underway.
- [ ] Make clear that a GPT/weather summary supports rather than replaces Carlston's on-water observation and decision authority.
- [ ] Add corresponding structure to the Google Sheet `WEATHER_TIDES` tab or a dedicated weather-update area.

### K. Incremental implementation / deployment workflow for this batch
- [x] Record this entire revision in `.AGENTS/TASKS.md` before implementation.
- [ ] Implement in small coherent batches rather than one opaque final rewrite.
- [ ] Commit each material batch separately to `main`.
- [ ] Allow the existing main→gh-pages workflow to rebuild Pages after each batch.
- [ ] Verify Pages deployment after material batches.
- [ ] Update `[x]/[~]/[ ]` statuses as each surface actually lands.
