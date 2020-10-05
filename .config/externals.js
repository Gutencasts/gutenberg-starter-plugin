/**
 * Define how to map imported packages onto WP-loaded global JS objects.
 * We build upon the webpack-helpers' externals list and customize it based on
 * which packages we need to install locally and include as part of our editor
 * JS bundle in order to access features within the block editor that have
 * been released since our current core WordPress version.
 */
const { externals } = require('@humanmade/webpack-helpers');

module.exports = externals;
