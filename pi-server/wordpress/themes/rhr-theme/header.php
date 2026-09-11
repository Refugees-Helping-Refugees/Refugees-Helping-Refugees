<?php
/**
 * The header: sticky nav bar with logo, section links, and the Donate button.
 * Ported from components/header.tsx.
 */
if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__logo" href="<?php echo esc_url(home_url('/')); ?>">
      <?php
      $logo = rhr_option('site_logo');
      if (!empty($logo['url'])) :
      ?>
        <img src="<?php echo esc_url($logo['url']); ?>" alt="<?php bloginfo('name'); ?>">
      <?php else : ?>
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/rhr-logo.jpg'); ?>" alt="<?php bloginfo('name'); ?>">
      <?php endif; ?>
    </a>

    <nav class="site-header__nav" aria-label="Primary">
      <a href="<?php echo esc_url(home_url('/#hero')); ?>" class="js-scroll-link" data-target="hero">Home</a>
      <a href="<?php echo esc_url(home_url('/#impact')); ?>" class="js-scroll-link" data-target="impact">About</a>
      <a href="<?php echo esc_url(home_url('/#programs')); ?>" class="js-scroll-link" data-target="programs">Programs</a>
      <a href="<?php echo esc_url(home_url('/#volunteer')); ?>" class="js-scroll-link" data-target="volunteer">Volunteer</a>
      <button type="button" class="link-button js-open-contact-modal">Contact</button>
    </nav>

    <?php get_template_part('template-parts/donate-cta'); ?>

    <button type="button" class="site-header__menu-toggle js-mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<?php get_template_part('template-parts/contact-modal'); ?>
