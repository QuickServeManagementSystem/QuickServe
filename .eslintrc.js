module.exports = {
  extends: ['@react-native', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        // 'import/no-unresolved': ['error'],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            alphabetize: {order: 'asc', caseInsensitive: true},
          },
        ],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'react-hooks/exhaustive-deps': ['warn'],
      },
    },
  ],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  root: true,
};
