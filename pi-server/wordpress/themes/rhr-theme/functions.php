<?php
/**
 * RHR Theme functions and definitions.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_theme_support('title-tag');
add_theme_support('post-thumbnails');
add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);

register_nav_menus([
    'primary' => __('Primary Menu', 'rhr-theme'),
]);

function rhr_enqueue_assets() {
    wp_enqueue_style('rhr-main', get_template_directory_uri() . '/assets/css/main.css', [], '1.0');
    wp_enqueue_script('rhr-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'rhr_enqueue_assets');

// Sitewide editable settings (donate button, contact info) live on an ACF
// Options Page rather than in individual posts/pages.
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Site Settings',
        'menu_title' => 'Site Settings',
        'menu_slug'  => 'rhr-site-settings',
        'capability' => 'edit_posts',
    ]);
}

// Load ACF field group definitions committed with the theme, so field
// structure travels with the code instead of only living in the database.
add_filter('acf/settings/save_json', function () {
    return get_stylesheet_directory() . '/acf-json';
});
add_filter('acf/settings/load_json', function ($paths) {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});

/**
 * Small helper: read an Options Page field with a fallback, so templates
 * don't break before an editor has filled in Site Settings yet.
 */
function rhr_option(string $key, $default = '') {
    if (!function_exists('get_field')) {
        return $default;
    }
    $value = get_field($key, 'option');
    return $value !== null && $value !== '' ? $value : $default;
}

// Match native block editing to the public homepage design.
add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style(['assets/css/main.css', 'assets/css/blocks.css']);
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('rhr-blocks', get_template_directory_uri().'/assets/css/blocks.css', ['rhr-main'], '1.0');
});
add_filter('acf/load_field_group', function ($group) {
    if (($group['key'] ?? '') === 'group_rhr_front_page' && has_blocks(get_post_field('post_content', (int)get_option('page_on_front')))) $group['active'] = false;
    return $group;
});
