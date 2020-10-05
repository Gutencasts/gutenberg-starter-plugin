<?php namespace GutenbergStarterPlugin\Tests;

use WP_Mock;

require_once dirname(__DIR__) . '/vendor/autoload.php';

// Now call the bootstrap method of WP Mock
WP_Mock::setUsePatchwork(true);
WP_Mock::bootstrap();

require_once dirname(__DIR__). '/inc/asset-loader.php';
require_once dirname(__DIR__) . '/inc/blocks.php';
require_once dirname(__DIR__) . '/inc/scripts.php';


// block files

require_once dirname(__DIR__) . '/blocks/hello-world/register.php';
