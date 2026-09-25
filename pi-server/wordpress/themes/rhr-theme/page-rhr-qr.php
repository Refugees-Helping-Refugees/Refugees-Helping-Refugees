<?php
if (!defined('ABSPATH')) { exit; }
get_header();
$languages=['english'=>'English','arabic'=>'Arabic / عربي','spanish'=>'Spanish / Español','somali'=>'Somali / Soomaali','dari'=>'Dari / دری'];
?>
<main id="main-content" class="container" style="padding:2rem 1rem 3rem">
<h1>RHR Community Information</h1>
<nav aria-label="Poster language" style="display:flex;flex-wrap:wrap;gap:1rem;margin:1.5rem 0">
<?php foreach($languages as $key=>$label): ?>
<a class="btn btn--primary" href="#poster-<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></a>
<?php endforeach; ?>
</nav>
<?php foreach($languages as $key=>$label): ?>
<section id="poster-<?php echo esc_attr($key); ?>" style="scroll-margin-top:8rem;margin:3rem auto;max-width:850px">
<h2><?php echo esc_html($label); ?></h2>
<p><a href="<?php echo esc_url(home_url('/poster/poster_'.$key.'.pdf')); ?>">Download PDF — <?php echo esc_html($label); ?></a></p>
<?php for($n=1;$n<=6;$n++): ?>
<img loading="lazy" style="display:block;width:100%;height:auto;margin:1rem 0" src="<?php echo esc_url(home_url('/poster/'.$key.'/page-'.$n.'.png')); ?>" alt="<?php echo esc_attr($label.' — page '.$n); ?>">
<?php endfor; ?>
</section>
<?php endforeach; ?>
</main>
<?php get_footer(); ?>
