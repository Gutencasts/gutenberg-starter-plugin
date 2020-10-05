<?php
/**
 * Register scripts in development and production.
 */
declare(strict_types=1);

namespace GutenbergStarterPlugin\Scripts;

use GutenbergStarterPlugin\AssetLoader;

const EDITOR_BUNDLE_HANDLE = 'admin-editor-blocks';

/**
 * Connect namespace functions to actions & hooks.
 *
 * @return void
 */
function setup()
{
    add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueueBlockFrontendAssets');
    add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueueBlockEditorAssets');
}

function manifestFilePath() : string
{
    $pluginPath = trailingslashit(plugin_dir_path(dirname(__FILE__)));
    return $pluginPath . 'build/asset-manifest.json';
}


/**
 * Enqueue editor-only assets based on the generated `asset-manifest.json` file.
 *
 * @return void
 */
function enqueueBlockEditorAssets() : void
{
    AssetLoader\enqueueAsset(
        manifestFilePath(),
        'editor.js', // Match the `entry: { 'editor': {} }` bundle in the Webpack config.
        [
           'handle' => EDITOR_BUNDLE_HANDLE,
           'scripts' => [
               'wp-blocks',
               'wp-components',
               'wp-compose',
               'wp-data',
               'wp-edit-post',
               'wp-editor',
               'wp-element',
               'wp-i18n',
               'wp-plugins',
               'wp-rich-text',
               'wp-shortcode',
               'wp-url',
           ],
           'transformDevURI' => [
               'https://pub.gutencast.test/gutenberg-starter-plugin/',
               plugins_url('gutenberg-starter-plugin/build/', dirname(__DIR__)),
            ],
        ]
    );

    AssetLoader\enqueueAsset(
        manifestFilePath(),
        'editor.css',
        [
            'handle' => EDITOR_BUNDLE_HANDLE,
            'styles' => [],
            'transformDevURI' => [
                '/gutenberg-starter-plugin/',
                plugins_url('gutenberg-starter-plugin/build/', dirname(__DIR__)),
            ],
        ]
    );
}

/**
 * Enqueue assets used both in the editor and on the frontend based on the generated `asset-manifest.json` file.
 *
 * @return void
 */
function enqueueBlockFrontendAssets() : void
{
    AssetLoader\enqueueAsset(
        manifestFilePath(),
        'frontend-styles.css',
        [
            'handle' => 'gutenberg-starter-plugin',
            'styles' => [],
            'transformDevURI' => [
                '/gutenberg-starter-plugin/',
                plugins_url('gutenberg-starter-plugin/build/', dirname(__DIR__)),
            ],
        ]
    );
}
