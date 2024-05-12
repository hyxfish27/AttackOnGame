module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
     'vue/multi-word-component-names': 'off',
     'semi':'off',
     "no-console": "off",       
     "quotes": [1, "single", { "avoidEscape": true }],
     'indent': 'off'
  },
};
