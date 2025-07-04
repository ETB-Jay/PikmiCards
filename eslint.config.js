import shopifyEslintPlugin from '@shopify/eslint-plugin';

const shopifyConfig = [
  ...shopifyEslintPlugin.configs.typescript,
  ...shopifyEslintPlugin.configs['typescript-type-checking'],
  ...shopifyEslintPlugin.configs.react,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    rules: {
      '@shopify/strict-component-boundaries': 'off',
      'react-hooks/exhaustive-deps': 'off',
      "no-process-env": "off"
    },
  },
];

export default shopifyConfig;