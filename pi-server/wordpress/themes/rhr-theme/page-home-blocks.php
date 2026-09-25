<?php
/* Template Name: Visual Homepage */
if (!defined('ABSPATH')) exit;
get_header();
echo '<main id="main-content" class="rhr-block-home">';
while(have_posts()){the_post();the_content();}
echo '</main>';
get_footer();
