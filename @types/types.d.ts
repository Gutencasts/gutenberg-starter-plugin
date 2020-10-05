declare module 'block-editor-hmr';

interface StringListDictionary {
  [key: string]: string[];
}

interface DetailedEditComponentProps<Attributes = Record<string, unknown>> {
  // Some keys are known, others may be injected with select.
  clientId: string;
  className?: string;
  isSelected: boolean;
  name?: string;
  attributes: Attributes;
  setAttributes: (attributes: Attributes) => void;
  [key: string]: any;
}

interface EditFormatProps {
  activeAttributes: Record<string, unknown>;
  activeObjectAttributes: Record<string, unknown>;
  isActive: boolean;
  isObjectActive: boolean;
  onChange: (value: import('@wordpress/rich-text').Value) => void;
  onFocus: () => void;
  formatTypes: any;
  value: import('@wordpress/rich-text').Value;
}

interface SaveComponentProps {
  attributes: Record<string, unknown>;
}

// Subset of BlockSettings
// See https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#block-configuration
interface BlockSettingsJSON {
  category: 'common' | 'formatting' | 'layout' | 'widgets' | 'embed';
  icon: string | JSX.Element | Object;
  parent?: string[];
  supports?: Record<string, unknown>;
  attributes?: Record<string, unknown>;
  preview?: Record<string, unknown>;
  keywords?: Array<string>,
  styles?: Record<string, unknown>[];
  example?: Record<string, unknown>;
  transforms?: {
    from?: Record<string, unknown>[];
    to?: Record<string, unknown>[];
  };
}

interface BlockSettings extends BlockSettingsJSON {
  name?: string;
  title: string;
  description: string;
  edit: JSX.Element | null;
  save: JSX.Element | null;
}

// Extending the interface as blocks defined within the data store
// always have a name, and our definitions have name set separately
// for registration.
interface BlockDefinition extends BlockSettings {
  name: string;
}

interface MediaObject {
  alt: string;
  caption: string;
  id: number;
  url: string;
}

interface ShortcodeAttributes {
  named: Record<string, unknown>;
  numeric: string[];
}

interface Shortcode {
  content: string;
  index: number;
  shortcode: {
    attrs: ShortcodeAttributes;
    content: string;
    tag: string;
    type: string;
  };
}

interface FormatDefinition {
  attributes: Record<string, unknown>;
  type: string;
  unregisteredAttributes: Record<string, unknown>;
}

// Define a type usable as the custom implementation of a jest Mock.
interface StubFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any): any;
}
