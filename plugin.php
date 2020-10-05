<?php
/**
 * Plugin Name:  Gutenberg Starter Plugin
 *
 * Description: Gutenberg Block plugin for defining and controlling blocks available to the editor.
 */
declare(strict_types=1);

namespace GutenbergStarterPlugin;

// Auto-load PHP Editor Blocks.
require_once __DIR__ . '/inc/blocks.php';
Blocks\setup();

require_once __DIR__ . '/inc/asset-loader.php';
require_once __DIR__ . '/inc/scripts.php';
Scripts\setup();