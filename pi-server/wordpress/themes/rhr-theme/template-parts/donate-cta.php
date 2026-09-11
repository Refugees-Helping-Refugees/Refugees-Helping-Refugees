<?php
/**
 * Reusable Donate button, used in both the header and footer.
 * URL/label are editable via the "Site Settings" ACF Options Page.
 */
if (!defined('ABSPATH')) {
    exit;
}

$class = $args['class'] ?? 'btn btn--donate';
?>
<a class="<?php echo esc_attr($class); ?>"
   href="<?php echo esc_url(rhr_option('donate_button_url', 'https://www.zeffy.com/en-US/donation-form/donate-to-refugees-helping-refugees')); ?>"
   target="_blank" rel="noopener noreferrer">
  <?php echo esc_html(rhr_option('donate_button_text', 'Donate Now')); ?>
</a>
