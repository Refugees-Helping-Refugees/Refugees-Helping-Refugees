<?php
/**
 * Contact modal, opened by any ".js-open-contact-modal" button.
 * Ported from components/contact-modal.tsx. Vanilla JS toggle lives in assets/js/main.js.
 */
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="modal" id="contact-modal" hidden>
  <div class="modal__backdrop js-close-contact-modal"></div>
  <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
    <button type="button" class="modal__close js-close-contact-modal" aria-label="Close">&times;</button>
    <h2 id="contact-modal-title">Contact Us</h2>

    <div class="modal__section">
      <p><a href="tel:+15855637747">📞 <?php echo esc_html(rhr_option('contact_phone', '(585) 563-7747')); ?></a></p>
      <p><a href="mailto:rhr@rhrroc.org">✉️ <?php echo esc_html(rhr_option('contact_email', 'rhr@rhrroc.org')); ?></a></p>
      <p>
        <a href="https://maps.google.com/?q=228+South+Plymouth+Rochester+NY+14608" target="_blank" rel="noreferrer">
          📍 <?php echo nl2br(esc_html(rhr_option('contact_address', "228 South Plymouth\nRochester, NY 14608"))); ?>
        </a>
      </p>
    </div>

    <div class="modal__section modal__section--bordered">
      <h4>Follow Us</h4>
      <a href="https://www.facebook.com/RefugeesHelpingRefugees/" target="_blank" rel="noreferrer">@RefugeesHelpingRefugees</a>
      <a href="https://www.instagram.com/refugeeshelpingrefugees/" target="_blank" rel="noreferrer">@refugeeshelpingrefugees</a>
    </div>
  </div>
</div>
