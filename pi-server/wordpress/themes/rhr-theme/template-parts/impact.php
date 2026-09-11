<?php
/**
 * Impact section: banner photo, heading, and a 4-stat grid.
 * Ported from components/impact-section.tsx. This is the anchor the nav calls "About".
 */
if (!defined('ABSPATH')) {
    exit;
}

$banner     = get_field('impact_banner_image');
$banner_url = $banner['url'] ?? get_template_directory_uri() . '/assets/images/refugee-children-banner.png';
$banner_alt = $banner['alt'] ?? 'Three smiling refugee children representing the community RHR serves';
$heading    = get_field('impact_heading') ?: 'Making a Difference';
$subheading = get_field('impact_subheading') ?: "Through community support and dedicated programs, we're helping refugees build new lives in Western New York.";

$stats = get_field('impact_stats');
if (!$stats) {
    $stats = [
        ['number' => '500+', 'label' => 'Refugees Served'],
        ['number' => '15+',  'label' => 'Years of Service'],
        ['number' => '100+', 'label' => 'Active Volunteers'],
        ['number' => '3',    'label' => 'Core Programs'],
    ];
}
?>
<section id="impact" class="impact">
  <div class="container">
    <div class="impact__banner">
      <img src="<?php echo esc_url($banner_url); ?>" alt="<?php echo esc_attr($banner_alt); ?>" loading="lazy">
    </div>
    <div class="section-heading">
      <h2><?php echo esc_html($heading); ?></h2>
      <p><?php echo esc_html($subheading); ?></p>
    </div>
    <div class="stat-grid">
      <?php foreach ($stats as $stat) : ?>
        <div class="stat-card">
          <div class="stat-card__number"><?php echo esc_html($stat['number']); ?></div>
          <div class="stat-card__label"><?php echo esc_html($stat['label']); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
