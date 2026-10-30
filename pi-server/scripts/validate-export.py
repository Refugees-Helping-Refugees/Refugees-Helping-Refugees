#!/usr/bin/env python3
import sys
from xml.etree import ElementTree as ET
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
# Catch private WordPress indexing flags leaking into the public site again.
public_routes = ['index.html', 'social-care-network/index.html', 'rhr-qr/index.html', 'donations/donate-to-rhr/index.html']
class SEO(HTMLParser):
    def __init__(self):
        super().__init__(); self.robots=[]; self.descriptions=[]; self.canonicals=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='meta' and attrs.get('name','').lower() in ('robots','googlebot','bingbot'):
            self.robots.append(attrs.get('content','').lower())
        if tag=='meta' and attrs.get('name','').lower()=='description': self.descriptions.append(attrs.get('content',''))
        if tag=='link' and attrs.get('rel','').lower()=='canonical': self.canonicals.append(attrs.get('href',''))
expected_urls = set()
for name in public_routes:
    page=root/name
    route='/' if name=='index.html' else '/'+name.removesuffix('index.html')
    expected='https://rhrroc.org'+route; expected_urls.add(expected)
    if not page.is_file(): errors.append('Missing indexable public page: '+name); continue
    parser=SEO(); parser.feed(page.read_text())
    if not parser.robots or any('noindex' in value or 'nofollow' in value or 'none' in value for value in parser.robots):
        errors.append(name+': public page blocks search indexing')
    if parser.canonicals != [expected]: errors.append(name+': missing, duplicate, or incorrect canonical')
    if len(parser.descriptions)!=1 or not parser.descriptions[0]: errors.append(name+': missing or duplicate search description')
try:
    tree=ET.parse(root/'sitemap.xml')
    urls={node.text for node in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    if urls!=expected_urls: errors.append('Sitemap does not match the public page allowlist')
    if 'Sitemap: https://rhrroc.org/sitemap.xml' not in (root/'robots.txt').read_text(): errors.append('robots.txt missing sitemap')
except (OSError, ET.ParseError) as error: errors.append('Missing or invalid search discovery files: '+str(error))
if errors:
 print('\n'.join(errors[:50]),file=sys.stderr); sys.exit(1)
print('Validated routes, poster pages, local assets, public SEO, and absence of private editor content.')
