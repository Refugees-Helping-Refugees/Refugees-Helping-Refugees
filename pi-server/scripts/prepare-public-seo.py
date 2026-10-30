#!/usr/bin/env python3
"""Prepare search metadata for explicitly public pages in a staged WP export.

The private editor remains noindex and behind Access. Never run on WordPress
itself: this operates only on the publisher's disposable static staging tree.
"""
import html
from html.parser import HTMLParser
import json
import re
from pathlib import Path
import sys
from xml.etree import ElementTree as ET

BASE = 'https://rhrroc.org'
PAGES = {
    'index.html': (
        '/', 'Refugees Helping Refugees | Rochester, NY',
        'Refugee-led support in Rochester and Western New York. Explore ESOL classes, case management, and Social Care Network services at Refugees Helping Refugees.'),
    'social-care-network/index.html': (
        '/social-care-network/', 'Social Care Network | Refugees Helping Refugees',
        'Explore Social Care Network screenings, referrals, and community support for eligible Medicaid members at Refugees Helping Refugees in Rochester, NY.'),
    'donations/donate-to-rhr/index.html': (
        '/donations/donate-to-rhr/', 'Donate | Refugees Helping Refugees in Rochester',
        'Support refugee-led education, case management, and community services in Rochester and Western New York with a donation to Refugees Helping Refugees.'),
    'rhr-qr/index.html': (
        '/rhr-qr/', 'Community Information | Refugees Helping Refugees',
        'Read and download Refugees Helping Refugees community information in English, Arabic, Spanish, Somali, and Dari. Serving Rochester and Western New York.'),
}
LOGO = BASE + '/wp-content/themes/rhr-theme/assets/images/rhr-logo.jpg'
ORGANIZATION = {
    '@context': 'https://schema.org', '@type': 'NGO', '@id': BASE + '/#organization',
    'name': 'Refugees Helping Refugees', 'alternateName': 'RHR', 'url': BASE + '/',
    'logo': LOGO, 'telephone': '+1-585-563-7747', 'email': 'rhr@rhrroc.org',
    'address': {'@type': 'PostalAddress', 'streetAddress': '228 South Plymouth Avenue, Suite 200',
                'addressLocality': 'Rochester', 'addressRegion': 'NY',
                'postalCode': '14608', 'addressCountry': 'US'},
    'areaServed': ['Rochester, New York', 'Western New York'],
}


class HeadTags(HTMLParser):
    """Locate only owned head tags, without reserializing WordPress markup."""
    def __init__(self, data):
        super().__init__(convert_charrefs=False)
        self.lines = [0]
        for i, char in enumerate(data):
            if char == '\n': self.lines.append(i + 1)
        self.ranges, self.in_head, self.close, self.removing = [], False, None, None
        self.feed(data)

    def position(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        if tag == 'head': self.in_head = True
        if not self.in_head: return
        attrs = {k: (v or '') for k, v in attrs}
        name = attrs.get('name', '').lower()
        prop = attrs.get('property', '').lower()
        owned = (tag == 'meta' and (
            name in ('robots', 'googlebot', 'bingbot', 'description', 'twitter:card') or
            prop in ('og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:site_name')))
        owned |= tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split()
        start = self.position()
        if owned: self.ranges.append((start, start + len(self.get_starttag_text())))
        if tag == 'title' or (tag == 'script' and attrs.get('id') == 'rhr-public-organization'):
            self.removing = (tag, start)

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if self.removing and tag == self.removing[0]:
            self.ranges.append((self.removing[1], self.position() + len('</' + tag + '>')))
            self.removing = None
        if tag == 'head':
            self.close = self.position()
            self.in_head = False


def prepare_page(data, route, title, description, organization=False):
    data = re.sub(r"\n<!-- RHR PUBLIC SEO START -->.*?<!-- RHR PUBLIC SEO END -->\n", "", data, flags=re.S)
    parsed = HeadTags(data)
    if parsed.close is None or parsed.removing:
        raise ValueError('Missing or incomplete document head')
    esc = lambda value: html.escape(value, quote=True)
    tags = [f'<title>{esc(title)}</title>',
            '<meta name="robots" content="index, follow, max-image-preview:large">',
            f'<meta name="description" content="{esc(description)}">',
            f'<link rel="canonical" href="{BASE + route}">',
            '<meta property="og:type" content="website">',
            '<meta property="og:site_name" content="Refugees Helping Refugees">',
            f'<meta property="og:title" content="{esc(title)}">',
            f'<meta property="og:description" content="{esc(description)}">',
            f'<meta property="og:url" content="{BASE + route}">',
            f'<meta property="og:image" content="{LOGO}">',
            '<meta name="twitter:card" content="summary">']
    if organization:
        tags.append('<script type="application/ld+json" id="rhr-public-organization">' +
                    json.dumps(ORGANIZATION, ensure_ascii=False).replace('<', '\\u003c') + '</script>')
    edits = [(a, b, '') for a, b in parsed.ranges]
    edits.append((parsed.close, parsed.close, '\n<!-- RHR PUBLIC SEO START -->\n' + '\n'.join(tags) + '\n<!-- RHR PUBLIC SEO END -->\n'))
    for a, b, replacement in sorted(edits, reverse=True): data = data[:a] + replacement + data[b:]
    return data


def prepare(root):
    # Fail before editing when an expected public page is absent.
    for name in PAGES:
        if not (root / name).is_file(): raise ValueError('Missing public page: ' + name)
    for name, (route, title, description) in PAGES.items():
        path = root / name
        path.write_text(prepare_page(path.read_text(), route, title, description, name == 'index.html'))
    namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9'
    ET.register_namespace('', namespace)
    sitemap = ET.Element('{' + namespace + '}urlset')
    for route, _, _ in PAGES.values():
        entry = ET.SubElement(sitemap, '{' + namespace + '}url')
        ET.SubElement(entry, '{' + namespace + '}loc').text = BASE + route
    ET.ElementTree(sitemap).write(root / 'sitemap.xml', encoding='utf-8', xml_declaration=True)
    (root / 'robots.txt').write_text(
        'User-agent: *\nAllow: /\nDisallow: /wp-admin/\nDisallow: /wp-login.php\n'
        'Disallow: /print\n\nSitemap: ' + BASE + '/sitemap.xml\n')
    print('Prepared public SEO for four pages; private/editor and other routes unchanged.')


if __name__ == '__main__':
    prepare(Path(sys.argv[1]).resolve())
