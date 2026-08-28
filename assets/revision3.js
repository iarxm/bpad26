// Role-label refinement: keep volunteer language light while making lead roles easy to find.
const controlRevision2 = window.control;
const commsRevision2 = window.comms;
const documentationRevision2 = window.documentation;
const previousSoftOperationalText = window.softOperationalText;

function leadStrip(){
  const wrap=document.createElement('div');
  wrap.className='card span-12';
  wrap.style.padding='12px 14px';
  wrap.innerHTML=`<div class="section-title">Event leads</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">
      <div style="border:1px solid #d8d8d8;border-radius:10px;padding:12px;background:#fafafa">
        <div class="label">SAFETY LEAD</div><div style="font-size:1.15rem;font-weight:800">Carlston</div>
        <div class="note">On-water safety and route coordination.</div>
      </div>
      <div style="border:1px solid #d8d8d8;border-radius:10px;padding:12px;background:#fafafa">
        <div class="label">LAND LEAD</div><div style="font-size:1.15rem;font-weight:800">Barry</div>
        <div class="note">Land contact for live location and waypoint progress relays.</div>
      </div>
    </div>`;
  return wrap;
}

window.softOperationalText = function(value){
  return previousSoftOperationalText(value)
    .replace(/Barry Sweeney/ig,'Barry')
    .replace(/Safety\s*&\s*Skipper Lead/ig,'Safety Lead')
    .replace(/Lead on Land/ig,'Land Lead');
};

window.control = function(){
  controlRevision2();
  const grid=document.querySelector('#control > .grid');
  if(grid) grid.prepend(leadStrip());

  document.querySelectorAll('#control .card').forEach(card=>{
    const title=card.querySelector('.section-title');
    if(title?.textContent.trim()==='Working coordination'){
      card.innerHTML=`<div class="section-title">Working coordination</div>
        <p><strong>Carlston — Safety Lead</strong><br><span class="note">On-water safety and route coordination.</span></p>
        <p><strong>Barry — Land Lead</strong><br><span class="note">Land contact for receiving live location and relaying progress at reporting waypoints.</span></p>
        <p class="hard">Sunday is scheduled; conditions still decide whether we start or continue.</p>`;
    }
  });
};

window.comms = function(){
  commsRevision2();
  document.querySelectorAll('#comms .contact').forEach(card=>{
    const heading=card.querySelector('h3');
    const note=card.querySelector('.note');
    if(!heading) return;
    if(/Carlston/i.test(heading.textContent)){
      heading.textContent='Carlston — Safety Lead';
      if(note) note.textContent='On-water safety and route coordination.';
    }
    if(/Barry/i.test(heading.textContent)){
      heading.textContent='Barry — Land Lead';
      if(note) note.textContent='Land contact for live location, waypoint progress and shore-side relays.';
    }
  });
};

window.documentation = function(){
  documentationRevision2();
  const root=document.querySelector('#documentation');
  if(!root) return;

  // Documentation is role-based and reusable; personal names belong only on the live Operations Dash / contacts surface.
  root.querySelectorAll('.procedure').forEach(block=>{
    const title=block.querySelector('strong')?.textContent.trim();
    if(title==='Working coordination'){
      block.innerHTML='<strong>Working coordination</strong><div>The Safety Lead coordinates on-water route and safety calls. The Land Lead receives live-location and waypoint progress updates and supports shore-side relays.</div>';
    }
    if(title==='Route shortening / extraction'){
      block.innerHTML='<strong>Route shortening / extraction</strong><div>The Safety Lead coordinates the water/landing plan; the Land Lead supports shore-side relays and pickup coordination; all people and craft are positively accounted for at transfer.</div>';
    }
  });

  root.querySelectorAll('.card').forEach(card=>{
    const title=card.querySelector('.section-title')?.textContent.trim();
    if(title==='Land reporting standard'){
      const p=card.querySelector('p');
      if(p) p.innerHTML='<strong>Land Lead</strong> receives the scheduled reporting-waypoint updates.';
    }
  });

  // Safety net: no person-specific lead names should remain anywhere in Documentation.
  root.innerHTML=root.innerHTML
    .replace(/Barry Sweeney/gi,'Land Lead')
    .replace(/\bBarry\b/gi,'Land Lead')
    .replace(/\bCarlston\b/gi,'Safety Lead');
};

const warning=document.querySelector('.warning');
if(warning){
  warning.innerHTML='<strong>Sunday 30 August.</strong> Planning/control surface. Final GO and actual route/offing still require current chart, marine forecast, tide/stream, observations and the Safety Lead / skipper check.';
}
