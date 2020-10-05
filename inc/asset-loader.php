<?php
/**
 * Register and enqueue files declared in JSON webpack asset manifests.
 */
declare(strict_types=1);

namespace GutenbergStarterPlugin\AssetLoader;

/**
 * Attempt to load a file at the specified path and parse its contents as JSON.
 *
 * @param string $path The path to the JSON file to load.
 * @return array|null;
 */
function loadAssetManifest($path) : ?array
{
    // Avoid repeatedly opening & decoding the same file.
    static $manifests = [];

    if (isset($manifests[$path])) {
        return $manifests[$path];
    }


    if (! file_exists($path)) {
        // Check one level up for a committed manifest file.
        $manifestFile = basename($path);
        $path = dirname($path, 2) . '/' . $manifestFile;
        // Fail out if that manifest does not exist either.
        if (! file_exists($path)) {
            return null;
        }
    }

    $contents = file_get_contents($path);

    if (empty($contents)) {
        return null;
    }

    $manifests[$path] = json_decode($contents, true);

    return $manifests[$path];
}

/**
 * Attempt to extract a specific value from an asset manifest file.
 *
 * @param string $manifestPath File system path for an asset manifest JSON file.
 * @param string $asset        Asset to retrieve within the specified manifest.
 * @return string|null;
 */
function getManifestResource(string $manifestPath, string $asset) : ?string
{
    $devAssets = loadAssetManifest($manifestPath);

    if (! isset($devAssets[$asset])) {
        return null;
    }

    return $devAssets[$asset];
}

/**
 * Helper function to naively check whether or not a given URI is a CSS resource.
 *
 * @param string $uri A URI to test for CSS-ness.
 * @return boolean Whether that URI points to a CSS file.
 */
function isCSS(string $uri) : bool
{
    return preg_match('/\.css(\?.*)?$/', $uri) === 1;
}

/**
 * Attempt to register a particular script bundle from a manifest.
 *
 * @param string $manifestPath File system path for an asset manifest JSON file.
 * @param string $targetAsset  Asset to retrieve within the specified manifest.
 * @param array  $options {
 *     @type string $handle          Handle to use when enqueuing the style/script bundle.
 *                                   Required.
 *     @type string $transformDevURI Search-replace string replacement to apply to URIs in
 *                                   development environment. Optional.
 *     @type array  $scripts         Script dependencies. Optional.
 *     @type array  $styles          Style dependencies. Optional.
 * }
 * @return void;
 */
function registerAsset(string $manifestPath, string $targetAsset, array $options = []) : void
{
    $defaults = [
        'transformDevURI' => [],
        'scripts' => [],
        'styles' => [],
    ];
    $options = wp_parse_args($options, $defaults);

    $assetURI = getManifestResource($manifestPath, $targetAsset);

    if (empty($assetURI)) {
        return;
    }

    $isDevelopment = getenv('APPLICATION_ENV') === 'development';

    // In development environments where the build directory exists, apply any provided URI transforms.
    if ($isDevelopment && file_exists($manifestPath) && count($options['transformDevURI']) === 2) {
        list($from, $to) = $options['transformDevURI'];
        $assetURI = str_replace($from, $to, $assetURI);
    }

    $pluginPath = plugin_dir_url(__DIR__) . 'build/';

    /**
     *  This piece can be ripped out to just $assetURI if you plan on
     *  using some sort of CDN.
     */
    $hasLocalHostBuild = strpos($assetURI,'localhost') !== false;
    $fullPath = !$hasLocalHostBuild ? $pluginPath . $assetURI : $assetURI;

    if (isCSS($assetURI)) {
        wp_register_style(
            $options['handle'],
            $fullPath,
            $options['styles']
        );
    } else {
        wp_register_script(
            $options['handle'],
            $fullPath,
            $options['scripts'],
            false,
            true
        );
    }
}

/**
 * Attempt to register and then enqueue a particular script bundle from a manifest.
 *
 * @param string $manifestPath File system path for an asset manifest JSON file.
 * @param string $targetAsset  Asset to retrieve within the specified manifest.
 * @param array  $options {
 *     @type string $handle          Handle to use when enqueuing the style/script bundle.
 *                                   Required.
 *     @type string $transformDevURI Search-replace string replacement to apply to URIs in
 *                                   development environment. Optional.
 *     @type array  $scripts         Script dependencies. Optional.
 *     @type array  $styles          Style dependencies. Optional.
 * }
 * @return void;
 */
function enqueueAsset(string $manifestPath, string $targetAsset, array $options = []) : void
{
    registerAsset($manifestPath, $targetAsset, $options);

    // $targetAsset will share a filename extension with the enqueued asset.
    if (isCSS($targetAsset)) {
        wp_enqueue_style($options['handle']);
    } else {
        wp_enqueue_script($options['handle']);
    }
}
