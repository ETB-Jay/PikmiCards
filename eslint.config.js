import shopifyEslintPlugin from '@shopify/eslint-plugin';

const shopifyConfig = [
  ...shopifyEslintPlugin.configs.typescript,
  ...shopifyEslintPlugin.configs['typescript-type-checking'],
  ...shopifyEslintPlugin.configs.react,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      '@shopify/strict-component-boundaries': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-process-env': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default shopifyConfig;
