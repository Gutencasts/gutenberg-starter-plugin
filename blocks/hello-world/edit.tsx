import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { textdomain } from 'src/constants';
// imports our editor facing styles where we need to make adjustments
import './editor.scss';
// imports the same css we use on the FE so our block is within parity.
import './frontend.scss';

export interface HelloWorldAttributes extends Record<string, string> {
  title: string;
}

export interface HelloWorldProps extends DetailedEditComponentProps {
  attributes: HelloWorldAttributes;
}

export const HelloWorldBlock: React.FC<HelloWorldProps> = ({ isSelected, attributes, setAttributes }: HelloWorldProps) => (
  <>
    <div className="hello-world-block">
      <h3 className="hello-world__title">
        {attributes.title ? `Hello World from: ${attributes.title}` : 'Hello world'}
      </h3>
      <button type="button" className="btn btn-primary hello-world__ctx">Click</button>
    </div>
    {
      isSelected && (
        <InspectorControls>
          <PanelBody title={__('Required fields', textdomain)}>
            <PanelRow>
              <TextControl
                value={attributes.title}
                label={__('Title')}
                onChange={(value: string) => setAttributes({
                  title: value,
                })}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      )
    }
  </>
);

export default HelloWorldBlock;
