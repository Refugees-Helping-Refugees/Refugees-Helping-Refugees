<?php
/**
 * Generic fallback template for any additional WordPress pages beyond the
 * homepage (e.g. if the client later adds a standalone About or Programs page).
 */
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main-content">
  <section class="page-content">
    <div class="container">
      <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="page-content__body"><?php the_content(); ?></div>
      <?php endwhile; ?>
    </div>
  </section>
</main>

<?php get_footer(); ?>
