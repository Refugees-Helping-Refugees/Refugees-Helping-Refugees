<?php
/**
 * Volunteer section: photo + copy + "Sign Up to Volunteer" button.
 * Ported from components/volunteer-section.tsx.
 */
if (!defined('ABSPATH')) {
    exit;
}

$heading   = get_field('volunteer_heading') ?: 'Join Our Volunteer Community';
$para_1    = get_field('volunteer_paragraph_1') ?: 'Refugees Helping Refugees is a largely volunteer-run organization. Because RHR is a nonprofit and receives limited funding from grants for operational and programming costs, the organization is able to offer few paid positions.';
$para_2    = get_field('volunteer_paragraph_2') ?: 'This makes the need for proactive, empowered, and passionate volunteers essential to our survival. Our volunteers are reliable and innovative, and seek to make a positive difference in the refugee and Rochester community.';
$signup    = get_field('volunteer_signup_url') ?: 'https://docs.google.com/forms/d/e/1FAIpQLSe6YQgyUgzJf319oM_PUYlNNKlHOQbIDWtBHbdhkDUAbLzIyg/viewform';
$image     = get_field('volunteer_image');
$image_url = $image['url'] ?? get_template_directory_uri() . '/assets/images/refugee-portraits-hq.jpeg';
$image_alt = $image['alt'] ?? 'Diverse group of refugees showing dignity and humanity';
?>
<section id="volunteer" class="volunteer">
  <div class="container volunteer__grid">
    <div class="volunteer__image">
      <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>" loading="lazy">
    </div>
    <div class="volunteer__copy">
      <h2><?php echo esc_html($heading); ?></h2>
      <p><?php echo esc_html($para_1); ?></p>
      <p><?php echo esc_html($para_2); ?></p>
      <a href="<?php echo esc_url($signup); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Sign Up to Volunteer</a>
    </div>
  </div>
</section>
