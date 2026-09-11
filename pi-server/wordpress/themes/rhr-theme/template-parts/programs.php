<?php
/**
 * Programs section: a card grid of program cards.
 * Ported from components/programs-section.tsx. The two seeded programs (ESOL
 * Classes, Case Management) become an ACF repeater so editors can add/edit/remove
 * cards without touching code.
 */
if (!defined('ABSPATH')) {
    exit;
}

$programs = get_field('programs');
if (!$programs) {
    // Fallback content matching the original site, shown until an editor
    // fills in the "Programs" repeater field on this page.
    $programs = [
        [
            'title'       => 'ESOL Classes',
            'description' => 'Three levels of English for speakers of other languages taught by certified ESOL teachers',
            'image'       => ['url' => get_template_directory_uri() . '/assets/images/program-esol.jpg', 'alt' => 'Students learning English in a classroom'],
        ],
        [
            'title'       => 'Case Management',
            'description' => 'A dynamic process that promotes advocacy, communication and referrals between clients, organizations, and governmental agencies',
            'image'       => ['url' => get_template_directory_uri() . '/assets/images/program-case-mgmt.jpg', 'alt' => 'Case manager helping a client with paperwork'],
        ],
    ];
}
?>
<section id="programs" class="programs">
  <div class="container">
    <div class="section-heading">
      <h2>Our Programs</h2>
      <p>We offer a variety of programs that ensure our clients are able to achieve sustainability as new Americans.</p>
    </div>
    <div class="card-grid">
      <?php foreach ($programs as $program) :
        $img = $program['image'] ?? [];
        $img_url = is_array($img) ? ($img['url'] ?? '') : '';
        $img_alt = is_array($img) ? ($img['alt'] ?? $program['title']) : $program['title'];
      ?>
        <div class="card">
          <?php if ($img_url) : ?>
            <div class="card__image">
              <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($img_alt); ?>" loading="lazy">
            </div>
          <?php endif; ?>
          <div class="card__body">
            <h3 class="card__title"><?php echo esc_html($program['title']); ?></h3>
            <p class="card__description"><?php echo esc_html($program['description']); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
