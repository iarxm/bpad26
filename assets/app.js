const tabs=[
  ['control','Control'],
  ['route','Route'],
  ['timeline','Run of show'],
  ['safetyplan','Safety plan'],
  ['hazards','Hazards / constraints'],
  ['access','Access / AED'],
  ['comms','Emergency / Comms'],
  ['kit','Equipment'],
  ['sources','Sources']
];
let data=null,map=null,routeLayer=null,markerLayer=null,positionMarker=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function loadData(){const r=await fetch('data/event-plan.json',{cache:'no-store'});if(!r.ok)throw new Error('Unable to load event-plan.json');return r.json();}
function setupTabs(){const nav=document.querySelector('#tabs');tabs.forEach(([id,label],i)=>{const b=document.createElement('button');b.textContent=label;b.className=i?'':'active';b.onclick=()=>{document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));document.querySelector('#'+id).classList.add('active');b.classList.add('active');if(id==='route'&&map)setTimeout(()=>{map.invalidateSize();fitWholeBay();},80)};nav.appendChild(b)})}
function primary(){return data.routeOptions.find(r=>r.id==='A')||data.routeOptions[0]}
function control(){
  const hard=data.goNoGo.filter(x=>x.hard),open=hard.filter(x=>x.status!=='GO').length,p=primary();
  document.querySelector('#control').innerHTML=`<div class="grid">
    <div class="card kpi span-3"><div class="label">Provisional day</div><div class="value">Saturday</div><div class="note">Final choice remains conditions-led</div></div>
    <div class="card kpi span-3"><div class="label">Primary route</div><div class="value">~${esc(p.distanceKm)} km</div><div class="note">Coastal access → Bullockmore → Bundoran</div></div>
    <div class="card kpi span-3"><div class="label">Hard checks open</div><div class="value">${open}</div><div class="note">A hard NO-GO cannot be averaged away</div></div>
    <div class="card kpi span-3"><div class="label">Launch scenarios</div><div class="value small-value">06:30 · 07:45 · 09:00</div><div class="note">Select after final marine/tide review</div></div>
    <div class="card span-7"><div class="section-title">GO / NO-GO gates</div>${data.goNoGo.map(x=>`<div class="checkrow"><div class="checkstatus ${x.status.toLowerCase()}">${esc(x.status)} ${x.hard?'<span class="hard">HARD</span>':''}</div><div><strong>${esc(x.item)}</strong><div class="note">${esc(x.rule)}</div></div></div>`).join('')}</div>
    <div class="card span-5 critical"><div class="section-title">Command rule</div><p><strong>Carlston — Safety & Skipper Lead — holds final on-water safety/navigation authority.</strong></p><p>Barry Sweeney is the stable land contact holding the float plan, timing window and extraction/AED chain.</p><p class="hard">Fundraising or schedule pressure never cancels a hard veto.</p></div>
  </div>`}
