<?php
/**
 * The homepage: composes all sections in the same order as the original
 * Next.js app/page.tsx (Header is in header.php, Footer in footer.php).
 */
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main-content">
  <?php get_template_part('template-parts/hero'); ?>
  <?php get_template_part('template-parts/programs'); ?>
  <?php get_template_part('template-parts/volunteer'); ?>
  <?php get_template_part('template-parts/impact'); ?>
  <?php get_template_part('template-parts/location'); ?>
</main>

<?php get_footer(); ?>
