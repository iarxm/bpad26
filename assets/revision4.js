// Sunday operational refinement — AED carriage policy.
// Keep public operations lightweight while retaining shore/AED access planning.
const controlRevision3 = window.control;
const documentationRevision3 = window.documentation;
let aedPolicyApplied = false;

function applyAedCarriagePolicy(){
  if(aedPolicyApplied || !window.data) return;
  aedPolicyApplied = true;

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
}

window.control = function(){
  applyAedCarriagePolicy();
  controlRevision3();
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
