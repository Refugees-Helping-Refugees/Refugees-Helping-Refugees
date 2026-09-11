<?php
/**
 * Hero section: headline, subheading, photo, "Learn More" button.
 * Ported from components/hero-section.tsx. Editable via ACF fields on the front page.
 */
if (!defined('ABSPATH')) {
    exit;
}

$heading    = get_field('hero_heading') ?: 'Empowering Refugees Through Community';
$subheading = get_field('hero_subheading') ?: 'Refugees Helping Refugees (RHR) serves refugees of Western New York, fostering growth, self-determination, and self-reliance by making them agents of their own advancement.';
$image      = get_field('hero_image');
$image_url  = $image['url'] ?? get_template_directory_uri() . '/assets/images/hero-photo.jpg';
$image_alt  = $image['alt'] ?? 'Refugees learning together in a classroom setting';
?>
<section id="hero" class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <h1 class="hero__heading"><?php echo esc_html($heading); ?></h1>
      <p class="hero__subheading"><?php echo esc_html($subheading); ?></p>
      <a href="#programs" class="btn btn--primary js-scroll-link" data-target="programs">Learn More</a>
    </div>
    <div class="hero__image">
      <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>">
    </div>
  </div>
</section>
