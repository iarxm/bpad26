#!/usr/bin/env python3
"""Sync manually edited Event Operations .xlsx tables into data/event-plan.json.
Uses only Python stdlib to READ xlsx XML; it never edits the workbook.
Usage: python scripts/sync_from_xlsx.py [path/to/event-operations.xlsx]
"""
from __future__ import annotations
import json,re,sys,zipfile
from pathlib import Path
from xml.etree import ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
XLSX=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else ROOT/'data'/'event-operations.xlsx'
JSON=ROOT/'data'/'event-plan.json'
MAIN='http://schemas.openxmlformats.org/spreadsheetml/2006/main';REL='http://schemas.openxmlformats.org/officeDocument/2006/relationships';PKG='http://schemas.openxmlformats.org/package/2006/relationships'
def colnum(ref):
 m=re.match(r'([A-Z]+)',ref);n=0
 for c in m.group(1):n=n*26+ord(c)-64
 return n
def load_book(path):
 z=zipfile.ZipFile(path);shared=[]
 if 'xl/sharedStrings.xml' in z.namelist():
  root=ET.fromstring(z.read('xl/sharedStrings.xml'))
  for si in root.findall(f'{{{MAIN}}}si'):shared.append(''.join(t.text or '' for t in si.iter(f'{{{MAIN}}}t')))
 wb=ET.fromstring(z.read('xl/workbook.xml'));rels=ET.fromstring(z.read('xl/_rels/workbook.xml.rels'));rmap={r.attrib['Id']:r.attrib['Target'] for r in rels.findall(f'{{{PKG}}}Relationship')};smap={}
 for s in wb.find(f'{{{MAIN}}}sheets'):
  target=rmap[s.attrib[f'{{{REL}}}id']].lstrip('/');smap[s.attrib['name']]=target if target.startswith('xl/') else 'xl/'+target
 def rows(sheet):
  root=ET.fromstring(z.read(smap[sheet]));out=[]
  for r in root.iter(f'{{{MAIN}}}row'):
   vals={}
   for c in r.findall(f'{{{MAIN}}}c'):
    ref=c.attrib['r'];t=c.attrib.get('t');v=c.find(f'{{{MAIN}}}v')
    if t=='inlineStr':
     isel=c.find(f'{{{MAIN}}}is');val=''.join(x.text or '' for x in isel.iter(f'{{{MAIN}}}t')) if isel is not None else ''
    elif v is None:val=''
    elif t=='s':val=shared[int(v.text)]
    elif t=='b':val=(v.text=='1')
    else:
     txt=v.text or ''
     try:val=float(txt) if '.' in txt else int(txt)
     except:val=txt
    vals[colnum(ref)]=val
   if vals:out.append([vals.get(i,'') for i in range(1,max(vals)+1)])
  return out
 return z,rows
def pad(r,n):return r+['']*(n-len(r))
def find_header(rows,first):
 for i,r in enumerate(rows):
  if r and str(r[0]).strip()==first:return i
 raise RuntimeError(f'Header {first!r} not found')
def body(rows,first):return rows[find_header(rows,first)+1:]
data=json.loads(JSON.read_text());z,rows=load_book(XLSX)
try:
 control=rows('CONTROL');kv={str(pad(r,2)[0]).strip():pad(r,2)[1] for r in control};data['meta']['status']=str(kv.get('Final status',data['meta']['status']));data['meta']['launchTarget']=str(kv.get('Launch target',data['meta']['launchTarget']));data['meta']['provisionalPreference']=str(kv.get('Provisional decision',data['meta']['provisionalPreference']))
 checks=[]
 for r in body(control,'GO / NO-GO CONTROL'):
  r=pad(r,2)
  if r[0]:checks.append({'item':str(r[0]).replace('?','').strip(),'status':str(r[1] or 'VERIFY'),'hard':True,'rule':'See CONTROL / SOP_NOP and Safety Lead sign-off.'})
 if checks:data['goNoGo']=checks
finally:z.close()
JSON.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n');print(f'Synced {XLSX.name} -> {JSON.relative_to(ROOT)}')
