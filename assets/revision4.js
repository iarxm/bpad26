// Sunday operational refinement — AED carriage policy + Sunday coastal working route.
const controlRevision3 = window.control;
const documentationRevision3 = window.documentation;
const routeRevisionBase = window.route;
const primaryBeforeSunday = window.primary;
let sundayRevisionApplied = false;

function addWaypointIfMissing(w){
  if(!(data.waypoints || []).some(x => x.id === w.id)) data.waypoints.push(w);
}

function applySundayOperationalData(){
  if(sundayRevisionApplied || !window.data) return;
  sundayRevisionApplied = true;

  // AED carriage policy: keep shore access planning, remove a standard AED from small wet-craft inventory.
  data.kit = (data.kit || []).filter(row => !/\bAED\b/i.test(String(row?.[1] || '')));
  (data.startActions || []).forEach(x => {
    if(/event AED|AED \/ first aid/i.test(x.action || '')){
      x.action = 'Check first-aid / hypothermia kit and confirm the shore AED / extraction access plan';
    }
  });
  (data.goNoGo || []).forEach(x => {
    if(/Medical \/ event AED kit checked/i.test(x.item || '')){
      x.item = 'Medical kit + shore AED access plan checked';
      x.rule = 'Verify first aid and hypothermia equipment, plus the intended shore/extraction AED access plan. A standard AED is not required as paddler/small wet-craft inventory.';
    }
  });
  if(data.aedMap){
    data.aedMap.eventRule = 'Plan around verified shore / extraction AED access. Do not treat a standard AED as paddler or small wet-craft inventory; carry one afloat only if a sufficiently large, stable support boat can provide genuinely protected dry stowage.';
  }
  data.aedPoints = (data.aedPoints || []).filter(x => !/Event-carried AED/i.test(x.name || ''));

  // Sunday coastal working line. These are planning controls, not a hydrographically authoritative track.
  [
    {id:'SE01',name:'Teelin → Muckross coastal line',lat:54.612,lon:-8.610,type:'SUNDAY COASTAL CONTROL',exit:false,reportToLand:false,note:'Stay shore-led after Teelin while retaining enough sea room for rocks, shallow-water effects and safety-boat access.'},
    {id:'SE02',name:'Muckross south offing',lat:54.602,lon:-8.585,type:'HEADLAND CLEARANCE',exit:false,reportToLand:false,note:'Pass outside the close-in Muckross/headland dynamics, then regain useful coastal proximity.'},
    {id:'SE03',name:'Muckross east coastal line',lat:54.607,lon:-8.550,type:'SUNDAY COASTAL CONTROL',exit:false,reportToLand:false,note:'Coastal progression toward Fintra / the upper west side of St John’s.'},
    {id:'SE04',name:'Fintra outer line',lat:54.621,lon:-8.510,type:'COASTAL / EXTRACTION PROXIMITY',exit:false,reportToLand:true,note:'Useful shore-support sector. Report progress and reassess the wind angle before continuing down the peninsula.'},
    {id:'SE05',name:'St John’s west side — upper',lat:54.610,lon:-8.490,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:false,note:'Trace the west side rather than cutting early across the bay.'},
    {id:'SE06',name:'St John’s west side — mid',lat:54.595,lon:-8.478,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:false,note:'Retain land/extraction proximity while keeping clear of close-in rock/shoal effects.'},
    {id:'SE07',name:'St John’s west side — lower',lat:54.578,lon:-8.470,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:false,note:'Continue farther down the west side to improve the eventual Bundoran crossing angle.'},
    {id:'SE08',name:'St John’s south sea-room / crossing gate',lat:54.558,lon:-8.468,type:'CROSSING DECISION GATE',exit:false,reportToLand:true,note:'Approx. 28 km into the full route. Reassess actual wind, sea state, group condition and receiving-coast ETA before committing to the open-bay crossing.'},
    {id:'SE09',name:'Open Bay — one-third',lat:54.532,lon:-8.414,type:'OPEN BAY CONTROL',exit:false,reportToLand:false,note:'Straight crossing control after the St John’s departure gate.'},
    {id:'SE10',name:'Open Bay — two-thirds',lat:54.505,lon:-8.353,type:'REPORTING WAYPOINT',exit:false,reportToLand:true,note:'Mid/late crossing progress report with actual wind angle, group state and revised finish ETA.'}
  ].forEach(addWaypointIfMissing);

  const teelin = data.waypoints.find(w => w.id === 'WP02');
  if(teelin) teelin.reportToLand = true;

  const sundayRoute = {
    id:'E',
    name:'Sunday coastal — Malin Beg → Teelin → Muckross/Fintra → St John’s west side → Bundoran',
    distanceKm:42.9,
    use:'SUNDAY WORKING ROUTE — coastal / wind-angle option',
    status:'PREFERRED',
    points:['WP01','CA01','CA02','CA03','WP02','SE01','SE02','SE03','SE04','SE05','SE06','SE07','SE08','SE09','SE10','CA07','WP09'],
    geometryReady:true,
    description:'Likely Sunday planning line: approximately 11 km to Teelin, then a shore-led run through Muckross/Fintra and substantially farther down the west side of St John’s before one straighter crossing to Bundoran. This delays the exposed commitment and preserves extraction options longer. Exact offing and the St John’s departure point remain dependent on current chart, tidal stream, sea state and actual wind.'
  };

  const existingA = (data.routeOptions || []).find(r => r.id === 'A');
  if(existingA){
    existingA.status = 'ALTERNATIVE';
    existingA.use = 'Shorter crossing option — conditions dependent';
  }
  data.routeOptions = [sundayRoute, ...(data.routeOptions || []).filter(r => r.id !== 'E')];
  data.meta.routePrinciple = 'Sunday working concept: stay close enough to the northern coast for practical extraction, step out around headland / rock / shallow-water dynamics, continue farther down the west side of St John’s, then make the straightest useful crossing to Bundoran once the actual wind angle is acceptable.';
}

