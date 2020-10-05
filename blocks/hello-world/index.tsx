import React from 'react';
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';
import { textdomain } from 'src/constants';
import Edit from './edit';
import blockData from './block.json';

const blockSettings = blockData as BlockSettingsJSON;

export const name = 'gutenberg-starter-plugin/hello-world';

export const settings = {
  title: __('Example hello world block', textdomain),

  description: __('Lorem ipsum', textdomain),

  edit: Edit,

  save(): JSX.Element {
    return (
      <InnerBlocks.Content />
    );
  },

  ...blockSettings,
};
