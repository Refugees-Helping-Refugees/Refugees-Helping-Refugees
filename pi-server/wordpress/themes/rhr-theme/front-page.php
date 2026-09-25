<?php
if (!defined('ABSPATH')) exit;
get_header();
?>
<main id="main-content" class="rhr-block-home">
<?php
if (has_blocks(get_post_field('post_content', get_queried_object_id()))) {
    while (have_posts()) { the_post(); the_content(); }
} else {
    foreach (['hero','programs','volunteer','impact','location'] as $section) get_template_part('template-parts/' . $section);
}
?>
</main>
<?php get_footer(); ?>
