// Route clarification + paddler strip.
// Preserve Route A as the original plan; Route E is a separate Sunday high-wind coastal alternative.
const controlRevision4 = window.control;
const routeRevision4 = window.route;
const primaryRevision4 = window.primary;
let routeClarificationApplied = false;

function addClarifiedWaypoint(w){
  if(!(data.waypoints || []).some(x => x.id === w.id)) data.waypoints.push(w);
}

function applyRouteClarification(){
  if(routeClarificationApplied) return;
  routeClarificationApplied = true;

  // Remove the superseded Malin-start Sunday overlay points so the map stays legible.
  data.waypoints = (data.waypoints || []).filter(w => !/^SE\d+$/i.test(w.id || ''));

  [
    {id:'TE01',name:'Teelin coastal departure',lat:54.620,lon:-8.620,type:'COASTAL CONTROL',exit:false,reportToLand:false,note:'Leave Teelin and settle into the coastal line while retaining practical shore access.'},
    {id:'TE02',name:'Muckross west approach',lat:54.604,lon:-8.590,type:'COASTAL / HEADLAND APPROACH',exit:false,reportToLand:false,note:'Stay coast-led but give enough offing for rocks, shallow-water effects and safety-boat access.'},
    {id:'TE03',name:'Muckross east clearance',lat:54.613,lon:-8.552,type:'HEADLAND CLEARANCE',exit:false,reportToLand:true,note:'Clear the Muckross sector, report progress, then regain useful coastal proximity.'},
    {id:'TE04',name:'Fintra west coastal line',lat:54.628,lon:-8.515,type:'COASTAL / EXTRACTION PROXIMITY',exit:false,reportToLand:false,note:'Coast-led progression with Fintra available as a candidate extraction sector.'},
    {id:'TE05',name:'Fintra / north St John’s approach',lat:54.633,lon:-8.480,type:'COASTAL CONTROL',exit:false,reportToLand:true,note:'Stay close to the northern land mass before committing down the St John’s peninsula.'},
    {id:'TE06',name:'St John’s north-root coastal gate',lat:54.625,lon:-8.455,type:'PENINSULA ENTRY',exit:false,reportToLand:false,note:'Turn onto the St John’s coastal trace rather than cutting diagonally across the bay.'},
    {id:'TE07',name:'St John’s northwest side',lat:54.610,lon:-8.460,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:false,note:'Follow the peninsula with enough sea room for local rocks and shallow-water dynamics.'},
    {id:'TE08',name:'St John’s west side — mid',lat:54.590,lon:-8.472,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:false,note:'Maintain shore proximity and delay the exposed crossing commitment.'},
    {id:'TE09',name:'St John’s west side — lower',lat:54.575,lon:-8.474,type:'PENINSULA COASTAL CONTROL',exit:false,reportToLand:true,note:'Progress report before rounding the lower peninsula sector.'},
    {id:'TE10',name:'St John’s tip west',lat:54.562,lon:-8.470,type:'HEADLAND ROUNDING CONTROL',exit:false,reportToLand:false,note:'Planning offing around the point; actual line remains chart/conditions dependent.'},
    {id:'TE11',name:'St John’s south / crossing gate',lat:54.553,lon:-8.455,type:'CROSSING DECISION GATE',exit:false,reportToLand:true,note:'Major decision gate: actual wind angle, group state, sea state, VMG and recovery margin before committing to Bundoran.'},
    {id:'TE12',name:'Open Bay crossing — one third',lat:54.525,lon:-8.400,type:'OPEN BAY CONTROL',exit:false,reportToLand:false,note:'Straight crossing control after the St John’s gate.'},
    {id:'TE13',name:'Open Bay crossing — two thirds',lat:54.500,lon:-8.345,type:'REPORTING WAYPOINT',exit:false,reportToLand:true,note:'Late crossing report with position, group state, actual wind and revised finish ETA.'}
  ].forEach(addClarifiedWaypoint);

  const teelin = data.waypoints.find(w => w.id === 'WP02');
  if(teelin){
    teelin.reportToLand = true;
    teelin.note = 'Route E launch / early extraction point. Confirm actual launch time, headcount and live-location visibility with land.';
  }

  const routeA = (data.routeOptions || []).find(r => r.id === 'A');
  if(routeA){
    routeA.status = 'PREFERRED';
    routeA.use = 'ORIGINAL PLAN — Malin Beg start';
  }

  const teelinAlternative = {
    id:'E',
    name:'Teelin → Muckross / Fintra coast → north-root St John’s → around St John’s → Bundoran',
    distanceKm:35.6,
    use:'SUNDAY HIGH-WIND ALTERNATIVE — Teelin start',
    status:'SUNDAY ALTERNATIVE',
    points:['WP02','TE01','TE02','TE03','TE04','TE05','TE06','TE07','TE08','TE09','TE10','TE11','TE12','TE13','CA07','WP09'],
    geometryReady:true,
    description:'Separate Sunday alternative if the Malin Beg start is ruled out by wind. Launch at Teelin, trace close to the northern coast through Muckross/Fintra, stay with the north/root side of the St John’s land mass before running down and around the peninsula, then make the final crossing to Bundoran. Planning distance is about 35.6 km. Exact coastal offing and St John’s rounding remain chart/tide/sea-state dependent.'
  };

  data.routeOptions = [routeA, teelinAlternative, ...(data.routeOptions || []).filter(r => r.id !== 'A' && r.id !== 'E')].filter(Boolean);
  data.meta.routePrinciple = 'Route A remains the original Malin Beg plan. Route E is a separate Teelin-start coastal alternative for a stronger-wind Sunday: remain near the northern coast and St John’s land mass for as long as practical, step out around rock/shallow/headland effects, round St John’s, then commit to the final crossing only from the observed wind/sea picture.';
}

