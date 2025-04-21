module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  rules: {
    'prettier/prettier': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'react/no-unescaped-entities': 0,
    '@next/next/no-img-element': 0,
    'jsx-a11y/alt-text': 0,
    '@next/next/no-html-link-for-pages': 0,
  },
}
