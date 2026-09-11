<?php
/**
 * Fallback template required by WordPress for every theme. In this site
 * front-page.php (homepage) and page.php (other pages) handle everything
 * that's actually used; this only renders if WordPress can't find a more
 * specific template.
 */
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main-content">
  <section class="page-content">
    <div class="container">
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="page-content__body"><?php the_content(); ?></div>
      <?php endwhile; else : ?>
        <p>Nothing found.</p>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php get_footer(); ?>
