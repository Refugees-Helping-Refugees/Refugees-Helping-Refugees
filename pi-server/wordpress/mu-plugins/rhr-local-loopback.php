<?php
/** Plugin Name: RHR private loopback */
if (!defined('ABSPATH')) { exit; }
add_filter('pre_http_request', function ($response, $args, $url) {
 if (false !== $response) { return $response; }
 $p = wp_parse_url($url);
 if (($p['scheme'] ?? '') !== 'https' || ($p['host'] ?? '') !== 'edit.rhrroc.org' || isset($p['user']) || isset($p['pass']) || (isset($p['port']) && $p['port'] !== 443)) { return $response; }
 $internal = 'http://wordpress/' . ltrim($p['path'] ?? '/', '/');
 if (isset($p['query'])) { $internal .= '?' . $p['query']; }
 $args['headers']['Host'] = 'edit.rhrroc.org';
 $args['headers']['X-Forwarded-Proto'] = 'https';
 $args['redirection'] = 0;
 return wp_remote_request($internal, $args);
}, 10, 3);