window.primary = function(){
  return data?.routeOptions?.find(r => r.id === 'E') || primaryBeforeSunday();
};

window.control = function(){
  applySundayOperationalData();
  controlRevision3();
};

window.route = function(){
  routeRevisionBase();
  const cards = [...document.querySelectorAll('#route .route-card')];
  cards.forEach(c => c.classList.remove('selected'));
  const sundayCard = cards.find(c => /Route E\b/.test(c.querySelector('.section-title')?.textContent || ''));
  sundayCard?.classList.add('selected');

  const chartCard = document.querySelector('#route .route-chart-card');
  if(chartCard){
    const title = chartCard.querySelector('.section-title');
    const note = chartCard.querySelector('.note');
    if(title) title.textContent = 'Shorter Route A chart — comparison only';
    if(note) note.textContent = 'The interactive map above is the current Sunday working route. This older static chart is retained only for comparison until the coastal chart is redrawn.';
  }
};

window.documentation = function(){
  documentationRevision3();
  const root = document.querySelector('#documentation');
  const grid = root?.querySelector('.grid');
  if(!grid || root.querySelector('[data-doc="aed-water"]')) return;

  const card = document.createElement('div');
  card.className = 'card span-12';
  card.dataset.doc = 'aed-water';
  card.innerHTML = `<div class="section-title">AEDs, water and event duration</div>
    <p><strong>AEDs are not treated as paddler or small wet-craft inventory for this event.</strong> A standard unit is awkward to keep reliably dry and immediately usable on a small wet platform. Carriage afloat only makes practical sense if a sufficiently large, stable support boat has genuinely protected dry stowage.</p>
    <p>The absolute chance of a cardiac arrest may be low, but a long paddle means prolonged exertion, prolonged wet/cold exposure and more time away from immediate shore care. The plan therefore keeps rapid recovery, CPR, emergency-service activation and verified shore/extraction AED access in the medical response chain.</p>
    <p>If an AED is available for a casualty recovered from the water, remove the casualty from the water, dry the chest quickly so the pads adhere, follow the device prompts and keep the unit as dry as practicable.</p>
    <p class="note">Reference: Resuscitation Council UK guidance on AED use around water. This is an operational planning note, not a substitute for first-aid/AED training or the device manufacturer's instructions.</p>
    <p><a href="https://www.resus.org.uk/professional-library/faqs/faqs-basic-life-support-cpr" target="_blank" rel="noreferrer">Resuscitation Council UK — AED / wet-surface guidance</a></p>`;
  grid.appendChild(card);
};