function route(){
  document.querySelector('#route').innerHTML=`<div class="grid">
    <div class="span-8"><div id="map"></div>
      <div class="note route-note">${esc(data.meta.routePrinciple)} Actual track/offing remains a current-chart and skipper decision.</div>
      <div class="card route-chart-card"><div class="section-title">Primary route chart</div>
        <img src="assets/route-optimized.svg" alt="Paddle the Bay coastal-access-balanced primary planning route">
        <p class="note">~${esc(primary().distanceKm)} km planning line. The northern phase now sits closer to land for extraction access, with deliberate outward steps at the exposed/headland sectors and Bullockmore retained as the St John’s control reference.</p>
      </div>
    </div>
    <div class="span-4" id="routeCards"></div>
  </div>`;
  const cards=document.querySelector('#routeCards');
  data.routeOptions.forEach((r,i)=>{const d=document.createElement('div');d.className='card route-card '+(i===0?'selected':'');d.style.marginBottom='10px';const ready=r.geometryReady!==false;
    d.innerHTML=`<div class="section-title">Route ${esc(r.id)} ${r.status==='PREFERRED'?'<span class="badge preferred">PREFERRED</span>':!ready?'<span class="badge">GEOMETRY REVIEW</span>':''}</div><strong>${esc(r.name)}</strong><div class="route-distance">${ready?'~'+esc(r.distanceKm)+' km':'Concept'}</div><div class="note">${esc(r.use)}</div><p>${esc(r.description)}</p>`;
    d.onclick=()=>{document.querySelectorAll('.route-card').forEach(x=>x.classList.remove('selected'));d.classList.add('selected');drawRoute(r)};cards.appendChild(d)});
  initMap();drawRoute(primary())
}
function fitWholeBay(){if(!map)return;const b=data.meta.mapBounds||[[54.43,-8.85],[54.70,-8.20]];map.fitBounds(b,{padding:[12,12]})}
function initMap(){
  map=L.map('map',{scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
  markerLayer=L.layerGroup().addTo(map);
  data.waypoints.forEach(w=>{const important=['LAUNCH','CRITICAL NAV AID','FINISH','HEADLAND CLEARANCE','EXTRACTION PROXIMITY GATE','RECEIVING APPROACH'].includes(w.type);const m=L.circleMarker([w.lat,w.lon],{radius:important?7:5,weight:2,fillOpacity:.9});
    m.bindPopup(`<strong>${esc(w.id)} — ${esc(w.name)}</strong><br>${esc(w.type)}<br>${esc(w.note)}`);m.addTo(markerLayer)});
  fitWholeBay()
}
function drawRoute(r){if(routeLayer){routeLayer.remove();routeLayer=null}if(r.geometryReady===false){fitWholeBay();return}const pts=r.points.map(id=>data.waypoints.find(w=>w.id===id)).filter(Boolean).map(w=>[w.lat,w.lon]);routeLayer=L.polyline(pts,{weight:4,opacity:.88}).addTo(map);fitWholeBay()}
function timeline(){
  document.querySelector('#timeline').innerHTML=`<div class="grid">
    <div class="card span-12"><div class="section-title">Launch / finish scenarios</div><div class="scenario-grid">${data.launchScenarios.map(s=>`<div class="scenario"><div class="label">Launch</div><div class="scenario-time">${esc(s.launch)}</div><div><strong>${esc(s.duration)}</strong> paddle</div><div class="finish-window">${esc(s.finish)}</div><div class="note">${esc(s.use)}</div></div>`).join('')}</div></div>
    <div class="card span-7"><div class="section-title">Run of show — relative to selected launch</div><div class="timeline">${data.timeline.map(x=>`<div class="timeitem"><div class="time">${esc(x[0])}</div><div class="phase">${esc(x[1])}</div><div>${esc(x[2])}</div></div>`).join('')}</div></div>
    <div class="card span-5"><div class="section-title">Pacing model</div><p><strong>First ~25 km:</strong> deliberately slow/cruisy. Do not spend the early event trying to bank time.</p><p><strong>~25 km gate:</strong> recalculate the final ETA from actual elapsed time, wind/VMG, group condition and the remaining distance.</p><p><strong>After the recalculation:</strong> continue, shorten, or adjust receiving/extraction planning based on real margins rather than the original clock.</p></div>
  </div>`}
function safetyPlan(){
  const sp=data.safetyPlan;
  document.querySelector('#safetyplan').innerHTML=`<div class="grid">
    <div class="card span-12"><div class="section-title">Command / roles</div><div class="role-grid">${sp.roles.map(r=>`<div class="role-card"><div class="role-name">${esc(r.name)}</div><div class="role-title">${esc(r.role)}</div><div>${esc(r.authority)}</div></div>`).join('')}</div></div>
    <div class="card span-6"><div class="section-title">Command principles</div>${sp.commandPrinciples.map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>
    <div class="card span-6"><div class="section-title">Pre-launch safety checks</div>${sp.preLaunch.map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>
    <div class="card span-7"><div class="section-title">Normal on-water operation</div>${sp.normalOps.map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>
    <div class="card span-5"><div class="section-title">Incident states</div>${sp.incidentStates.map(x=>`<div class="incident ${x.level.toLowerCase()}"><strong>${esc(x.level)} — ${esc(x.meaning)}</strong><div>${esc(x.action)}</div></div>`).join('')}</div>
    <div class="card span-12"><div class="section-title">Emergency / abnormal procedures</div><div class="procedure-grid">${sp.procedures.map(p=>`<div class="procedure"><strong>${esc(p.title)}</strong><div>${esc(p.steps)}</div></div>`).join('')}</div></div>
  </div>`}
function hazards(){
  document.querySelector('#hazards').innerHTML=`<div class="grid">
    <div class="card span-6"><div class="section-title">Safety hazards</div>${data.safetyHazards.map(h=>`<div class="risk-card ${h.severity.toLowerCase()}"><span class="badge ${h.severity.toLowerCase()}">${esc(h.severity)}</span><strong>${esc(h.hazard)}</strong><div class="note">${esc(h.control)}</div></div>`).join('')}</div>
    <div class="card span-6"><div class="section-title">Operational / route constraints</div>${data.operationalConstraints.map(h=>`<div class="constraint-card"><span class="badge">${esc(h.impact)}</span><strong>${esc(h.constraint)}</strong><div class="note">${esc(h.response)}</div></div>`).join('')}</div>
    <div class="card span-12"><div class="section-title">Escalation rule</div><p><strong>${esc(data.escalationPrinciple)}</strong></p></div>
  </div>`}
function access(){
  document.querySelector('#access').innerHTML=`<div class="grid">
    <div class="card span-12"><div class="section-title">Regional AED verification map</div><p><a class="button-link" href="${esc(data.aedMap.url)}" target="_blank" rel="noreferrer">Open ${esc(data.aedMap.name)}</a></p><p>${esc(data.aedMap.legend)}</p><p class="hard">${esc(data.aedMap.eventRule)}</p></div>
    <div class="card span-12"><div class="section-title">Access / exit / AED matrix</div><table><thead><tr><th>Location</th><th>Role</th><th>Status</th><th>Operational note</th></tr></thead><tbody>${data.accessAed.map(x=>`<tr><td><strong>${esc(x.location)}</strong></td><td>${esc(x.role)}</td><td><span class="badge">${esc(x.status)}</span></td><td>${esc(x.note)}</td></tr>`).join('')}</tbody></table></div>
  </div>`}
function haversineKm(a,b){const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lon-a.lon);const q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(q))}
function nearestWaypoint(lat,lon){const pos={lat,lon};return data.waypoints.map(w=>({w,d:haversineKm(pos,w)})).sort((a,b)=>a.d-b.d)[0]}
function getPosition(){
  const out=document.querySelector('#positionOutput');
  if(!navigator.geolocation){out.innerHTML='<strong>Geolocation is not available in this browser.</strong>';return}
  out.textContent='Requesting device position…';
  navigator.geolocation.getCurrentPosition(p=>{
    const lat=p.coords.latitude,lon=p.coords.longitude,n=nearestWaypoint(lat,lon);
    out.innerHTML=`<div class="position-value">${lat.toFixed(5)}, ${lon.toFixed(5)}</div><div><strong>Nearest listed point:</strong> ${esc(n.w.name)} (${n.d.toFixed(1)} km)</div><div class="note">Read the coordinates exactly as displayed to Coast Guard and add the nearest named point plus drift/movement.</div>`;
    if(map){if(positionMarker)positionMarker.remove();positionMarker=L.circleMarker([lat,lon],{radius:9,weight:3,fillOpacity:.9}).bindPopup('Current device position').addTo(map)}
  },e=>{out.innerHTML=`<strong>Position unavailable.</strong> ${esc(e.message)}. Use the safety craft GPS/plotter or phone map and read WGS84 latitude/longitude.`},{enableHighAccuracy:true,timeout:10000,maximumAge:30000})
}
function comms(){
  const ec=data.emergencyCall;
  document.querySelector('#comms').innerHTML=`<div class="grid">
    <div class="card span-12 critical"><div class="section-title">Emergency activation</div><div class="big-emergency">${esc(ec.activation)}</div><div class="urgency-grid"><div><strong>${esc(ec.mayday)}</strong></div><div><strong>${esc(ec.panpan)}</strong></div></div></div>
    <div class="card span-5"><div class="section-title">Current position for emergency call</div><button class="action-button" id="getPosition">Use this device's position</button><div id="positionOutput" class="position-output">Alternatively read WGS84 latitude/longitude from the safety craft GPS/plotter.</div></div>
    <div class="card span-7"><div class="section-title">Emergency call card — communicate in this order</div><div class="call-grid">${ec.fields.map(f=>`<div class="call-field"><div class="call-key">${esc(f.key)}</div><div>${esc(f.prompt)}</div></div>`).join('')}</div></div>
    <div class="card span-12"><div class="section-title">Contacts / command</div><div class="contact-grid">${data.contacts.map(x=>`<div class="contact ${x.priority==='EMERGENCY'?'emergency':''}"><span class="badge">${esc(x.priority)}</span><h3>${esc(x.role)}</h3><div class="contact-value">${esc(x.contact)}</div><div class="note">${esc(x.note)}</div></div>`).join('')}</div></div>
  </div>`;
  document.querySelector('#getPosition').onclick=getPosition
}
function kit(){document.querySelector('#kit').innerHTML=`<div class="card"><div class="section-title">Equipment / redundancy matrix</div><table><thead><tr><th>System</th><th>Item</th><th>Minimum</th><th>Redundancy / note</th></tr></thead><tbody>${data.kit.map(x=>`<tr><td>${esc(x[0])}</td><td><strong>${esc(x[1])}</strong></td><td>${esc(x[2])}</td><td>${esc(x[3])}</td></tr>`).join('')}</tbody></table></div>`}
function sources(){document.querySelector('#sources').innerHTML=`<div class="card"><div class="section-title">Sources / re-verification register</div><table><tbody>${data.sources.map(x=>`<tr><td>${esc(x[0])}</td><td><a href="${esc(x[1])}" target="_blank" rel="noreferrer">${esc(x[1])}</a></td></tr>`).join('')}</tbody></table></div>`}
(async()=>{setupTabs();try{data=await loadData();document.querySelector('#overallStatus').textContent=data.meta.status;document.querySelector('#overallStatus').className='status '+data.meta.status.toLowerCase();control();route();timeline();safetyPlan();hazards();access();comms();kit();sources();document.querySelector('#dataMode').textContent=window.PTB_CONFIG?.dataMode||'local';document.querySelector('#refreshed').textContent=new Date().toLocaleString();}catch(e){document.querySelector('main').innerHTML=`<div class="card critical"><h2>Data load failed</h2><p>${esc(e.message)}</p></div>`}})();