window.primary = function(){
  return data?.routeOptions?.find(r => r.id === 'A') || primaryRevision4();
};

function addPaddlerCards(){
  const leads = [...document.querySelectorAll('#control .card')].find(card => card.querySelector('.section-title')?.textContent.trim() === 'Event leads');
  const grid = leads?.querySelector('div[style*="grid-template-columns"]');
  if(!grid || grid.querySelector('[data-paddler="Ryan"]')) return;

  const people = [
    {name:'Ryan',contact:'CONTACT TO CONFIRM'},
    {name:'James',contact:'CONTACT TO CONFIRM'},
    {name:'Iarom',contact:'future@iarom.org',href:'mailto:future@iarom.org'}
  ];

  people.forEach(p => {
    const card=document.createElement('div');
    card.dataset.paddler=p.name;
    card.style.cssText='border:1px solid #d8d8d8;border-radius:10px;padding:12px;background:#fafafa';
    card.innerHTML=`<div class="label">PADDLER</div><div style="font-size:1.15rem;font-weight:800">${esc(p.name)}</div><div class="note">${p.href?`<a href="${esc(p.href)}">${esc(p.contact)}</a>`:esc(p.contact)}</div>`;
    grid.appendChild(card);
  });
}

window.control = function(){
  // Let the previous revision initialise its data once, then replace only the clarified route concept.
  controlRevision4();
  applyRouteClarification();
  controlRevision4();
  addPaddlerCards();
};

window.route = function(){
  applyRouteClarification();
  routeRevision4();

  // Route A remains the default/original planning line.
  const cards=[...document.querySelectorAll('#route .route-card')];
  cards.forEach(c=>c.classList.remove('selected'));
  const aCard=cards.find(c=>/Route A\b/.test(c.querySelector('.section-title')?.textContent || ''));
  aCard?.classList.add('selected');
  drawRoute(data.routeOptions.find(r=>r.id==='A'));

  const eCard=cards.find(c=>/Route E\b/.test(c.querySelector('.section-title')?.textContent || ''));
  if(eCard){
    const title=eCard.querySelector('.section-title');
    if(title && !title.querySelector('.preferred')) title.insertAdjacentHTML('beforeend',' <span class="badge preferred">SUNDAY ALT</span>');
  }

  const chartCard=document.querySelector('#route .route-chart-card');
  if(chartCard){
    const title=chartCard.querySelector('.section-title');
    const note=chartCard.querySelector('.note');
    if(title) title.textContent='Primary Route A chart';
    if(note) note.textContent='Route A remains the original Malin Beg plan. Use the interactive Route E card to inspect the separate ~35.6 km Teelin-start coastal alternative.';
  }
};
