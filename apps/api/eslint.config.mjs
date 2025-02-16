import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import safeql from '@ts-safeql/eslint-plugin/config';
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  safeql.configs.connections({
    databaseUrl: 'postgres://postgres:postgres@localhost:5427/postgres',
    overrides: { types: { uuid: 'string' } },
    targets: [{ wrapper: 'client.query' }],
  }),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn', // severity: 'off', 'warn', yoki 'error' bo'lishi mumkin
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
);
