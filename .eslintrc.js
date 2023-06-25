const { getESLintConfig } = require('moga-lint');

module.exports = getESLintConfig('react-ts', {
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
});
