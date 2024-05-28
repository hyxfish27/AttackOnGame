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
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'], // 确保 '@' 指向 src 目录
                ],
                extensions: ['.js', '.jsx', '.json', '.vue'],
            },
        },
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        semi: 'off',
        'no-console': 'off',
        'no-alert': 'off',
        quotes: [1, 'single', { avoidEscape: true }],
        indent: 'off',
    },
};