import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useSelect, useDispatch } from '@wordpress/data';

import '@testing-library/jest-dom/extend-expect';

import { createProvider, mockAction } from '../store';

describe('createProvider', () => {
  afterEach(cleanup);

  it('returns a React component', () => {
    const StoreWrapper = createProvider();
    const { container } = render((
      <StoreWrapper />
    ));
    expect(container.innerHTML).toBe('');
  });

  it('exposes store selectors to child components', () => {
    const StoreWrapper = createProvider({
      'store/name': {
        selectors: {
          getValue: (): string => 'store content',
        },
      },
    });
    const Test: React.FC = () => {
      const data = useSelect((select): { value: string } => ({
        value: select('store/name').getValue(),
      }));
      return (
        <p>{data.value}</p>
      );
    };

    const { getByText } = render((
      <StoreWrapper>
        <Test />
      </StoreWrapper>
    ));

    expect(getByText('store content')).toBeInTheDocument();
  });

  it('exposes store actions to child components', () => {
    const onClick = mockAction();
    const StoreWrapper = createProvider({
      'store/name': {
        actions: {
          onClick,
        },
      },
    });
    const Test: React.FC = () => {
      // eslint-disable-next-line no-shadow
      const { onClick } = useDispatch('store/name');
      return (
        <button type="button" onClick={onClick}>Click Me</button>
      );
    };

    const { getByText } = render((
      <StoreWrapper>
        <Test />
      </StoreWrapper>
    ));

    const button = getByText('Click Me');
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeInTheDocument();
    fireEvent.click(button, {});
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
