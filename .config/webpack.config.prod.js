/**
 * This file defines the production build configuration
 */
const { helpers, plugins, presets } = require('@humanmade/webpack-helpers');

const { filePath } = helpers;
const { clean, manifest, miniCssExtract } = plugins;

const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const externals = require('./externals');

const { dynamicJsFiles, dynamicCssFiles } = require('./block-assets');

module.exports = presets.production({
  externals,
  resolve: {
    plugins: [new TSConfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: {
    ...{
      editor: filePath('src/editor.tsx'),
      'frontend-styles': filePath('src/frontend.scss'),
    },
    ...dynamicCssFiles(),
    ...dynamicJsFiles(),
  },
  output: {
    path: filePath('build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  plugins: [
    clean(),
    miniCssExtract({
      filename: '[name].[contenthash].css',
    }),
    manifest(),
  ],
});
