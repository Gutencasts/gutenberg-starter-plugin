import ReactDOM from 'react-dom';
import React, { useLayoutEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';

export const DisplayHelloWorld: React.FC = () => {
  const [toolbarEl, setToolbarEl] = useState<Element | null>(null);

  useLayoutEffect(() => {
    const Toolbar = document.querySelector('.edit-post-header__toolbar');

    if (Toolbar) {
      setToolbarEl(Toolbar);
    }
  }, []);

  if (toolbarEl) {
    return ReactDOM.createPortal(
      <div>
        <h3>{__('⚡ Gutenberg Starter Plugin ⚡', 'gutencasts')}</h3>
      </div>,
      toolbarEl,
    );
  }
  return null;
};

export const name = 'finder-display-niche-code';

export const settings = {
  render: DisplayHelloWorld,
};
