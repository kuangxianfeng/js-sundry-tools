export default {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.ts'], // Your TypeScript files extension
            extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
            parserOptions: {
                project: ['./tsconfig.json'] // Specify it only for TypeScript files
            }
        }
    ],
    extends: [
        'airbnb',
        'eslint:recommended', // eslint 推荐规则
        'plugin:@typescript-eslint/recommended', // ts 推荐规则
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier'
    ],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        }
    },
    rules: {} // 自定义
}
