/* eslint quote-props: "error" */
module.exports = {
  'extends': [
    'react-app',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
  ],
  'settings': {
    'import/resolver': {
      'alias': {
        'map': [
          ['src', './src'],
        ],
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
      'typescript': {},
    },
    // Tell eslint-plugin-react which version of React is in use. Current as of WordPress 5.2.1.
    'react': {
      'version': '16.8.4',
    },
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'impliedStrict': true,
    },
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jasmine': true,
  },
  'rules': {
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/ban-ts-ignore': ['off'], // Necessary due to weaknesses of WP types.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      {
        'js,jsx': 'never',
        'json': 'always',
      },
    ],
    'import/no-cycle': [
      'error',
      {
        'maxDepth': 1,
      },
    ],
    'no-multi-str': 'off',
    'no-multi-spaces': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        'controlComponents': [
          'Group',
        ],
      },
    ],
    'jsx-a11y/label-has-for': ['warn', {
      'required': {
        'every': ['id'],
      },
    }],
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'indent': 'off',
    'max-len': [
      'error',
      {
        'ignoreTemplateLiterals': true,
        'ignoreStrings': true,
        'ignoreComments': true,
        'code': 200,
      },
    ],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'quotes': 'off',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
};
