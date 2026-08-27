function softLeadLabel(value){
  const v=String(value??'');
  if(/Barry Sweeney/i.test(v)) return 'Barry';
  if(/Carlston/i.test(v)) return 'Carlston';
  return v.replace(/\blead\b/ig,'team').replace(/\s{2,}/g,' ').trim();
}

function softOperationalText(value){
  return String(value??'')
    .replace(/Barry Sweeney\s*(?:—|-)?\s*Lead on Land/ig,'Barry')
    .replace(/Barry Sweeney/ig,'Barry')
    .replace(/Carlston\s*(?:—|-|\/)\s*Safety\s*&\s*Skipper Lead/ig,'Carlston')
    .replace(/Lead on Land/ig,'land contact');
}

function fitAedOverview(){
  if(!exitMap) return;
  exitMap.fitBounds([[54.40,-8.95],[54.72,-8.10]],{padding:[18,18],maxZoom:9});
}

function showPanel(id){
  document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));
  const p=document.querySelector('#'+id); if(p) p.classList.add('active');
  const b=document.querySelector(`[data-panel="${id}"]`); if(b) b.classList.add('active');
  if(id==='route'&&map) setTimeout(()=>{map.invalidateSize();fitWholeBay();},80);
  if(id==='access'&&exitMap) setTimeout(()=>{exitMap.invalidateSize();fitAedOverview();},80);
}

function setupNav(){
  const groups=[
    {label:'1 CONTROLS',items:[['control','Control'],['route','Route'],['timeline','Run of Day']]},
    {label:'2 EMERGENCY',items:[['comms','Emergency Comms'],['access','AED + Exits'],['hazards','Safety Risk Inventory']]},
    {label:'3 OTHER',items:[['kit','Inventory'],['weather','Weather']]}
  ];
  const nav=document.querySelector('#tabs');
  nav.innerHTML='';
  groups.forEach(g=>{
    const wrap=document.createElement('div'); wrap.className='nav-group';
    const label=document.createElement('div'); label.className='nav-group-label'; label.textContent=g.label; wrap.appendChild(label);
    g.items.forEach(([id,name])=>{
      const b=document.createElement('button'); b.textContent=name; b.dataset.panel=id; b.onclick=()=>showPanel(id); wrap.appendChild(b);
    });
    nav.appendChild(wrap);
  });
  document.querySelector('[data-panel="control"]')?.classList.add('active');
  document.querySelector('#opsMode').onclick=()=>{document.body.classList.remove('doc-mode');showPanel('control')};
  document.querySelector('#docMode').onclick=()=>{document.body.classList.add('doc-mode');showPanel('documentation')};
}

function control(){
  const hard=data.goNoGo.filter(x=>x.hard),open=hard.filter(x=>x.status!=='GO').length,p=primary();
  const tracking=data.links.eventTracking.url?data.links.eventTracking.url:data.links.trackingService.url;
  document.querySelector('#control').innerHTML=`<div class="grid">
    <div class="card kpi span-3"><div class="label">Paddle day</div><div class="value small-value">${esc(data.meta.eventDay)}</div><div class="note">Scheduled day; GO/HOLD/NO-GO remains conditions-led</div></div>
    <div class="card kpi span-3"><div class="label">Primary route</div><div class="value">~${esc(p.distanceKm)} km</div><div class="note">Coastal access → Bullockmore → Bundoran</div></div>
    <div class="card kpi span-3"><div class="label">Hard checks open</div><div class="value">${open}</div><div class="note">Resolve every hard gate before launch</div></div>
    <div class="card kpi span-3"><div class="label">Launch scenarios</div><div class="value small-value">06:30 · 07:45 · 09:00</div><div class="note">7–10 h paddle envelope</div></div>

    <div class="card span-7 start-card"><div class="section-title">BEFORE WATER — START ACTIONS</div>
      ${data.startActions.map((x,i)=>`<div class="action-row"><div class="action-index">${i+1}</div><div><strong>${esc(softOperationalText(x.action))}</strong><div class="note">With: ${esc(softLeadLabel(x.owner))}</div></div><span class="badge">${esc(x.status)}</span></div>`).join('')}
    </div>

    <div class="card span-5"><div class="section-title">Live operations links</div>
      <p><a class="button-link" href="${esc(data.links.googleSheet.url)}" target="_blank" rel="noreferrer">Open Event Operations Sheet</a></p>
      <p><a class="button-link secondary" href="${esc(tracking)}" target="_blank" rel="noreferrer">${data.links.eventTracking.url?'Open event live tracking':'Set up Google Maps live location'}</a></p>
      <p class="note">${esc(data.links.eventTracking.note)}</p>
      <div class="report-box"><strong>Barry waypoint report</strong><div>${esc(data.reportProtocol.fields.join(' · '))}</div></div>
    </div>

    <div class="card span-7"><div class="section-title">GO / NO-GO gates</div>
      ${data.goNoGo.map(x=>`<div class="checkrow"><div class="checkstatus ${x.status.toLowerCase()}">${esc(x.status)} ${x.hard?'<span class="hard">HARD</span>':''}</div><div><strong>${esc(x.item)}</strong><div class="note">${esc(softOperationalText(x.rule))}</div></div></div>`).join('')}
    </div>

    <div class="card span-5 critical"><div class="section-title">Working coordination</div>
      <p><strong>Carlston</strong> is the person we look to for on-water route and safety calls.</p>
      <p><strong>Barry</strong> is the contact on land for receiving live location and relaying our progress at the reporting waypoints.</p>
      <p class="hard">Sunday is scheduled; conditions still decide whether we start or continue.</p>
    </div>
  </div>`;
}

