#!/usr/bin/env python3
import sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
root=Path(sys.argv[1]).resolve()
errors=[]
for name in ['index.html','rhr-qr/index.html','donations/donate-to-rhr/index.html','404.html']:
 p=root/name
 if not p.is_file() or p.stat().st_size<200: errors.append('Missing required page: '+name)
class Assets(HTMLParser):
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs); candidates=[]
  if tag in ('img','script','source'): candidates.append(attrs.get('src',''))
  if tag=='link' and attrs.get('rel')=='stylesheet': candidates.append(attrs.get('href',''))
  for value in candidates:
   url=urlsplit(value)
   if url.hostname and url.hostname!='rhrroc.org': continue
   if url.scheme and url.scheme not in ('http','https'): continue
   if not url.path: continue
   path=(root/unquote(url.path).lstrip('/')) if url.path.startswith('/') else (self.page.parent/unquote(url.path))
   if not path.is_file(): errors.append(str(self.page.relative_to(root))+': missing asset '+value)
for p in root.rglob('*'):
 if not p.is_file(): continue
 rel=p.relative_to(root)
 if p.suffix.lower() in ('.php','.sql','.env') or 'wp-admin' in rel.parts or 'wp-login' in p.name: errors.append('Private/server file: '+str(rel))
 if p.suffix=='.html':
  data=p.read_text(errors='replace')
  for marker in ('edit.rhrroc.org','http://wordpress','id="wpadminbar"','cloudflareaccess.com'):
   if marker in data: errors.append(str(rel)+': private editor content: '+marker)
  parser=Assets(); parser.page=p; parser.feed(data)
for lang in ('english','arabic','spanish','somali','dari'):
 for n in range(1,7):
  if not (root/('poster/'+lang+'/page-'+str(n)+'.png')).is_file(): errors.append('Missing poster: '+lang+' '+str(n))
if errors:
 print('\n'.join(errors[:50]),file=sys.stderr); sys.exit(1)
print('Validated routes, poster pages, local assets, and absence of private editor content.')
