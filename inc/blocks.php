<?php
/**
 * Block auto-loader.
 */
declare(strict_types=1);

namespace GutenbergStarterPlugin\Blocks;

/**
 * Connect namespace functions to actions & hooks.
 *
 * @return void
 */
function setup()
{
    // Auto-load all PHP-defined blocks.
    autoregisterCustomBlocks();

    // Register actions & filters.
    add_filter('block_categories', __NAMESPACE__ . '\\addStarterBlocks');
}

/**
 * Register a custom block category for this plugin.
 *
 * @param array $categories The list of available block categories.
 * @return array The filtered categories list.
 */
function addStarterBlocks(array $categories)
{
    return array_merge($categories, [
        [
            'slug' => 'starter-blocks',
            'title' => 'Starter Blocks',
        ],
    ]);
}

/**
 * Extract the block name from a directory path.
 *
 *
 * @param string $blockFilePath Path to a block's php file.
 * @return string The name of the block, in Pascal case.
 */
function getBlockHandleFromPath(string $blockFilePath) : string
{
    $path = str_replace(
        [dirname(__DIR__) . '/blocks/', '/register.php'],
        ['', ''],
        $blockFilePath
    );

    // Handle block names in sub-directories.
    if (stripos($path, '/') !== false) {
        $explodePath = explode('/', $path);
        $path        = end($explodePath);
    }

    return $path;
}

/**
 * Get the expected PHP namespace from the block name.
 *
 * @param string      $blockHandle Block handle name, harpoon-case.
 * @param string|null $space       Sub-directory namespace.
 * @return string Expected PHP namespace, in PascalCase.
 */
function getNamespaceFromBlockHandle(string $blockHandle, ?string $space = null) : string
{
    // Add a prefix namespace to the generic namespace, if passed a sub-directory space.
    $prefix = 'GutenbergStarterPlugin\\Blocks';
    if ($space) {
        $prefix .= '\\' . ucwords($space);
    }

    // Modify the block handle to remove space, and dashes and make the string PascalCase.
    $blockNamespace = str_replace(' ', '', ucwords(str_replace('-', ' ', $blockHandle)));

    return sprintf(
        '%s\\%s',
        $prefix,
        $blockNamespace
    );
}

/**
 * Dynamically register custom blocks if a registration file exists.
 */
function autoregisterCustomBlocks()
{
    // Load any partials files exposing HTML generation functions.
    // These files are expected to live within `/partials` in each block's directory.
    foreach (glob(dirname(__DIR__) . '/blocks/*/partials/*.php') as $file) {
        require_once($file);
    }

    // Each registered block must have an entrypoint in /blocks/{blockname}/register.php.
    foreach (glob(dirname(__DIR__) . '/blocks/**/register.php') as $file) {
        require_once($file);
        $blockHandle = getBlockHandleFromPath($file);
        $setup    = getNamespaceFromBlockHandle($blockHandle) . '\\setup';
        $register = getNamespaceFromBlockHandle($blockHandle) . '\\registerBlock';

        $blockData = loadBlockConfig($blockHandle);

        if (! $blockData) {
            continue;
        }

        // If we have extra setup needs, run those hooks. (setup())
        if (function_exists($setup)) {
            call_user_func($setup);
        }

        // Run our block registration. (registerBlock())
        if (function_exists($register)) {
            add_action('init', function () use ($register, $blockData) {
                call_user_func($register, $blockData);
            });
        }
    }
}

/**
 * Load in a JSON block configuration file.
 *
 * @param string $blockSlug Name of the block configuration to load.
 * @return array|null
 */
function loadBlockConfig(string $blockSlug) : ?array
{
    $path = dirname(__DIR__) . '/blocks/' . $blockSlug . '/block.json';

    if (! file_exists($path)) {
        return null;
    }

    $fileData = file_get_contents($path);

    if (! $fileData) {
        return null;
    }

    return json_decode($fileData, true);
}
