<?php

namespace GutenbergStarterPlugin\Blocks\HelloWorld\Partials;

function output(string $title): string
{
    ob_start(); ?>

    <div class="hello-world-block">
      <h3 class="hello-world__title">
        <?php echo __('Hello world from: '). $title ?>
      </h3>
      <button class="btn btn-primary hello-world__ctx">Click</button>
    </div>
    <?php
    return (string)ob_get_clean();
}
