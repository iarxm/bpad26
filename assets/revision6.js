// Contact-detail refinement — public operational contact cards only.
// Documentation remains generic/role-based.
const controlRevision5 = window.control;
const commsRevision5 = window.comms;

const publicOperationalContacts = {
  Carlston: { phone: '+353 83 109 4082', tel: '+353831094082' },
  Barry: { phone: '+353 87 964 9654', tel: '+353879649654' },
  Ryan: { phone: '+353 83 198 4288', tel: '+353831984288' },
  James: { phone: '+353 83 185 5164', tel: '+353831855164' }
};

function phoneLink(person){
  const p=publicOperationalContacts[person];
  return p ? `<a href="tel:${esc(p.tel)}">${esc(p.phone)}</a>` : '';
}

function applyOperationalContactData(){
  if(!window.data && typeof data==='undefined') return;
  (data.contacts || []).forEach(c=>{
    if(/Carlston/i.test(c.role || '')) c.contact = publicOperationalContacts.Carlston.phone;
    if(/Barry/i.test(c.role || '')) c.contact = publicOperationalContacts.Barry.phone;
  });
}

function refreshControlContactCards(){
  const root=document.querySelector('#control');
  if(!root) return;

  root.querySelectorAll('.card').forEach(card=>{
    const text=card.textContent || '';
    if(/SAFETY LEAD/i.test(text) && /Carlston/i.test(text)){
      const note=card.querySelector('.note');
      if(note) note.innerHTML=`${phoneLink('Carlston')}<br>On-water safety and route coordination.`;
    }
    if(/LAND LEAD/i.test(text) && /Barry/i.test(text)){
      const note=card.querySelector('.note');
      if(note) note.innerHTML=`${phoneLink('Barry')}<br>Land contact for live location and waypoint progress relays.`;
    }
  });

  const ryan=root.querySelector('[data-paddler="Ryan"] .note');
  if(ryan) ryan.innerHTML=phoneLink('Ryan');
  const james=root.querySelector('[data-paddler="James"] .note');
  if(james) james.innerHTML=phoneLink('James');
}

window.control=function(){
  applyOperationalContactData();
  controlRevision5();
  refreshControlContactCards();
};

window.comms=function(){
  applyOperationalContactData();
  commsRevision5();
  document.querySelectorAll('#comms .contact').forEach(card=>{
    const heading=card.querySelector('h3')?.textContent || '';
    const value=card.querySelector('.contact-value');
    if(!value) return;
    if(/Carlston/i.test(heading)) value.innerHTML=phoneLink('Carlston');
    if(/Barry/i.test(heading)) value.innerHTML=phoneLink('Barry');
  });
};
