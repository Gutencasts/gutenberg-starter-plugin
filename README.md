

## Gutenberg Starter Plugin
![Imgur](https://i.imgur.com/CGbvd7M.jpeg)
 This is a modern base WordPress Gutenberg plugin that includes all the needed boilerplate to get
 started with block-development. What's included out of the box:

  - [x] - Hot Reload utilizing (block-editor-hmr)[https://github.com/kadamwhite/block-editor-hmr] for local development
  - [x] - Complete TypeScript support with handy definitions
  - [x] - ESNext
  - [x] - SCSS
  - [x] - ESlint configuration and linting commands like `yarn lint:js:fix`
  - [x] - PHPUnit, WP_Mock, and Jest for writing unit tests
  - [x] - Example hello-world block

## Local Development

**`yarn install`**: Install JavaScript dependencies.

**`yarn start`**: Runs the local development server (hot-reload). You may need to configure your browser to permit self-signed SSL certificates; in Chrome, this setting can be accessed at [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost).

**`yarn build`**: Builds all of the editor and frontend facing assets for when you are ready to deploy
or don't need to use hot-reload.

## Creating new blocks

* Create a subfolder in `blocks` with your `block-name` eg `my-custom-block`
* Create a block.json in your `block-name` folder and add all the block metadata to the file
  * You may find all valid metadata values (here)[https://developer.wordpress.org/block-editor/developers/block-api/block-registration/]
* Create a `register.php` function with a `setup` method to render your block on the frontend
* Create an `index.ts` file to register your block in the block-editor and optional `Edit.tsx` file to manage your edit component
* Create a `frontend.scss` file for frontend facing styles in your block
* Create a `script.ts` file for frontend facing JavaScript in your block

Consult the [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/) for more information and resources around block development.

## File Structure

 Directory             | Purpose
---------------------- | --------
[`.config`](./.config) | Build configuration and linting rules.
[`@types`](./@types)   | Plugin-specific TypeScript type definitions.
[`blocks`](./blocks)   | All block-specific code, of all file types.
[`build/`](./build)    | Production-ready frontend asset bundles, created using the Webpack build process defined at the [top level of this repository](../../.config).
[`inc/`](./inc)        | All non-block PHP code, organized into namespaces.
[`src/`](./src)        | Non-block TypeScript modules.

## TODO
 * Add example Format
 * Add example Plugin
 * Provide example of writing tests with stores
 * Add test coverage for inc/

## Credits
  * Inspired from (modern-wp-plugin)[https://github.com/kadamwhite/modern-wp-plugin] by (K Adam White)[https://github.com/kadamwhite]
  * More to come!
