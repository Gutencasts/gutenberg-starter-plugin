/**
 * Provide a set of helpers designed to simplify the testing of store-connected
 * components within Finder's block editor codebase. Some of the exported
 * utilities are designed to mock data package methods, while others will
 * configure the data module's store with real values to permit some amount
 * of integration testing when data is too complex to easily mock.
 */
import React from 'react';
import * as data from '@wordpress/data';

import '@testing-library/jest-dom/extend-expect';
import { Actions, Selectors } from './store-provider';

const { createRegistry, RegistryProvider } = data;

/**
 * Replace the WP data module's default registry's select method with a custom
 * implementation to mock returned store values.
 *
 * @param {Function} mock A mock implementation of select().
 */
export const mockSelect = (
  mock: (store: string) => Record<string, unknown>,
): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jest.spyOn(data, 'select').mockImplementation(mock);
};

export const mockDispatch = (
  mock: (store: string) => Record<string, unknown>,
): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jest.spyOn(data, 'dispatch').mockImplementation(mock);
};

/**
 * Generate a mock action element for use with fireEvent.
 * Using a bare stub function causes errors in the action handling code.
 *
 * @returns {Function} A Jest stub function that behaves like an action.
 */
export const mockAction = (): jest.Mock => jest.fn((): {
  type: string;
} => ({ type: '__INERT__' }));

/**
 * Accept a dictionary of mock store selectors & actions and return a
 * React wrapper component which uses WP's RegistryProvider to expose
 * that store data to wrapped child components.
 *
 * @param {Object} stores Dictionary of mock store actions or selectors keyed by store.
 * @returns {React.FC} Store provider wrapper component.
 */
export const createProvider = (
  stores: {
    // Keyed by name of store, e.g. `core/block-editor`.
    [storeKey: string]: {
      actions?: Actions;
      selectors?: Selectors;
    };
  } = {},
): React.FC => ({ children }: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  const registry = createRegistry();

  // Register all provided stores.
  Object.keys(stores).forEach((storeKey) => {
    const store = stores[storeKey];
    registry.registerStore(storeKey, {
      reducer: () => ({}),
      actions: store.actions || {},
      selectors: store.selectors || {},
    });
  });

  return (
    <RegistryProvider value={registry}>
      { children }
    </RegistryProvider>
  );
};

/**
 * Mock up the getBlockType action from the WP store.
 *
 * @param {String} blockName Block to look for.
 * @param {Array} blockStore The store we use to spoof this.
 */
export const getBlockType = (blockName: string, blockStore: BlockSettings[]): BlockSettings => {
  const newBlockStore = [...blockStore];

  const matches = newBlockStore.filter((blockSetting: BlockSettings): boolean => blockSetting.name === blockName);

  return matches[0];
};
