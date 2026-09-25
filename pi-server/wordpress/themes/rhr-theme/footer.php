<?php
/**
 * The footer: contact info, quick links, donate/volunteer links, social links.
 * Ported from components/footer.tsx.
 */
if (!defined('ABSPATH')) {
    exit;
}
?>
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">

      <div class="site-footer__col">
        <h3>Contact Us</h3>
        <p><a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', rhr_option('contact_phone', '(585) 563-7747'))); ?>"><?php echo esc_html(rhr_option('contact_phone', '(585) 563-7747')); ?></a></p>
        <p><a href="mailto:<?php echo esc_attr(rhr_option('contact_email', 'rhr@rhrroc.org')); ?>"><?php echo esc_html(rhr_option('contact_email', 'rhr@rhrroc.org')); ?></a></p>
        <p>
          <a href="<?php echo esc_url('https://maps.google.com/?q=' . rawurlencode(rhr_option('contact_address', '228 South Plymouth Ave, Rochester, NY 14608'))); ?>" target="_blank" rel="noreferrer">
            <?php echo nl2br(esc_html(rhr_option('contact_address', "228 South Plymouth\nRochester, NY 14608"))); ?>
          </a>
        </p>
      </div>

      <div class="site-footer__col">
        <h3>Quick Links</h3>
        <a href="<?php echo esc_url(home_url('/#impact')); ?>" class="js-scroll-link" data-target="impact">About Us</a>
        <a href="<?php echo esc_url(home_url('/#programs')); ?>" class="js-scroll-link" data-target="programs">Programs</a>
        <a href="<?php echo esc_url(home_url('/#volunteer')); ?>" class="js-scroll-link" data-target="volunteer">Volunteer</a>
        <button type="button" class="link-button js-open-contact-modal">Contact</button>
      </div>

      <div class="site-footer__col">
        <h3>Get Involved</h3>
        <?php get_template_part('template-parts/donate-cta', null, ['class' => 'site-footer__donate-link']); ?>
        <a href="<?php echo esc_url(home_url('/#volunteer')); ?>" class="js-scroll-link" data-target="volunteer">Volunteer</a>
      </div>

      <div class="site-footer__col">
        <h3>Follow Us</h3>
        <a href="https://www.facebook.com/RefugeesHelpingRefugees/" target="_blank" rel="noreferrer" class="site-footer__social">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>
          @RefugeesHelpingRefugees
        </a>
        <a href="https://www.instagram.com/refugeeshelpingrefugees/" target="_blank" rel="noreferrer" class="site-footer__social">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.94.01 9.28 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"/></svg>
          @refugeeshelpingrefugees
        </a>
      </div>

    </div>

    <div class="site-footer__bottom">
      <p>&copy; <?php echo esc_html(date('Y')); ?> Refugees Helping Refugees. All rights reserved.</p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
