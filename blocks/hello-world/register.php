<?php

namespace GutenbergStarterPlugin\Blocks\HelloWorld;

use GutenbergStarterPlugin\AssetLoader;
use GutenbergStarterPlugin\Scripts;

function setup()
{
    register_block_type_from_metadata(
        __DIR__,
        [
            'render_callback' => __NAMESPACE__ . '\\renderHelloWorld',
        ]
    );
}

function loadAssets()
{
    AssetLoader\enqueueAsset(
        Scripts\manifestFilePath(),
        'blocks/hello-world-styles.css',
        [
        'handle' => 'hello-world',
        'styles' => [],
        'transformDevURI' => [
            '/gutenberg-starter-plugin/',
            plugins_url('gutenberg-starter-plugin/build/', dirname(__DIR__)),
        ],
        ]
    );

    AssetLoader\enqueueAsset(
        Scripts\manifestFilePath(),
        'blocks/hello-world-scripts.js',
        [
        'handle' => 'hello-world',
        'styles' => [],
        'transformDevURI' => [
            '/gutenberg-starter-plugin/',
            plugins_url('gutenberg-starter-plugin/build/', dirname(__DIR__)),
        ],
        ]
    );
}

function renderHelloWorld(array $attributes): string
{
    loadAssets();
    return Partials\output($attributes['title']);
}
