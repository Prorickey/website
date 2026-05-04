import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  globalIgnores(['dist/**', 'node_modules/**', '.astro/**']),
  eslintConfigPrettier,
]);

export default eslintConfig;