function addClock(base,minutes){
  const [h,m]=base.split(':').map(Number);
  let total=(h*60+m+minutes)%(24*60);
  if(total<0) total+=24*60;
  return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
}
function clockWindow(base,from,to){
  if(from===to) return addClock(base,from);
  return `${addClock(base,from)}–${addClock(base,to)}`;
}
function timeline(){
  const launches=data.launchScenarios.map(x=>x.launch);
  const rows=[
    ['Final GO / HOLD / NO-GO','Forecast, tide/stream, route and launch-window check.',-90,-60],
    ['Muster + kit / comms','Sign-on, AED, VHF, phones, battery packs, tracking and shore contact.',-60,-30],
    ['Formal whole-team brief','Route, pods, signals, exits, reporting gates and emergency card.',-20,-5],
    ['Launch','Actual water start.',0,0],
    ['RP01 — northern report','Approx. 15 km. Progress update to Barry between the Teelin/Slieve sector and St John’s.',180,240],
    ['Bullockmore / St John’s control','Approx. 21 km. Compact check before the open-water commitment.',255,330],
    ['~25 km ETA reset','Recalculate remaining ETA from actual VMG, wind, group state and remaining distance.',285,375],
    ['RP02 — open-bay report','Approx. 29 km. Mid-bay progress update to Barry.',330,435],
    ['Receiving coast','Confirm Boat Quay or an alternate extraction based on the actual approach.',390,555],
    ['Finish','Full 7–10 h event envelope.',420,600]
  ];
  document.querySelector('#timeline').innerHTML=`<div class="grid">
    <div class="card span-12"><div class="section-title">Run of Day — Sunday launch matrix</div>
      <div style="overflow-x:auto">
        <table class="run-matrix" style="min-width:860px">
          <thead><tr><th>Milestone</th>${launches.map(x=>`<th>${esc(x)} launch</th>`).join('')}</tr></thead>
          <tbody>${rows.map(r=>`<tr>
            <td><strong>${esc(r[0])}</strong><div class="note">${esc(r[1])}</div></td>
            ${launches.map(l=>`<td><strong>${esc(clockWindow(l,r[2],r[3]))}</strong></td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <p class="note">These are planning windows, not pace targets. The first ~25 km stays deliberately cruisy; actual waypoint times move with wind, sea state, stops and group condition.</p>
    </div>
    <div class="card span-12"><div class="section-title">Land reporting</div>
      <p><strong>Barry</strong> is the contact on land for progress at RP01, Bullockmore/St John’s, RP02 and any material route or ETA change.</p>
      <div class="field-grid">${data.reportProtocol.fields.map(x=>`<div>${esc(x)}</div>`).join('')}</div>
    </div>
  </div>`;
}

function weather(){
  const t=data.weatherUpdateTemplate;
  document.querySelector('#weather').innerHTML=`<div class="grid">
    <div class="card span-12"><div class="section-title">Authoritative weather sources</div><div class="source-grid">
      ${data.weatherSources.map(s=>`<div class="source-card"><strong>${esc(s.name)}</strong><div class="note">${esc(s.check)}</div><a href="${esc(s.url)}" target="_blank" rel="noreferrer">Open source</a></div>`).join('')}
    </div></div>
    <div class="card span-7"><div class="section-title">Underway weather update fields</div><div class="field-grid">${t.fields.map(x=>`<div>${esc(x)}</div>`).join('')}</div></div>
    <div class="card span-5"><div class="section-title">GPT refresh prompt</div><textarea id="weatherPrompt" readonly>${esc(t.gptPrompt)}</textarea><button class="action-button" id="copyWeatherPrompt">Copy prompt</button>
      <p class="note">This summary supports Carlston's on-water observations and the group's skipper calls; it does not replace them.</p>
    </div>
  </div>`;
  document.querySelector('#copyWeatherPrompt').onclick=()=>navigator.clipboard?.writeText(t.gptPrompt);
}

function initExitMap(){
  exitMap=L.map('exitMap',{scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(exitMap);
  data.exits.forEach(x=>{
    if(x.lat==null||x.lon==null) return;
    const finish=x.kind.includes('FINISH');
    const beach=/BEACH|SHORE/.test(x.kind);
    const land=/LAND SUPPORT/.test(x.kind);
    L.circleMarker([x.lat,x.lon],{
      radius:finish?9:beach?6:land?5:7,
      weight:finish?3:2,
      fillOpacity:land?0.35:0.82,
      dashArray:land?'4 3':null
    }).bindPopup(`<strong>${esc(x.name)}</strong><br>${esc(x.kind)}<br>${esc(x.status)}<br>${esc(x.note)}`).addTo(exitMap);
  });
  data.aedPoints.forEach(x=>{
    if(x.lat==null||x.lon==null) return;
    L.marker([x.lat,x.lon],{title:x.name}).bindPopup(`<strong>AED — ${esc(x.name)}</strong><br>${esc(x.status)}<br>${esc(x.note)}`).addTo(exitMap);
  });
  fitAedOverview();
}

function documentation(){
  const procedures=[
    ['Working coordination','Carlston helps coordinate the on-water route and safety calls. Barry is the contact on land for live-location viewing, waypoint progress and shore-side relays.'],
    ['Formal pre-launch brief','Route, pods/buddies, signals, waypoint reporting, exits, emergency card, live-location sharing, VHF, phones/power and event AED are positively confirmed before water entry.'],
    ['Normal formation','The front of the group sets a sustainable pace; the tail stays accounted for; positive headcounts follow stops/issues/course changes; the safety craft keeps a predictable rapid-recovery position.'],
    ['Separated paddler','STOP progression, maintain visual, recover with safety craft/competent rescuer, headcount and assess. Visual lost/rapid drift/uncertain recovery → Coast Guard immediately.'],
    ['Medical / immersion','Stabilise, recover, dry/insulate and monitor. Life threat, reduced consciousness, breathing problem, drowning, major bleeding, chest pain or severe hypothermia → VHF16 / 112/999 Coast Guard.'],
    ['Equipment failure','Keep paddler with flotation, deploy spare/transfer/tow/recover. Extract or abort if controlled progression cannot be restored promptly.'],
    ['Safety-boat / comms failure','Stop exposed progression, regroup, use backup communications and move only toward the safest feasible holding/extraction plan.'],
    ['Route shortening / extraction','Carlston helps choose the water/landing plan; Barry relays progress and helps connect the land-side pickup chain; all people/craft are positively accounted for at transfer.'],
    ['Finish / close','Do not demobilise until everybody and every craft is accounted for, medical needs are addressed, equipment is reconciled and incidents are logged.']
  ];
  document.querySelector('#documentation').innerHTML=`<div class="doc-header">
    <div><div class="eyebrow dark-eye">PADDLE THE BAY 2026</div><h2>Documentation</h2><p>Detailed safety / SOP / EAP reference. Use the Operations Dash for real-time control.</p></div>
    <button class="action-button" onclick="document.querySelector('#opsMode').click()">Return to Operations Dash</button>
  </div>
  <div class="grid">
    <div class="card span-12"><div class="section-title">Safety plan / SOP / EAP</div><div class="procedure-grid">
      ${procedures.map(p=>`<div class="procedure"><strong>${esc(p[0])}</strong><div>${esc(p[1])}</div></div>`).join('')}
    </div></div>
    <div class="card span-6"><div class="section-title">Emergency communication sequence</div>${data.emergencyCall.fields.map(f=>`<div class="micro-row"><strong>${esc(f.key)}</strong> — ${esc(f.prompt)}</div>`).join('')}</div>
    <div class="card span-6"><div class="section-title">Land reporting standard</div><p><strong>Barry</strong> is the contact on land for these reports.</p>${data.reportProtocol.fields.map(x=>`<div class="micro-row">${esc(x)}</div>`).join('')}</div>
    <div class="card span-12"><div class="section-title">Sources / re-verification register</div><table><tbody>${data.sources.map(x=>`<tr><td>${esc(x[0])}</td><td><a href="${esc(x[1])}" target="_blank" rel="noreferrer">${esc(x[1])}</a></td></tr>`).join('')}</tbody></table></div>
  </div>`;
}

setupNav();
