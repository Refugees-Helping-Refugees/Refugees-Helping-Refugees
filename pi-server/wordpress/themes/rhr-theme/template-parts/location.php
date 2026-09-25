<?php
/**
 * Location section: address/phone/email card, "Open in Maps" + "Contact Us"
 * buttons, and an embedded Google Map.
 * Ported from components/location-section.tsx.
 */
if (!defined('ABSPATH')) {
    exit;
}

$address  = rhr_option('contact_address', '228 South Plymouth Ave, Rochester, NY 14608');
$phone    = rhr_option('contact_phone', '(585) 563-7747');
$email    = rhr_option('contact_email', 'rhr@rhrroc.org');
$maps_url = 'https://maps.google.com/?q=' . rawurlencode($address);
$embed_src = get_field('location_map_embed_url') ?: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.8234567890123!2d-77.6109!3d43.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b3c4d5e6f7a8%3A0x1234567890abcdef!2s228%20South%20Plymouth%20Ave%2C%20Rochester%2C%20NY%2014608!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus';
?>
<section class="location">
  <div class="container">
    <div class="section-heading">
      <h2>Visit Us</h2>
      <p>Find us in the heart of Rochester, NY. We're here to serve our community and welcome visitors.</p>
    </div>
    <div class="location__grid">
      <div class="location__card">
        <h3>Our Location</h3>
        <p><strong>Address:</strong> <?php echo esc_html($address); ?></p>
        <p><strong>Phone:</strong> <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', rhr_option('contact_phone', '(585) 563-7747'))); ?>"><?php echo esc_html($phone); ?></a></p>
        <p><strong>Email:</strong> <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></p>
        <div class="location__actions">
          <a href="<?php echo esc_url($maps_url); ?>" target="_blank" rel="noreferrer" class="btn btn--outline">Open in Maps</a>
          <button type="button" class="btn btn--outline js-open-contact-modal">Contact Us</button>
        </div>
      </div>
      <div class="location__map">
        <iframe
          src="<?php echo esc_url($embed_src); ?>"
          width="100%" height="100%" style="border:0" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Refugees Helping Refugees Location"></iframe>
      </div>
    </div>
  </div>
</section>
