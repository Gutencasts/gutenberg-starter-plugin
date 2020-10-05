/**
 * Dynamically locate, load & register all Editor Blocks & Plugins.
 *
 * Entry point for the "editor.js" bundle.
 */
import {
  autoloadBlocks,
  autoloadPlugins,
} from 'block-editor-hmr';

import './editor.scss';

const acceptContextModules = (context: __WebpackModuleApi.RequireContext, loadModules: () => __WebpackModuleApi.RequireContext): void => {
  if (module.hot) {
    module.hot.accept(context.id, loadModules);
  }
};

// Load all block index files.
autoloadBlocks({
  getContext: () => require.context('../blocks', true, /index\.tsx?$/),
}, acceptContextModules);

// Load all plugin files.
autoloadPlugins({
  getContext: () => require.context('./plugins', true, /index\.tsx?$/),
}, acceptContextModules);
