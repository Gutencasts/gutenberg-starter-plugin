import React from 'react';
import { createRegistry, RegistryProvider } from '@wordpress/data';

export interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: (...args: readonly any[]) => any
}

export interface Selectors {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: (state: Record<string, unknown>, ...args: readonly any[]) => any;
}

/**
 * Accept a dictionary of mock store selectors & actions and return a
 * React wrapper component which uses WP's RegistryProvider to expose
 * that store data to wrapped child components.
 *
 * @param {Object} stores Dictionary of mock store actions or selectors keyed by store.
 * @returns {React.FC} Store provider wrapper component.
 */
export const storeProvider = (
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
      { children}
    </RegistryProvider>
  );
};
